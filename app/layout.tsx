import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Geist, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Vollkorn as V0_Font_Vollkorn } from 'next/font/google'

// Initialize fonts - optimized to load only necessary weights
const _geist = V0_Font_Geist({
  subsets: ['latin'],
  weight: ["400","500","600","700"],
  display: 'swap',
  variable: '--font-sans'
})
const _geistMono = V0_Font_Geist_Mono({
  subsets: ['latin'],
  weight: ["400","500","600"],
  display: 'swap',
  variable: '--font-mono'
})
const _vollkorn = V0_Font_Vollkorn({
  subsets: ['latin'],
  weight: ["400","600","700"],
  display: 'swap',
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: "ABBI - Personalized Skincare",
  description: "Discover the future of personalized skincare with AI-powered skin analysis",
  generator: "v0.app",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable} ${_vollkorn.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
