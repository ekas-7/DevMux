import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"


export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/devmux.svg" alt="OrbStack" width={50} height={50} className="rounded-lg" />
          <span className="text-lg font-semibold">DevMux</span>
        </div>
        <div className="flex items-center gap-4">
        <Link href="/pricing" className="text-muted-foreground hover:text-foreground" aria-label="Pricing Page">
            Pricing
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground" aria-label="About Page">
            Features
          </Link>
          <Link href="/auth" className="text-muted-foreground hover:text-foreground" aria-label="Auth Page">
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              Sign Up/Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

