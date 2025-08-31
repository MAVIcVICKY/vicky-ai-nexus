import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  model: string;
  content: string;
  error?: string;
}

async function callOpenRouterAPI(model: string, messages: ChatMessage[]): Promise<AIResponse> {
  const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
  
  if (!OPENROUTER_API_KEY) {
    return {
      model,
      content: "OpenRouter API key not configured",
      error: "Missing API key"
    };
  }

  const OPENROUTER_MODELS: Record<string, string> = {
    "GPT-4": "openai/gpt-3.5-turbo",
    "Claude": "anthropic/claude-3.5-sonnet",
    "Gemini": "google/gemini-1.5-flash-latest",
    "DeepSeek": "deepseek/deepseek-chat",
    "Perplexity": "perplexity/llama-3.1-sonar-small-128k-online"
  };

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://vickykaai.com',
        'X-Title': 'VICKY KA AI'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODELS[model] || "openai/gpt-3.5-turbo",
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

async function callGeminiAPI(messages: ChatMessage[]): Promise<AIResponse> {
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
  
  if (!GEMINI_API_KEY) {
    return {
      model: "Gemini",
      content: "Gemini API key not configured",
      error: "Missing API key"
    };
  }

  try {
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
          maxOutputTokens: 500,
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { selectedModels, messages } = await req.json()

    const promises = selectedModels.map(async (model: string) => {
      switch (model) {
        case "GPT-4":
        case "Claude":
        case "DeepSeek":
        case "Perplexity":
          return callOpenRouterAPI(model, messages);
        case "Gemini":
          return callGeminiAPI(messages);
        default:
          return {
            model,
            content: `${model} integration not implemented yet`,
            error: "Model not supported"
          };
      }
    });

    const responses = await Promise.all(promises);

    return new Response(
      JSON.stringify({ responses }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})