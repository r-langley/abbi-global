import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface Subscription {
  id: string
  contractId: string
  product: string
  productImage: string
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
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 pt-4 px-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="pb-3 pt-4 px-4 text-sm font-medium text-muted-foreground">Contract</th>
                <th className="pb-3 pt-4 px-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="pb-3 pt-4 px-4 text-sm font-medium text-muted-foreground">Delivery Frequency</th>
                <th className="pb-3 pt-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b last:border-0">
                  <td className="py-0">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="flex items-center gap-3 py-3 px-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={subscription.productImage}
                          alt={subscription.product}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{subscription.product}</span>
                    </Link>
                  </td>
                  <td className="py-0">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="block py-3 px-4 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-mono">{subscription.contractId}</span>
                    </Link>
                  </td>
                  <td className="py-0">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="block py-3 px-4 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm">${subscription.price.toFixed(2)}</span>
                    </Link>
                  </td>
                  <td className="py-0">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="block py-3 px-4 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm">{subscription.deliveryFrequency}</span>
                    </Link>
                  </td>
                  <td className="py-0">
                    <Link
                      href={`/account/subscriptions/${subscription.id}`}
                      className="block py-3 px-4 hover:bg-muted/50 transition-colors"
                    >
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
                    </Link>
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
