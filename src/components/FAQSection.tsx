import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is VICKY KA AI really free?",
      answer: "Yes! We offer free access to multiple AI models including GPT-3.5, Claude Instant, and Gemini. Premium features with GPT-4, Claude Pro, and unlimited usage are available with our subscription plans."
    },
    {
      question: "Which AI models are included?",
      answer: "We integrate with GPT-4, GPT-3.5, Claude, Claude Instant, Gemini Pro, Gemini, Perplexity, Grok, DeepSeek, and Mistral. New models are added regularly as they become available."
    },
    {
      question: "Are there any message limits?",
      answer: "Free users get 20 messages per day across all models. Pro users enjoy unlimited messages with faster response times and priority access to new features."
    },
    {
      question: "How do you keep models updated?",
      answer: "We automatically update to the latest versions of each AI model. When OpenAI releases GPT-5 or Anthropic updates Claude, you'll have access immediately without any action needed."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption, don't store your conversations permanently, and never use your data to train AI models. Your privacy is our top priority."
    },
    {
      question: "How do I get started?",
      answer: "Simply click 'Get Started Now' above! No sign-up required for basic usage. You can start chatting with multiple AIs instantly and upgrade later if you need premium features."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neon animate-glow">
            Frequently Asked <span className="text-neon-purple">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about AI ka Shaktimaan
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card rounded-xl border-border/30 hover:border-neon-green/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:text-neon-green transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional help section */}
          <div className="text-center mt-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-neon-green">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you get the most out of VICKY KA AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:support@vickyka.ai" 
                  className="glass-card px-6 py-3 rounded-lg hover:border-neon-green/40 transition-all inline-flex items-center justify-center gap-2 text-sm font-medium hover:text-neon-green"
                >
                  📧 Email Support
                </a>
                <a 
                  href="https://discord.gg/vickyka-ai" 
                  className="glass-card px-6 py-3 rounded-lg hover:border-neon-purple/40 transition-all inline-flex items-center justify-center gap-2 text-sm font-medium hover:text-neon-purple"
                >
                  💬 Join Discord
                </a>
                <a 
                  href="/docs" 
                  className="glass-card px-6 py-3 rounded-lg hover:border-neon-yellow/40 transition-all inline-flex items-center justify-center gap-2 text-sm font-medium hover:text-neon-yellow"
                >
                  📚 Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line with glow */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-neon-purple/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-neon-yellow/5 rounded-full blur-2xl animate-float animation-delay-1000"></div>
    </section>
  );
};

export default FAQSection;