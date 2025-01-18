import { Navbar } from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Benefits } from "@/components/sections/benefits";
import { PricingSection } from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import HowItWorks from "@/components/sections/how-it-works";

import pricingPlans from "@/data/pricing.json";
import faqItems from "@/data/faq.json";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <PricingSection plans={{ plans: pricingPlans }} />
      <FAQSection faqs={faqItems} />
      <Footer />
    </div>
  );
}
