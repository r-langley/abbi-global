import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface SubscriptionProduct {
  name: string
  image: string
  price: number
}

export interface Subscription {
  id: string
  contractId: string
  product: string
  productImage: string
  products?: SubscriptionProduct[]
  price: number
  deliveryFrequency: string
  nextOrderDate?: string
  status: "active" | "cancelled"
  hasNewRecommendation?: boolean
  recommendedSwap?: {
    current: string
    suggested: string
    reason: string
  }
}

interface SubscriptionsTableProps {
  subscriptions: Subscription[]
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (a.status === "active" && b.status === "cancelled") return -1
    if (a.status === "cancelled" && b.status === "active") return 1
    return 0
  })

  return (
    <div className="space-y-4">
      {sortedSubscriptions.map((subscription) => (
        <Link
          key={subscription.id}
          href={`/account/subscriptions/${subscription.id}`}
          className="block"
        >
          <Card
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              subscription.hasNewRecommendation ? "border-primary/30" : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-medium">{subscription.product}</p>
                  <p className="text-xs text-muted-foreground">{subscription.deliveryFrequency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={subscription.status === "active" ? "default" : "secondary"}
                    className={
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }
                  >
                    {subscription.status}
                  </Badge>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Product thumbnails */}
              {subscription.products && subscription.products.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    {subscription.products.map((p, i) => (
                      <div key={i} className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{subscription.products.length} products</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image src={subscription.productImage} alt={subscription.product} fill className="object-cover" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {subscription.status === "active" && subscription.nextOrderDate
                    ? `Next order: ${subscription.nextOrderDate}`
                    : subscription.status === "cancelled"
                    ? "Cancelled"
                    : ""}
                </span>
                <span className="font-medium">${subscription.price.toFixed(2)}</span>
              </div>

              {subscription.hasNewRecommendation && (
                <div className="bg-primary/5 rounded-md p-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs font-medium text-primary">New product recommendation based on your scan</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
