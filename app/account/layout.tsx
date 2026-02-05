"use client"

import { GlobalNav } from "@/components/global-nav"
import { AccountNav } from "@/components/account/account-nav"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="flex gap-8">
            <AccountNav />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
