import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderItem {
  name: string
  image: string
  quantity: number
  price: number
}

interface OrderCardProps {
  orderId: string
  orderNumber: string
  date?: string
  status: string
  statusVariant?: "default" | "outline" | "secondary" | "destructive"
  items: OrderItem[]
  total: number
  message?: string
  isHighlighted?: boolean
  showProgress?: boolean
  progressPercentage?: number
  progressStages?: string[]
  currentStage?: number
}

export function OrderCard({
  orderId,
  orderNumber,
  date,
  status,
  statusVariant = "outline",
  items,
  total,
  message,
  isHighlighted = false,
  showProgress = false,
  progressPercentage,
  progressStages,
  currentStage,
}: OrderCardProps) {
  return (
    <Link href={`/account/orders/${orderId}`} className="block">
      <Card
        className={`cursor-pointer hover:shadow-md transition-shadow ${
          isHighlighted ? "border-primary/30" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium">{orderNumber}</p>
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
              </div>
              <Badge variant={statusVariant} className={statusVariant === "outline" ? "text-muted-foreground" : ""}>
                {status}
              </Badge>
            </div>
            {message && <p className="text-xs text-muted-foreground mb-4">{message}</p>}
            {showProgress && progressStages && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  {progressStages.map((stage, index) => (
                    <span
                      key={stage}
                      className={
                        currentStage !== undefined && index <= currentStage
                          ? "font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {stage}
                    </span>
                  ))}
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-14 h-14 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Total ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
            <span className="text-sm font-medium">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
