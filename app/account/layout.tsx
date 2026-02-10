"use client"

import { usePathname } from "next/navigation"
import { GlobalNav } from "@/components/global-nav"
import { AccountHeader } from "@/components/account/account-header"
import { AccountTabs } from "@/components/account/account-tabs"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Hide header/tabs on detail pages (e.g. /account/orders/123, /account/subscriptions/456)
  const segments = pathname.split("/").filter(Boolean)
  const isDetailPage = segments.length >= 3 && segments[0] === "account" &&
    (segments[1] === "orders" || segments[1] === "subscriptions") &&
    segments[2] !== undefined

  return (
    <>
      <GlobalNav />
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto max-w-7xl py-6 px-6">
          <div className="space-y-5">
            {!isDetailPage && (
              <>
                <AccountHeader />
                <AccountTabs />
              </>
            )}
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
