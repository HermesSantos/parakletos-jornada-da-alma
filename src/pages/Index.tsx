import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CourseCardsSection from "@/components/CourseCardsSection";
import MethodSection from "@/components/MethodSection";
import WomanJourneySection from "@/components/WomanJourneySection";
import ManJourneySection from "@/components/ManJourneySection";
import FeaturesSection from "@/components/FeaturesSection";
import SocialProofSection from "@/components/SocialProofSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
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
        <CourseCardsSection />
      </FadeInSection>
      <FadeInSection>
        <MethodSection />
      </FadeInSection>
      <FadeInSection>
        <WomanJourneySection />
      </FadeInSection>
      <FadeInSection>
        <ManJourneySection />
      </FadeInSection>
      <FadeInSection>
        <FeaturesSection />
      </FadeInSection>
      <FadeInSection>
        <SocialProofSection />
      </FadeInSection>
      <FadeInSection>
        <PricingSection />
      </FadeInSection>
      <FadeInSection>
        <FAQSection />
      </FadeInSection>
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  );
};

export default Index;
