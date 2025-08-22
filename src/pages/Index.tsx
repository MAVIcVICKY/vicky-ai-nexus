import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EfficiencySection from "@/components/EfficiencySection";
import ModelHighlights from "@/components/ModelHighlights";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      <HeroSection />
      <FeaturesSection />
      <EfficiencySection />
      <ModelHighlights />
      <DemoSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;