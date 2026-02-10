"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Sparkles, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productData, DEFAULT_PRODUCT_IMAGE } from "@/lib/product-data"

interface SubscriptionProduct {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
}

export default function SubscriptionDetailsPage({ params }: { params: { subscriptionId: string } }) {
  const [subscriptionProducts, setSubscriptionProducts] = useState<SubscriptionProduct[]>([
    {
      id: "1",
      name: "Custom Formula - Aloe Vera",
      image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 89.0,
      quantity: 1,
      category: "in-lab-creams",
    },
    {
      id: "2",
      name: "No. 1 Deep Hydration Concentrate",
      image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 22.0,
      quantity: 2,
      category: "active-concentrate",
    },
    {
      id: "3",
      name: "Enzyme Exfoliating Cleanser",
      image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 17.89,
      quantity: 1,
      category: "essential",
    },
  ])

  // Recommended product from latest scan - not a swap, just a suggestion to add
  const recommendedProduct = productData.find(p => p.traits.includes("Shine"))!
  const scanRecommendation = {
    product: recommendedProduct,
    reason: "Your Dec 15 scan shows Regulation (78) is now your top concern. This product targets shine control and oil regulation.",
  }

  const subscription = {
    id: params.subscriptionId,
    contractId: "34521284935",
    status: "ACTIVE",
    date: "January 13, 2026",
    discount: "15% Subscription Discount",
    deliveryFrequency: "Every 30 days",
    nextBillingDate: "February 13, 2026",
    lastScanDate: "December 15, 2023",
    customer: {
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      address: "123 Main St, San Francisco, CA 94102",
    },
    payment: {
      method: "Visa",
      last4: "4242",
      expires: "12/26",
    },
    pastOrders: [
      { date: "January 13, 2026", orderNumber: "#1008" },
      { date: "December 13, 2025", orderNumber: "#1007" },
      { date: "November 13, 2025", orderNumber: "#1006" },
    ],
    upcomingOrders: [
      { date: "February 13, 2026" },
      { date: "March 13, 2026" },
      { date: "April 13, 2026" },
    ],
  }

  const subtotal = subscriptionProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const discountAmount = subtotal * 0.15
  const shipping = 0
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  const handleRemoveProduct = (productId: string) => {
    setSubscriptionProducts(prev => prev.filter(p => p.id !== productId))
  }

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSubscriptionProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const newQty = Math.max(1, p.quantity + delta)
          return { ...p, quantity: newQty }
        }
        return p
      })
    )
  }

  const alreadyInSubscription = subscriptionProducts.some(
    p => p.name.toLowerCase().includes(recommendedProduct.name.toLowerCase().split(" ")[0])
  )

  return (
    <div className="space-y-5">
      <Link
        href="/account/subscriptions"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Subscriptions
      </Link>

      {/* Header */}
      <div className="bg-background rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-lg font-normal">Subscription #{subscription.contractId}</h1>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {subscription.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Started {subscription.date} &middot; Next order {subscription.nextBillingDate}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">Pause</Button>
            <Button variant="destructive" size="sm">Cancel</Button>
          </div>
        </div>
      </div>

      {/* Scan Recommendation Callout */}
      {!alreadyInSubscription && (
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">New recommendation from your latest scan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{scanRecommendation.reason}</p>
            <div className="flex items-center justify-between gap-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-10 h-10 rounded overflow-hidden bg-background flex-shrink-0">
                  <Image
                    src={scanRecommendation.product.image || DEFAULT_PRODUCT_IMAGE}
                    alt={scanRecommendation.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{scanRecommendation.product.name}</p>
                  <p className="text-xs text-muted-foreground">${scanRecommendation.product.price.toFixed(2)}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-8 flex-shrink-0 font-mono">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Customer</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{subscription.customer.name}</p>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Contact</p>
                <p className="text-sm">{subscription.customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Shipping address</p>
                <p className="text-sm">{subscription.customer.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Payment method</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{subscription.payment.method} &bull;&bull;&bull;&bull; {subscription.payment.last4}</p>
              <p className="text-xs text-muted-foreground">Expires {subscription.payment.expires}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Next Order</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{subscription.nextBillingDate}</p>
              <p className="text-xs text-muted-foreground">{subscription.deliveryFrequency}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent text-xs">Change Date</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Order History</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {subscription.pastOrders.map((order, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                  <Link href={`/account/orders/${order.orderNumber.replace("#", "")}`} className="text-xs text-primary hover:underline">
                    {order.orderNumber}
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Subscription Products */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">Products in this subscription</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {subscriptionProducts.length} items &middot; {subscription.deliveryFrequency}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs font-mono bg-transparent" asChild>
                  <Link href={`/account/subscriptions/${subscription.id}/edit`}>Change Products</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {subscriptionProducts.map((product) => (
                <div key={product.id} className="flex gap-4 p-3 rounded-lg border">
                  <div className="w-14 h-14 bg-muted rounded flex-shrink-0 relative overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                      </div>
                      <p className="text-sm whitespace-nowrap">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => handleUpdateQuantity(product.id, -1)}>-</Button>
                        <span className="text-sm w-6 text-center">{product.quantity}</span>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => handleUpdateQuantity(product.id, 1)}>+</Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommended product to add */}
              {!alreadyInSubscription && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <p className="text-xs font-medium text-primary">Recommended for your routine</p>
                  </div>
                  <div className="flex gap-4 p-3 rounded-lg border border-dashed border-primary/20">
                    <div className="w-14 h-14 bg-muted rounded flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={scanRecommendation.product.image || DEFAULT_PRODUCT_IMAGE}
                        alt={scanRecommendation.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="text-sm truncate">{scanRecommendation.product.name}</p>
                          <p className="text-xs text-muted-foreground">Based on your latest scan</p>
                          {scanRecommendation.product.traits && (
                            <div className="flex gap-1 mt-1">
                              {scanRecommendation.product.traits.slice(0, 3).map((trait) => (
                                <Badge key={trait} variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                                  {trait}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-sm">${scanRecommendation.product.price.toFixed(2)}</p>
                          <Button size="sm" variant="outline" className="text-xs h-7 px-3 font-mono">Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtotal ({subscriptionProducts.reduce((sum, p) => sum + p.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-primary">
                <span>{subscription.discount}</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-3 border-t">
                <span>Total per order</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Orders */}
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Upcoming Orders</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {subscription.upcomingOrders.map((order, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="text-sm">{order.date}</span>
                  <Button variant="outline" size="sm" className="bg-transparent text-xs h-7">Skip</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
