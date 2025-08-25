import { useState } from "react";
import { Send, MessageSquare, Settings, Plus, Loader2 } from "lucide-react";
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
  
  // Store all chat data with their messages
  const [chatData, setChatData] = useState({
    1: {
      title: "Welcome Chat",
      timestamp: "Just now",
      messages: [
        {
          id: 1,
          content: "Welcome to VICKY KA AI! Ask me anything and I'll respond using multiple AI models simultaneously.",
          isUser: false,
          models: ["System"],
          responses: []
        }
      ]
    }
  });
  
  const [currentChatId, setCurrentChatId] = useState(1);
  const { toast } = useToast();
  
  // Get current chat messages
  const messages = chatData[currentChatId]?.messages || [];
  const chatHistory = Object.keys(chatData).map(id => ({
    id: parseInt(id),
    title: chatData[id].title,
    timestamp: chatData[id].timestamp
  }));

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
    
    const currentMessages = chatData[currentChatId]?.messages || [];
    const userMessage = {
      id: currentMessages.length + 1,
      content: message,
      isUser: true,
      models: [],
      responses: []
    };
    
    // Add user message to current chat
    setChatData(prev => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        messages: [...currentMessages, userMessage]
      }
    }));
    
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory: ChatMessage[] = [
        { role: 'system', content: 'You are VICKY KA AI, a helpful assistant that provides comprehensive and accurate responses.' },
        ...currentMessages.filter(msg => !msg.models.includes("System")).map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user', content: currentMessage }
      ];

      // Get responses from selected AI models
      const aiResponses = await getMultipleAIResponses(selectedModels, conversationHistory);
      
      // Create AI response message
      const aiMessage = {
        id: currentMessages.length + 2,
        content: `Responses from ${selectedModels.length} AI models:`,
        isUser: false,
        models: selectedModels,
        responses: aiResponses
      };
      
      // Add AI response to current chat
      setChatData(prev => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, aiMessage]
        }
      }));

      // Auto-update chat title based on conversation (only for first real conversation)
      const currentChatMessages = chatData[currentChatId]?.messages || [];
      const isFirstRealMessage = currentChatMessages.filter(msg => msg.isUser).length === 1;
      
      if (isFirstRealMessage) {
        const newTitle = generateChatTitle(currentMessage, aiResponses);
        setChatData(prev => ({
          ...prev,
          [currentChatId]: {
            ...prev[currentChatId],
            title: newTitle,
            timestamp: "Just now"
          }
        }));
      }
      
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
      
      // Add error message to current chat
      const errorMessage = {
        id: currentMessages.length + 2,
        content: "Sorry, there was an error processing your request. Please try again.",
        isUser: false,
        models: ["Error"],
        responses: []
      };
      
      setChatData(prev => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, errorMessage]
        }
      }));
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

  // Function to generate chat title from conversation content
  const generateChatTitle = (userMessage: string, aiResponses: AIResponse[]) => {
    const text = userMessage.toLowerCase();
    
    // Define topic keywords and their corresponding titles
    const topicMap = {
      'ai|machine learning|ml|artificial intelligence|deep learning|neural network': 'AI/ML Discussion',
      'meal|food|recipe|cooking|diet|nutrition|breakfast|lunch|dinner': 'Meal Planning',
      'code|programming|javascript|python|react|development|coding|software': 'Code Discussion',
      'health|fitness|exercise|workout|gym|weight|body': 'Health & Fitness',
      'travel|trip|vacation|holiday|flight|hotel|destination': 'Travel Planning',
      'business|startup|company|marketing|sales|entrepreneur': 'Business Talk',
      'education|learning|study|course|school|university|exam': 'Learning Session',
      'money|finance|investment|budget|crypto|stock|bank': 'Finance Discussion',
      'movie|film|book|music|entertainment|show|series': 'Entertainment Chat',
      'weather|climate|temperature|rain|sunny|cloudy': 'Weather Talk',
      'game|gaming|play|sport|football|cricket|chess': 'Gaming/Sports',
      'job|career|work|interview|resume|salary|office': 'Career Discussion',
      'love|relationship|dating|marriage|family|friend': 'Relationship Talk',
      'tech|technology|gadget|phone|computer|laptop|software': 'Tech Discussion',
      'car|vehicle|driving|transport|bike|motorcycle': 'Vehicle Talk'
    };

    // Check for topic matches
    for (const [keywords, title] of Object.entries(topicMap)) {
      const regex = new RegExp(keywords, 'i');
      if (regex.test(text)) {
        return title;
      }
    }

    // Generate title from first few words if no specific topic found
    const words = userMessage.split(' ').slice(0, 3).join(' ');
    return words.length > 2 ? `${words}...` : 'General Chat';
  };

  const handleNewChat = () => {
    const newChatId = Date.now();
    
    // Add new chat to chatData
    setChatData(prev => ({
      ...prev,
      [newChatId]: {
        title: `Chat ${Object.keys(prev).length + 1}`,
        timestamp: "Just now",
        messages: [
          {
            id: 1,
            content: "Welcome to VICKY KA AI! Ask me anything and I'll respond using multiple AI models simultaneously.",
            isUser: false,
            models: ["System"],
            responses: []
          }
        ]
      }
    }));
    
    setCurrentChatId(newChatId);
    setMessage("");
    
    toast({
      title: "New chat created!",
      description: "Start a fresh conversation with AI models."
    });
  };

  const switchChat = (chatId: number) => {
    setCurrentChatId(chatId);
    // Messages are automatically loaded from chatData[chatId]
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
          <Button className="w-full btn-neon" size="sm" onClick={handleNewChat}>
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 p-4 space-y-2">
          {chatHistory.map((chat) => (
            <Card 
              key={chat.id} 
              className={`glass-card p-3 cursor-pointer transition-colors ${
                currentChatId === chat.id 
                  ? "border-neon-green/70 bg-background-tertiary" 
                  : "hover:border-neon-green/50"
              }`}
              onClick={() => switchChat(chat.id)}
            >
              <p className="text-sm font-medium">{chat.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
            </Card>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start hover:bg-background-tertiary"
            onClick={() => toast({ title: "Settings", description: "Settings panel coming soon!" })}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
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