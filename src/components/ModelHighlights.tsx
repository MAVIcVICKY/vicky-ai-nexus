import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Search, Code, Palette, Calculator, Smile, Globe } from "lucide-react";

const ModelHighlights = () => {
  const models = [
    {
      name: "GPT-4",
      icon: Brain,
      description: "Most advanced reasoning and problem-solving capabilities",
      strengths: ["Complex Reasoning", "Code Generation", "Analysis"],
      color: "neon-green",
      gradient: "from-neon-green/20 to-neon-green/5"
    },
    {
      name: "Claude",
      icon: Palette,
      description: "Superior writing and creative content generation",
      strengths: ["Creative Writing", "Content Safety", "Long Conversations"],
      color: "neon-purple",
      gradient: "from-neon-purple/20 to-neon-purple/5"
    },
    {
      name: "Gemini",
      icon: Zap,
      description: "Google's fastest multimodal AI with real-time capabilities",
      strengths: ["Multimodal", "Speed", "Integration"],
      color: "neon-yellow",
      gradient: "from-neon-yellow/20 to-neon-yellow/5"
    },
    {
      name: "Perplexity",
      icon: Search,
      description: "Real-time search and research with accurate citations",
      strengths: ["Live Search", "Citations", "Research"],
      color: "neon-green",
      gradient: "from-neon-green/20 to-neon-purple/5"
    },
    {
      name: "Grok",
      icon: Smile,
      description: "X's witty AI with real-time social media insights",
      strengths: ["Humor", "Current Events", "Social Context"],
      color: "neon-purple",
      gradient: "from-neon-purple/20 to-neon-yellow/5"
    },
    {
      name: "DeepSeek",
      icon: Calculator,
      description: "Exceptional mathematical and scientific reasoning",
      strengths: ["Mathematics", "Science", "Logic"],
      color: "neon-yellow",
      gradient: "from-neon-yellow/20 to-neon-green/5"
    },
    {
      name: "Mistral",
      icon: Code,
      description: "Open-source powerhouse for coding and technical tasks",
      strengths: ["Open Source", "Coding", "Efficiency"],
      color: "neon-green",
      gradient: "from-neon-green/20 to-neon-purple/5"
    },
    {
      name: "All Models",
      icon: Globe,
      description: "Get the best of every AI in one unified response",
      strengths: ["Combined Power", "No Limits", "Best Results"],
      color: "neon-purple",
      gradient: "from-neon-purple/20 to-neon-green/5",
      featured: true
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neon animate-glow">
            Meet Your AI <span className="text-neon-purple">Dream Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each AI has unique strengths. Why choose one when you can have them all working together?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <Card 
              key={model.name}
              className={`glass-card group hover:scale-105 transition-all duration-500 animate-fade-in-up ${
                model.featured ? 'ring-2 ring-neon-purple/30 hover:ring-neon-purple/60' : ''
              }`}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <model.icon className={`w-6 h-6 text-${model.color} group-hover:text-white transition-colors`} />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 text-${model.color} group-hover:text-neon transition-colors`}>
                  {model.name}
                  {model.featured && (
                    <Badge className="ml-2 bg-neon-purple text-background text-xs">
                      Recommended
                    </Badge>
                  )}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {model.strengths.map((strength) => (
                    <Badge 
                      key={strength}
                      variant="outline" 
                      className={`text-xs border-${model.color}/30 text-${model.color} hover:bg-${model.color}/10 transition-all`}
                    >
                      {strength}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 glass-card p-4 rounded-2xl">
            <div className="flex -space-x-2">
              {models.slice(0, 7).map((model, index) => (
                <div 
                  key={model.name}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${model.gradient} border-2 border-background flex items-center justify-center`}
                  style={{ zIndex: models.length - index }}
                >
                  <model.icon className={`w-4 h-4 text-${model.color}`} />
                </div>
              ))}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-foreground">7 Powerful AIs</p>
              <p className="text-xs text-muted-foreground">Working together for you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-neon-green/5 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-40 left-20 w-60 h-60 bg-neon-purple/5 rounded-full blur-3xl animate-float animation-delay-1500"></div>
    </section>
  );
};

export default ModelHighlights;