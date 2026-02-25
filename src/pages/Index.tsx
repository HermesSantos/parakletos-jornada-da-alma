import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import GuideSection from "@/components/GuideSection";
import ModuleSection from "@/components/ModuleSection";
import PathsSection from "@/components/PathsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FadeInSection>
        <HeroSection />
      </FadeInSection>
      <FadeInSection>
        <div id="metodo">
          <JourneySection />
        </div>
      </FadeInSection>
      <FadeInSection>
        <GuideSection />
      </FadeInSection>
      <FadeInSection>
        <ModuleSection />
      </FadeInSection>
      <FadeInSection>
        <PathsSection />
      </FadeInSection>
      <FadeInSection>
        <PricingSection />
      </FadeInSection>
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  );
};

export default Index;
