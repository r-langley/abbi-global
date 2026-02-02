"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { GlobalNav } from "@/components/global-nav"
import { OrderCard } from "@/components/account/order-card"

export default function AllOrdersPage() {
  const allOrders = [
    {
      orderId: "PENDING-2023-1256",
      orderNumber: "#PENDING-2023-1256",
      status: "Awaiting Payment",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Custom Formula",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 89.0,
        },
        {
          name: "Nourishing Serum",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 52.0,
        },
      ],
      total: 141.0,
      message: "Review and confirm this order to proceed with payment",
      isHighlighted: true,
    },
    {
      orderId: "PENDING-2023-1257",
      orderNumber: "#PENDING-2023-1257",
      status: "Awaiting Payment",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Daily Moisturizer",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 2,
          price: 68.0,
        },
      ],
      total: 68.0,
      message: "Review and confirm this order to proceed with payment",
      isHighlighted: true,
    },
    {
      orderId: "GC-2023-1256",
      orderNumber: "#GC-2023-1256",
      date: "December 20, 2023",
      status: "In Production",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Gentle Cleanser",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 17.89,
        },
        {
          name: "Hyaluronic Serum",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 2,
          price: 34.0,
        },
        {
          name: "Night Cream",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 45.0,
        },
        {
          name: "Vitamin C Concentrate",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 28.0,
        },
      ],
      total: 124.89,
      message: "Tracking will be available once your order ships",
      showProgress: true,
      progressPercentage: 20,
      progressStages: ["Ordered", "In Production", "Shipped", "In Transit", "Delivered"],
      currentStage: 0,
    },
    {
      orderId: "CF-2023-1245",
      orderNumber: "#CF-2023-1245",
      date: "December 18, 2023",
      status: "Shipped",
      statusVariant: "default" as const,
      items: [
        {
          name: "Custom Formula",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 89.0,
        },
      ],
      total: 89.0,
      message: "Your order is on the way",
      showProgress: true,
      progressPercentage: 60,
      progressStages: ["Ordered", "In Production", "Shipped", "In Transit", "Delivered"],
      currentStage: 2,
    },
  ]

  return (
    <>
      <GlobalNav cartOpen={false} onCartOpenChange={() => {}} cartItems={[]} onRemoveFromCart={() => {}} onUpdateQuantity={() => {}} />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Account
            </Link>

            <h1 className="text-3xl font-normal tracking-tight">All Orders</h1>
          </div>

          <div className="space-y-4">
            {allOrders.map((order) => (
              <OrderCard key={order.orderId} {...order} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
