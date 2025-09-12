// AI Service for handling multiple API integrations via Supabase Edge Functions
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Create client with hardcoded values for now - they'll be replaced when deployed
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AIResponse {
  model: string;
  content: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function getMultipleAIResponses(
  selectedModels: string[], 
  messages: ChatMessage[]
): Promise<AIResponse[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { selectedModels, messages }
    });

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