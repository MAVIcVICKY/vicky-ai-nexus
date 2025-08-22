import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neon-yellow/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-neon-yellow animate-pulse" />
              <span className="text-sm font-medium text-neon-yellow">Ready to experience the future?</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-neon animate-glow leading-tight">
              Ready to Unleash the Power of 
              <br />
              <span className="text-neon-purple">AI ka Shaktimaan?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who are already experiencing the future of AI. 
              <span className="text-neon-green font-semibold"> Multiple AIs. One Interface. Infinite Possibilities.</span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="font-bold text-neon-green mb-2">Instant Access</h3>
              <p className="text-sm text-muted-foreground">Start chatting immediately. No waiting, no setup required.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-purple/20 to-neon-purple/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🧠</span>
              </div>
              <h3 className="font-bold text-neon-purple mb-2">7 AI Models</h3>
              <p className="text-sm text-muted-foreground">GPT, Claude, Gemini & more working together for you.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow/20 to-neon-yellow/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="font-bold text-neon-yellow mb-2">Always Updated</h3>
              <p className="text-sm text-muted-foreground">Latest AI models and features added automatically.</p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="space-y-6">
            <Button
              onClick={() => navigate("/chat")}
              className="btn-neon pulse-neon text-xl px-16 py-8 group hover:scale-105 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 glass-card p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">50,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple mb-2">1M+</div>
                <div className="text-sm text-muted-foreground">AI Responses</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-yellow mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-neon-purple rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-neon-yellow rounded-full animate-ping animation-delay-2000"></div>
    </section>
  );
};

export default FinalCTASection;