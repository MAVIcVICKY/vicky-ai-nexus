import { Zap, Target, Image, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Compare All AIs at Once",
      description: "Get responses from GPT, Claude, Gemini, and more in a single interface. See different perspectives instantly.",
      gradient: "from-neon-green/20 to-neon-green/5"
    },
    {
      icon: Target,
      title: "Prompt Boost",
      description: "Auto-optimize your prompts for better results. Our AI enhances your questions for maximum effectiveness.",
      gradient: "from-neon-purple/20 to-neon-purple/5"
    },
    {
      icon: Image,
      title: "Generate & Transcribe",
      description: "Create stunning images and transcribe audio with cutting-edge AI models. All tools in one place.",
      gradient: "from-neon-yellow/20 to-neon-yellow/5"
    },
    {
      icon: Workflow,
      title: "Custom Workflows",
      description: "Build personalized AI workflows with system instructions. Automate complex tasks effortlessly.",
      gradient: "from-neon-green/20 to-neon-purple/5"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neon animate-glow">
            Supercharge Your AI Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock the full potential of artificial intelligence with our comprehensive suite of tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`glass-card group hover:scale-105 transition-all duration-500 animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-neon-green group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-neon-green transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-purple/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-neon-yellow/5 rounded-full blur-2xl animate-float animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;