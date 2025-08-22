import { CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const EfficiencySection = () => {
  const aiModels = [
    { name: "GPT-4", strengths: ["Reasoning", "Code", "Analysis"], color: "neon-green" },
    { name: "Claude", strengths: ["Writing", "Safety", "Creativity"], color: "neon-purple" },
    { name: "Gemini", strengths: ["Multimodal", "Speed", "Search"], color: "neon-yellow" },
    { name: "Perplexity", strengths: ["Research", "Citations", "Real-time"], color: "neon-green" },
    { name: "Grok", strengths: ["Humor", "Current Events", "X Integration"], color: "neon-purple" },
    { name: "DeepSeek", strengths: ["Math", "Science", "Logic"], color: "neon-yellow" }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-neon animate-glow">
            One Window. <span className="text-neon-purple">Six Perspectives.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Run prompts across GPT, Claude, Gemini & more instantly. 
            <span className="text-neon-green font-semibold"> Get comprehensive answers</span> from the world's best AI models.
          </p>
        </div>

        {/* AI Models Comparison Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiModels.map((model, index) => (
            <Card 
              key={model.name}
              className={`glass-card group hover:scale-105 transition-all duration-500 animate-fade-in-up border-${model.color}/20 hover:border-${model.color}/40`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold text-${model.color} group-hover:text-neon animate-glow`}>
                    {model.name}
                  </h3>
                  <CheckCircle className={`w-5 h-5 text-${model.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
                
                <div className="space-y-2">
                  {model.strengths.map((strength, idx) => (
                    <Badge 
                      key={strength}
                      variant="outline" 
                      className={`mr-2 border-${model.color}/30 text-${model.color} hover:bg-${model.color}/10 transition-all`}
                    >
                      {strength}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Efficiency Demonstration */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-4 text-lg text-muted-foreground">
                <span>Traditional AI Chat</span>
                <ArrowRight className="w-5 h-5 text-neon-yellow" />
                <span className="text-neon-green font-semibold">VICKY KA AI</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-red-400">❌ Old Way</h4>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Switch between multiple tabs</li>
                  <li>• Repeat same question 6+ times</li>
                  <li>• Compare answers manually</li>
                  <li>• Miss important perspectives</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-neon-green">✨ New Way</h4>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• One question, six AI responses</li>
                  <li>• Instant comparison view</li>
                  <li>• Best of all models combined</li>
                  <li>• Never miss key insights</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-float animation-delay-1000"></div>
    </section>
  );
};

export default EfficiencySection;