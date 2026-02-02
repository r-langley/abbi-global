import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface Subscription {
  id: string
  contractId: string
  customer: string
  product: string
  price: number
  deliveryFrequency: string
  status: "active" | "cancelled"
}

interface SubscriptionsTableProps {
  subscriptions: Subscription[]
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-sm font-medium text-muted-foreground">Contract</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Product</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Price</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Delivery Frequency</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="text-sm hover:underline font-mono"
                    >
                      {subscription.contractId}
                    </Link>
                  </td>
                  <td className="py-3 text-sm">{subscription.customer}</td>
                  <td className="py-3 text-sm">{subscription.product}</td>
                  <td className="py-3 text-sm">{subscription.price.toFixed(2)}€</td>
                  <td className="py-3 text-sm">{subscription.deliveryFrequency}</td>
                  <td className="py-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
