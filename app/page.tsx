import { HeroSection } from "./components/landingpage/hero-section"
import { FeaturesSection } from "./components/landingpage/features-section"
import { MagicSection } from "./components/landingpage/magic-section"
import { TestimonialsSection } from "./components/landingpage/testimonials-section"
import { Footer } from "./components/landingpage/footer"
import { Navbar } from "./components/landingpage/navbar"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MagicSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
