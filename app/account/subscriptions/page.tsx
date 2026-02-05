"use client"

import { SectionHeader } from "@/components/account/section-header"
import { SubscriptionsTable } from "@/components/account/subscriptions-table"
import { mockSubscriptions } from "@/lib/account-data"

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Subscriptions" />
      <SubscriptionsTable subscriptions={mockSubscriptions} />
    </div>
  )
}
