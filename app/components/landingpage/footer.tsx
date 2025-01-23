import { Button } from "@/components/ui/button"
import { Twitter, Github, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Save your time</h2>
          <Button size="lg" className="bg-cosmic-drift hover:opacity-90 border-0">
            Get Started
          </Button>
        </div>

        {/* Links and Social */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-foreground">
              Get Started
            </Link>
            <span>·</span>
            <Link href="/download" className="hover:text-foreground">
               Pricing
            </Link>
          </div>

          <div className="flex gap-6">
            <Link href="https://twitter.com/Ekas_7" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://github.com/Ekas_7" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://discord.gg/Ekas_7" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link href="mailto:ekas@devmux.com" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

       

          
        </div>
      </div>
    </footer>
  )
}

