import { HeroSection } from "@/components/hero-section";
import { BestSellersSection } from "@/components/best-sellers-section";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col pb-16 sm:pb-20 lg:pb-24">
      {/* Hero Section Carousel */}
      <HeroSection />

      {/* Best Sellers Section */}
      <BestSellersSection />
    </main>
  );
}

