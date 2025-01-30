"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Github, Mail, MessageCircle, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
  }

  return (
    <footer className="bg-background border-border relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 pt-24 pb-16  relative">
        {/* Newsletter Section */}
        <div className="bg-card rounded-2xl p-8 md:p-12 mb-16 border shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
                <Star className="h-4 w-4" />
                Join our newsletter
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Stay in the loop
              </h2>
              <p className="text-muted-foreground ">
                Get the latest updates, news, and special offers delivered directly to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="inline-flex items-center gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold">About DevMux</h3>
            <p className="text-muted-foreground">
              Empowering developers with cutting-edge tools and solutions to build better software, faster.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "https://twitter.com/Ekas_7", label: "Twitter" },
                { Icon: Github, href: "https://github.com/Ekas_7", label: "GitHub" },
                { Icon: MessageCircle, href: "https://discord.gg/Ekas_7", label: "Discord" },
                { Icon: Mail, href: "mailto:ekas@devmux.com", label: "Email" }
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-primary/10 rounded-lg"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Documentation", "Changelog"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} DevMux. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}