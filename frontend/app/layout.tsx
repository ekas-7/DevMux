import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import ClientProvider from "./providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevMux",
  description:
    "AI-powered platform that seamlessly integrates system design, coding, and team communication",
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

