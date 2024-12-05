import { auth } from "@/auth";
import FeaturedCategories from "./_components/FeaturedCategories";
import FeaturedProducts from "./_components/FeaturedProducts";
import Hero from "./_components/Hero";
import NewArrivals from "./_components/NewArrivals";
import PromoBanner from "./_components/PromoBanner";
import Testimonials from "./_components/Testimonials";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <NewArrivals />
      <PromoBanner />
    </main>
  );
}
