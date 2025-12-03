import AboutSection from "@/components/Home/about-section";
import AccommodationsCarousel from "@/components/Home/accommodations-carousel";
import DiscoverManuMaharani from "@/components/Home/discover-manu-maharani";
import ExperienceButton from "@/components/Home/expreince-button";
import FeaturedOffers from "@/components/Home/featured-offers";
import FineDiningSection from "@/components/Home/fine-dinning-section";
import { HomeExperiencesSection } from "@/components/Home/home-experiences-section";
import { HomeHeroSection } from "@/components/Home/home-hero-section";
import HomeInstaImageSection from "@/components/Home/home-insta-image-section";
import SectionShortcuts from "@/components/Home/home-shortcuts";
import JimCorbett from "@/components/Home/jim-corbett";
import WeddingAiManuMaharani from "@/components/Home/wedding-ai-manu-maharani";

export default function Home() {
  return (
    <main>
      <HomeHeroSection />
      <SectionShortcuts />
      <AboutSection />
      <FeaturedOffers />
      <AccommodationsCarousel />
      <FineDiningSection />
      {/* <HomeExperiencesSection /> */}
      <WeddingAiManuMaharani />
      <JimCorbett />
      <HomeInstaImageSection />
      <DiscoverManuMaharani />
      <ExperienceButton />
    </main>
  );
}
