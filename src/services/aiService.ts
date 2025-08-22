// AI Service for handling multiple API integrations
const OPENROUTER_API_KEY = "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";
const GEMINI_API_KEY = "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";

export interface AIResponse {
  model: string;
  content: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// OpenRouter API models configuration
const OPENROUTER_MODELS = {
  "GPT-4": "openai/gpt-4-turbo",
  "GPT-3.5": "openai/gpt-3.5-turbo",
  "Claude": "anthropic/claude-3-sonnet",
  "DeepSeek": "deepseek/deepseek-chat",
  "Mistral": "mistralai/mistral-7b-instruct"
};

// Gemini models configuration  
const GEMINI_MODELS = {
  "Gemini": "google/gemini-pro"
};

async function callOpenRouterAPI(model: string, messages: ChatMessage[]): Promise<AIResponse> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'VICKY KA AI'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODELS[model as keyof typeof OPENROUTER_MODELS],
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      model,
      content: data.choices[0]?.message?.content || "No response received"
    };
  } catch (error) {
    console.error(`Error calling ${model}:`, error);
    return {
      model,
      content: "Error occurred while processing your request",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

async function callGeminiAPI(messages: ChatMessage[]): Promise<AIResponse> {
  try {
    // For Gemini, we'll also use OpenRouter as they provide Gemini access
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'VICKY KA AI'
      },
      body: JSON.stringify({
        model: GEMINI_MODELS.Gemini,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      model: "Gemini",
      content: data.choices[0]?.message?.content || "No response received"
    };
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return {
      model: "Gemini",
      content: "Error occurred while processing your request",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Mock implementations for models not available through OpenRouter
async function callPerplexityAPI(messages: ChatMessage[]): Promise<AIResponse> {
  // Perplexity would need separate API integration
  return {
    model: "Perplexity",
    content: "Perplexity integration coming soon! This is a placeholder response with search capabilities.",
  };
}

async function callGrokAPI(messages: ChatMessage[]): Promise<AIResponse> {
  // Grok would need X AI API access
  return {
    model: "Grok",
    content: "Grok integration coming soon! This witty AI will provide humorous and insightful responses.",
  };
}

export async function getMultipleAIResponses(
  selectedModels: string[], 
  messages: ChatMessage[]
): Promise<AIResponse[]> {
  const promises = selectedModels.map(async (model) => {
    switch (model) {
      case "GPT-4":
      case "Claude": 
      case "DeepSeek":
      case "Mistral":
        return callOpenRouterAPI(model, messages);
      case "Gemini":
        return callGeminiAPI(messages);
      case "Perplexity":
        return callPerplexityAPI(messages);
      case "Grok":
        return callGrokAPI(messages);
      default:
        return {
          model,
          content: `${model} integration not implemented yet`,
          error: "Model not supported"
        };
    }
  });

  try {
    const responses = await Promise.all(promises);
    return responses;
  } catch (error) {
    console.error("Error getting multiple AI responses:", error);
    return selectedModels.map(model => ({
      model,
      content: "Error occurred while processing your request",
      error: "Failed to fetch response"
    }));
  }
}

export async function getSingleAIResponse(
  model: string,
  messages: ChatMessage[]
): Promise<AIResponse> {
  const responses = await getMultipleAIResponses([model], messages);
  return responses[0];
}