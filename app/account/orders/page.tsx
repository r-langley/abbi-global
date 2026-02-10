"use client"

import { SectionHeader } from "@/components/account/section-header"
import { OrderCard } from "@/components/account/order-card"
import { mockOrders } from "@/lib/account-data"

export default function AllOrdersPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Orders" />
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.orderId} {...order} />
        ))}
      </div>
    </div>
  )
}
