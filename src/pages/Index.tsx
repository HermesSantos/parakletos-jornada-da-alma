import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div id="metodo">
        <JourneySection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
