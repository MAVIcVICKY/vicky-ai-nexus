import { useState } from "react";
import { Send, MessageSquare, Settings, Plus, Loader2, Edit3, Check, X } from "lucide-react";
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
  
  // Edit state management
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  
  // Store all chat data with their messages
  const [chatData, setChatData] = useState({
    1: {
      title: "Welcome Chat",
      timestamp: "Just now",
      messages: [
        {
          id: 1,
          content: "Welcome to VIESTA! Ask me anything and I'll respond using multiple AI models simultaneously.",
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
    { name: "Claude", color: "neon-green", status: "active" },
    { name: "Gemini", color: "neon-green", status: "active" },
    { name: "Perplexity", color: "neon-green", status: "active" },
    { name: "DeepSeek", color: "neon-green", status: "active" }
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
        { role: 'system', content: 'You are VIESTA, a helpful assistant that provides comprehensive and accurate responses.' },
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

      // Auto-update chat title based on conversation (only for first real message)
      // Count user messages before this update
      const userMessagesBefore = currentMessages.filter(msg => msg.isUser).length;
      const isFirstRealMessage = userMessagesBefore === 1; // This user message is the first one
      
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
            content: "Welcome to VIESTA! Ask me anything and I'll respond using multiple AI models simultaneously.",
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
    // Cancel any ongoing edit when switching chats
    setEditingChatId(null);
  };

  // Edit functionality
  const startEditing = (chatId: number, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const cancelEditing = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const saveTitle = (chatId: number) => {
    if (editTitle.trim()) {
      setChatData(prev => ({
        ...prev,
        [chatId]: {
          ...prev[chatId],
          title: editTitle.trim()
        }
      }));
      
      toast({
        title: "Title updated!",
        description: "Chat name has been changed successfully."
      });
    }
    
    setEditingChatId(null);
    setEditTitle("");
  };

  return (
    <div className="flex h-screen bg-gradient-hero text-foreground">
      {/* Left Sidebar */}
      <div className="w-80 bg-background-secondary border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-neon-green" />
            <h1 className="text-xl font-bold text-neon text-neon-green">VIESTA</h1>
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
              className={`glass-card p-3 transition-colors ${
                currentChatId === chat.id 
                  ? "border-neon-green/70 bg-background-tertiary" 
                  : "hover:border-neon-green/50"
              }`}
            >
              {editingChatId === chat.id ? (
                // Edit mode
                <div className="space-y-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-sm bg-background border-border focus:border-neon-green/50"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") saveTitle(chat.id);
                      if (e.key === "Escape") cancelEditing();
                    }}
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-neon-green hover:bg-neon-green/10"
                      onClick={() => saveTitle(chat.id)}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-red-400 hover:bg-red-400/10"
                      onClick={cancelEditing}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-start justify-between group">
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => switchChat(chat.id)}
                  >
                    <p className="text-sm font-medium">{chat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-neon-green"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(chat.id, chat.title);
                    }}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </div>
              )}
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
                    ? "bg-neon-green text-background shadow-neon-green" 
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
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-6">
              {msg.isUser ? (
                <div className="flex justify-end mb-4">
                  <div className="max-w-2xl glass-card p-4 bg-gradient-primary text-background ml-12">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* System message */}
                  {msg.models.includes("System") && (
                    <div className="flex justify-start">
                      <div className="max-w-2xl glass-card p-4 bg-background-secondary mr-12">
                        <p className="text-sm mb-2">{msg.content}</p>
                        <Badge variant="outline" className="text-xs">System</Badge>
                      </div>
                    </div>
                  )}
                  
                  {/* AI responses in vertical layout */}
                  {msg.responses && msg.responses.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {msg.responses.map((response: AIResponse, index: number) => (
                        <div key={index} className="glass-card bg-background-secondary border border-border/50 hover:border-neon-green/30 transition-all duration-200">
                          {/* AI Model Header */}
                          <div className="p-3 border-b border-border/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${response.error ? 'bg-red-400' : 'bg-neon-green'} ${!response.error && 'animate-pulse'}`}></div>
                              <Badge 
                                variant={response.error ? "destructive" : "default"}
                                className={`text-xs font-medium ${!response.error && 'bg-neon-green/20 text-neon-green border-neon-green/30'}`}
                              >
                                {response.model}
                              </Badge>
                            </div>
                            {response.error && (
                              <span className="text-xs text-red-400 font-medium">Failed</span>
                            )}
                          </div>
                          
                          {/* AI Response Content */}
                          <div className="p-4">
                            <div className="text-sm text-foreground leading-relaxed min-h-[120px] max-h-[400px] overflow-y-auto">
                              {response.error ? (
                                <div className="text-red-400 italic">
                                  Unable to get response from {response.model}
                                </div>
                              ) : (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                  {response.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {selectedModels.map((model, index) => (
                <div key={model} className="glass-card bg-background-secondary border border-border/50">
                  <div className="p-3 border-b border-border/30 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse"></div>
                    <Badge className="text-xs bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                      {model}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-neon-green" />
                      <span className="text-sm text-muted-foreground">
                        Generating response...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask VIESTA anything..."
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
            {selectedModels.length} models selected • Powered by VIESTA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;