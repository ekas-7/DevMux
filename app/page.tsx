import { HeroSection } from "./components/landingpage/hero-section"
import { FeaturesSection } from "./components/landingpage/features-section"
import { MagicSection } from "./components/landingpage/magic-section"
import { TestimonialsSection } from "./components/landingpage/testimonials-section"
import { Footer } from "./components/landingpage/footer"
import { Navbar } from "./components/landingpage/navbar"
import { Macbook } from "./components/landingpage/macbook"
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Macbook />
      <FeaturesSection />
      <MagicSection />
      <TestimonialsSection />
     
      <Footer />
    </main>
  )
}
