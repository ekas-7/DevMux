import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-drift/10 to-background opacity-50 blur-3xl"></div>
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 leading-tight">
          
           Design    Code    Discuss
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          <span className="bg-cosmic-drift bg-clip-text text-6xl md:text-8xl   text-transparent">DevMux</span>
        </h1>
                <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Revolutionize your development workflow with an AI-powered platform that seamlessly integrates system design, coding, and team communication.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-cosmic-drift hover:bg-cosmic-drift/90 text-white group shadow-xl shadow-cosmic-drift/30 transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
            <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="group border-cosmic-drift/50 hover:border-cosmic-drift hover:shadow-md transition-all duration-300"
          >
            Explore Pricing
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}