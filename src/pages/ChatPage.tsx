import { useState } from "react";
import { Send, MessageSquare, Settings, Plus, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChatPage = () => {
  const [selectedModels, setSelectedModels] = useState(["GPT-4"]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to VICKY KA AI! Ask me anything and I'll respond using multiple AI models simultaneously.",
      isUser: false,
      models: ["System"]
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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      content: message,
      isUser: true,
      models: []
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: "This is a simulated response from the selected AI models. In the full implementation, this would show responses from all selected models simultaneously.",
        isUser: false,
        models: selectedModels
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
                className={`max-w-3xl glass-card p-4 ${
                  msg.isUser 
                    ? "bg-gradient-primary text-background ml-12" 
                    : "bg-background-secondary mr-12"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                {msg.models.length > 0 && (
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
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
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