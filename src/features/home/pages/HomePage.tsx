import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedCourses from "../components/FeaturedCourses";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <CategoriesSection />

      <FeaturedCourses />
    </main>
  );
}