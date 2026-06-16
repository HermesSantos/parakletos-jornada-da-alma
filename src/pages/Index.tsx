import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MissaoLiberteSection from "@/components/MissaoLiberteSection";
import CourseCardsSection from "@/components/CourseCardsSection";
import MethodSection from "@/components/MethodSection";
import WomanJourneySection from "@/components/WomanJourneySection";
import ManJourneySection from "@/components/ManJourneySection";
import CoupleJourneySection from "@/components/CoupleJourneySection";
import FeaturesSection from "@/components/FeaturesSection";
import SocialProofSection from "@/components/SocialProofSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import { defaultLandingContent } from "@/lib/cms-defaults";

const Index = () => {
  const { data: content, isLoading } = useLandingContent();
  useThemeSettings();

  const landing = content ?? defaultLandingContent;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-sans">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header content={landing.header} />
      <FadeInSection>
        <HeroSection content={landing.hero} />
      </FadeInSection>
      <FadeInSection>
        <MissaoLiberteSection content={landing.missao_liberte} />
      </FadeInSection>
      <FadeInSection>
        <CourseCardsSection content={landing.courses} />
      </FadeInSection>
      <FadeInSection>
        <MethodSection content={landing.method} />
      </FadeInSection>
      <FadeInSection>
        <WomanJourneySection content={landing.journeys.woman} />
      </FadeInSection>
      <FadeInSection>
        <ManJourneySection content={landing.journeys.man} />
      </FadeInSection>
      <FadeInSection>
        <CoupleJourneySection content={landing.journeys.couple} />
      </FadeInSection>
      <FadeInSection>
        <FeaturesSection content={landing.features} />
      </FadeInSection>
      <FadeInSection>
        <SocialProofSection content={landing.social_proof} />
      </FadeInSection>
      <FadeInSection>
        <PricingSection content={landing.pricing} />
      </FadeInSection>
      <FadeInSection>
        <FAQSection content={landing.faq} />
      </FadeInSection>
      <FadeInSection>
        <Footer content={landing.footer} />
      </FadeInSection>
    </div>
  );
};

export default Index;
