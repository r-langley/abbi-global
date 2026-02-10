"use client"

import { GlobalNav } from "@/components/global-nav"
import { AccountHeader } from "@/components/account/account-header"
import { AccountTabs } from "@/components/account/account-tabs"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto max-w-7xl py-6 px-6">
          <div className="space-y-5">
            <AccountHeader />
            <AccountTabs />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
