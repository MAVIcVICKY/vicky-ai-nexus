import { useState } from "react";
import { Send, MessageSquare, Settings, Plus, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMultipleAIResponses, type AIResponse, type ChatMessage } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

const ChatPage = () => {
  const [selectedModels, setSelectedModels] = useState(["GPT-4"]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to VICKY KA AI! Ask me anything and I'll respond using multiple AI models simultaneously.",
      isUser: false,
      models: ["System"],
      responses: []
    }
  ]);

  const aiModels = [
    { name: "GPT-4", color: "neon-green", status: "active" },
    { name: "Claude", color: "neon-purple", status: "active" },
    { name: "Gemini", color: "neon-yellow", status: "active" },
    { name: "Perplexity", color: "neon-green", status: "active" },
    { name: "DeepSeek", color: "neon-purple", status: "active" },
    { name: "Mistral", color: "neon-yellow", status: "active" }
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    if (selectedModels.length === 0) {
      toast({
        title: "No models selected",
        description: "Please select at least one AI model to get responses.",
        variant: "destructive"
      });
      return;
    }
    
    const userMessage = {
      id: messages.length + 1,
      content: message,
      isUser: true,
      models: [],
      responses: []
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory: ChatMessage[] = [
        { role: 'system', content: 'You are VICKY KA AI, a helpful assistant that provides comprehensive and accurate responses.' },
        ...messages.filter(msg => !msg.models.includes("System")).map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user', content: currentMessage }
      ];

      // Get responses from selected AI models
      const aiResponses = await getMultipleAIResponses(selectedModels, conversationHistory);
      
      // Create AI response message
      const aiMessage = {
        id: messages.length + 2,
        content: `Responses from ${selectedModels.length} AI models:`,
        isUser: false,
        models: selectedModels,
        responses: aiResponses
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Show success notification
      toast({
        title: "Responses received!",
        description: `Got responses from ${aiResponses.filter(r => !r.error).length} out of ${selectedModels.length} models.`
      });
      
    } catch (error) {
      console.error("Error getting AI responses:", error);
      toast({
        title: "Error",
        description: "Failed to get AI responses. Please try again.",
        variant: "destructive"
      });
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        content: "Sorry, there was an error processing your request. Please try again.",
        isUser: false,
        models: ["Error"],
        responses: []
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModel = (modelName: string) => {
    setSelectedModels(prev => 
      prev.includes(modelName)
        ? prev.filter(m => m !== modelName)
        : [...prev, modelName]
    );
  };

  return (
    <div className="flex h-screen bg-gradient-hero text-foreground">
      {/* Left Sidebar */}
      <div className="w-80 bg-background-secondary border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-neon-green" />
            <h1 className="text-xl font-bold text-neon text-neon-green">VICKY KA AI</h1>
          </div>
          <Button className="w-full btn-neon" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 p-4 space-y-2">
          <Card className="glass-card p-3 cursor-pointer hover:border-neon-green/50">
            <p className="text-sm font-medium">Welcome Chat</p>
            <p className="text-xs text-muted-foreground mt-1">Just now</p>
          </Card>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Crown className="w-4 h-4 mr-2 text-neon-yellow" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Model Selection Header */}
        <div className="bg-background-secondary border-b border-border p-4">
          <div className="flex flex-wrap gap-2">
            {aiModels.map((model) => (
              <Badge
                key={model.name}
                variant={selectedModels.includes(model.name) ? "default" : "secondary"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedModels.includes(model.name) 
                    ? `bg-${model.color} text-background shadow-neon-green` 
                    : "hover:border-neon-green/30"
                }`}
                onClick={() => toggleModel(model.name)}
              >
                {model.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-4xl glass-card p-4 ${
                  msg.isUser 
                    ? "bg-gradient-primary text-background ml-12" 
                    : "bg-background-secondary mr-12"
                }`}
              >
                <p className="text-sm mb-2">{msg.content}</p>
                
                {/* Show individual AI responses */}
                {msg.responses && msg.responses.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {msg.responses.map((response: AIResponse, index: number) => (
                      <div key={index} className="glass-card p-3 bg-background-tertiary rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={response.error ? "destructive" : "default"}
                            className="text-xs"
                          >
                            {response.model}
                          </Badge>
                          {response.error && (
                            <span className="text-xs text-red-400">Failed</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {response.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Show model badges for system messages */}
                {msg.models.length > 0 && !msg.responses?.length && (
                  <div className="flex gap-1 mt-2">
                    {msg.models.map((model) => (
                      <Badge key={model} variant="outline" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-4xl glass-card p-4 bg-background-secondary mr-12">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-neon-green" />
                  <span className="text-sm text-muted-foreground">
                    Getting responses from {selectedModels.length} AI models...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask VICKY KA AI anything..."
              className="flex-1 bg-background-secondary border-border focus:border-neon-green/50 focus:ring-neon-green/20"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="btn-neon"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {selectedModels.length} models selected • Powered by VICKY KA AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;