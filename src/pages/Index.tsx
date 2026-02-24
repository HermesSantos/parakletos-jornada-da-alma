import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import GuideSection from "@/components/GuideSection";
import ModuleSection from "@/components/ModuleSection";
import PathsSection from "@/components/PathsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div id="metodo">
        <JourneySection />
      </div>
      <GuideSection />
      <ModuleSection />
      <PathsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
