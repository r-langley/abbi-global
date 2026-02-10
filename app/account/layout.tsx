"use client"

import { GlobalNav } from "@/components/global-nav"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto max-w-7xl py-6 px-6">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
