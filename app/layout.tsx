import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import ClientProvider from "./providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OrbStack - Fast, light Docker Desktop alternative",
  description:
    "The fast, light, and easy way to run Docker containers and Linux. Develop at lightspeed with our Docker Desktop alternative.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}

