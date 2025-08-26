import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-ai-interface.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-green/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-yellow/10 rounded-full blur-3xl animate-float animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headlines */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 text-neon animate-glow">
              VIESTA
            </h1>
            <div className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ALL IN ONE
            </div>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Many Premium AIs <span className="text-neon-green font-semibold">FREE</span>. 
              <span className="text-neon-purple font-semibold ml-2">Infinite Power</span>
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12 animate-fade-in-up animation-delay-300">
            <div className="relative max-w-4xl mx-auto">
              <img 
                src={heroImage} 
                alt="Futuristic AI Interface"
                className="w-full rounded-2xl shadow-card border border-neon-green/20 hover:border-neon-green/40 transition-all duration-500 hover:shadow-neon-green"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 glass-card p-3 animate-float">
                <Sparkles className="w-6 h-6 text-neon-yellow" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-3 animate-float animation-delay-1000">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-600">
            <Button
              onClick={() => navigate("/chat")}
              className="btn-neon pulse-neon text-lg px-12 py-6 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No sign-up required • Start chatting instantly
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-green/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-green rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;