import { HeroSection } from "./home/heroSection";
import { ServiceSection } from "./home/serviceSection";
import { CtaSection } from "./home/ctaSection";
import { TestimonialsSection } from "./home/testimonalSection";
import HomeLayout from "./homeLayout";
import { StatsSection } from "./home/statsSection";
import { FaqSection } from "./home/faqSection";
import GoogleAd from "./googleads";

export default function Home() {
  return (
    <HomeLayout>
      <GoogleAd slot="5872708392333567" />
      <HeroSection />
      <StatsSection />
      <ServiceSection />
      <FaqSection />
      {/* <CtaSection /> */}
      <TestimonialsSection />
    </HomeLayout>
  );
}
