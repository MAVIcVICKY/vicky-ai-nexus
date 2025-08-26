import { Brain, Twitter, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Models", href: "#models" },
      { name: "Pricing", href: "#pricing" },
      { name: "API", href: "/api" }
    ],
    support: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Discord", href: "https://discord.gg/viesta-ai" },
      { name: "Status", href: "/status" }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" }
    ]
  };

  return (
    <footer className="relative border-t border-border/30 bg-background-secondary">
      {/* Neon line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon animate-glow">VIESTA</h3>
                <p className="text-xs text-neon-purple">AI Powerhouse</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Empowering everyone with the combined power of multiple AI models. 
              Experience the future of artificial intelligence today.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/viesta_ai" 
                className="glass-card p-3 rounded-lg hover:border-neon-green/40 transition-all group"
              >
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-neon-green transition-colors" />
              </a>
              <a 
                href="https://github.com/viesta-ai" 
                className="glass-card p-3 rounded-lg hover:border-neon-purple/40 transition-all group"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-neon-purple transition-colors" />
              </a>
              <a 
                href="mailto:hello@viesta.ai" 
                className="glass-card p-3 rounded-lg hover:border-neon-yellow/40 transition-all group"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-neon-yellow transition-colors" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-neon-green transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-neon-purple transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-neon-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-neon-green transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/30 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 VIESTA</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-neon-purple fill-current animate-pulse" />
              <span>for AI enthusiasts</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;