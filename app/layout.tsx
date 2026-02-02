import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

import { Geist, Geist_Mono, Vollkorn } from 'next/font/google'

// Initialize fonts with CSS variable support - load only commonly used weights
const geist = Geist({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600"],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ["400", "500"],
  variable: '--font-geist-mono',
  display: 'swap',
})

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ["400", "500", "600"],
  variable: '--font-vollkorn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ABBI - Personalized Skincare",
  description: "Discover the future of personalized skincare with AI-powered skin analysis",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${vollkorn.variable}`}>
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
