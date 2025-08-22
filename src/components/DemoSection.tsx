import { Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DemoSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neon animate-glow">
            See AI ka <span className="text-neon-purple">Shaktimaan</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how our AI delivers what others miss. One question, multiple perspectives, infinite possibilities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
                {/* Video thumbnail placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-purple/10"></div>
                
                {/* Demo interface mockup */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-6">
                    {/* Play button */}
                    <Button 
                      className="w-20 h-20 rounded-full btn-neon group-hover:scale-110 transition-transform duration-300 pulse-neon"
                      onClick={() => {
                        // In a real implementation, this would open a video modal or redirect to YouTube
                        window.open('https://youtube.com/watch?v=demo', '_blank');
                      }}
                    >
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </Button>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-neon-green">Interactive Demo</h3>
                      <p className="text-muted-foreground">
                        See how AI ka Shaktimaan delivers what others miss
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating demo elements */}
                <div className="absolute top-4 left-4 glass-card p-3 opacity-80 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-neon-green font-medium">GPT-4 Active</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 glass-card p-3 opacity-80 animate-float animation-delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                    <span className="text-xs text-neon-purple font-medium">Claude Active</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 glass-card p-3 opacity-80 animate-float animation-delay-1000">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
                    <span className="text-xs text-neon-yellow font-medium">6 Models Running</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 glass-card p-3 opacity-80 animate-float animation-delay-1500">
                  <div className="text-xs text-center">
                    <div className="text-neon-green font-bold">3.2s</div>
                    <div className="text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="glass-card text-center p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-neon-green mb-2">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Get responses from all models in under 5 seconds</p>
            </Card>

            <Card className="glass-card text-center p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-purple/20 to-neon-purple/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold text-neon-purple mb-2">Smart Comparison</h4>
              <p className="text-sm text-muted-foreground">AI automatically highlights key differences</p>
            </Card>

            <Card className="glass-card text-center p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow/20 to-neon-yellow/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-neon-yellow mb-2">Best Results</h4>
              <p className="text-sm text-muted-foreground">Never miss important insights or perspectives</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="group hover:border-neon-green/50 hover:bg-neon-green/10 transition-all"
              onClick={() => window.open('https://youtube.com/channel/your-channel', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:text-neon-green transition-colors" />
              Watch Full Demo Series
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              See complete tutorials on our YouTube channel
            </p>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-neon-green/5 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-neon-purple/5 rounded-full blur-3xl animate-float animation-delay-1000"></div>
    </section>
  );
};

export default DemoSection;