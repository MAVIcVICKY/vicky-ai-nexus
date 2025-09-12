// AI Service for handling multiple API integrations via Supabase Edge Functions
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if env vars exist to prevent runtime crash
const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export interface AIResponse {
  model: string;
  content: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

async function callEdgeFunctionFallback(payload: { selectedModels: string[]; messages: ChatMessage[] }) {
  const endpoints = [
    '/functions/v1/ai-chat',
    '/ai-chat'
  ];
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (_) {
      // try next endpoint
    }
  }
  throw new Error('All edge function fallbacks failed');
}

export async function getMultipleAIResponses(
  selectedModels: string[], 
  messages: ChatMessage[]
): Promise<AIResponse[]> {
  try {
    let data: any = null;
    let error: any = null;

    if (supabase) {
      const res = await supabase.functions.invoke('ai-chat', {
        body: { selectedModels, messages }
      });
      data = res.data;
      error = res.error;
    } else {
      data = await callEdgeFunctionFallback({ selectedModels, messages });
    }

    if (error) {
      console.error('Error calling Edge Function:', error);
      return selectedModels.map(model => ({
        model,
        content: "Service temporarily unavailable. Please try again.",
        error: "Edge function error"
      }));
    }

    return (data?.responses) || [];
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