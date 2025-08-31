// AI Service for handling multiple API integrations
const OPENROUTER_API_KEY = "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";
const CLAUDE_API_KEY = "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";
const GEMINI_API_KEY = "AIzaSyDy1FfQnwpvt4S2NEGEgFuM5m5vJqE7ses";

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
  "GPT-4": "openai/gpt-3.5-turbo",
  "GPT-3.5": "openai/gpt-3.5-turbo", 
  "Claude": "anthropic/claude-3.5-sonnet",
  "Gemini": "google/gemini-1.5-flash",
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
        max_tokens: 500,
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

async function callClaudeAPI(messages: ChatMessage[]): Promise<AIResponse> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLAUDE_API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: messages.filter(msg => msg.role !== 'system').map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        system: messages.find(msg => msg.role === 'system')?.content || "You are VICKY KA AI, a helpful assistant."
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      model: "Claude",
      content: data.content[0]?.text || "No response received from Claude"
    };
  } catch (error) {
    console.error("Error calling Claude API:", error);
    return {
      model: "Claude",
      content: "Error occurred while processing your request with Claude",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

async function callGeminiAPI(messages: ChatMessage[]): Promise<AIResponse> {
  try {
    // Convert messages to Gemini format
    const geminiMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      model: "Gemini",
      content: data.candidates[0]?.content?.parts[0]?.text || "No response received from Gemini"
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      model: "Gemini",
      content: "Error occurred while processing your request with Gemini",
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