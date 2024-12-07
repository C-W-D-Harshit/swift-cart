import FeaturedCategories from "./_components/FeaturedCategories";
import FeaturedProducts from "./_components/FeaturedProducts";
import Hero from "./_components/Hero";
import NewArrivals from "./_components/NewArrivals";
import PromoBanner from "./_components/PromoBanner";
import Testimonials from "./_components/Testimonials";

export default async function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />
      {/* Featured Categories */}
      <FeaturedCategories />
      {/* Featured Products */}
      <FeaturedProducts />
      {/* Testimonials */}
      <Testimonials />
      {/* New Arrivals */}
      <NewArrivals />
      {/* Promo Banner */}
      <PromoBanner />
    </main>
  );
}
