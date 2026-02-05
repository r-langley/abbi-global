"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowRightLeft, Trash2, Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { productData } from "@/lib/product-data"

interface SubscriptionProduct {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
}

interface RecommendedSwap {
  productId: string
  currentName: string
  suggestedProduct: typeof productData[number]
  reason: string
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

  // Recommendation-based swaps from latest scan
  const recommendedSwaps: RecommendedSwap[] = [
    {
      productId: "2",
      currentName: "No. 1 Deep Hydration Concentrate",
      suggestedProduct: productData.find(p => p.traits.includes("Shine"))!,
      reason: "Your Dec 15 scan shows Regulation (78) is now your top concern, replacing Hydration",
    },
  ]

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

  const handleAcceptSwap = (swap: RecommendedSwap) => {
    setSubscriptionProducts(prev =>
      prev.map(p =>
        p.id === swap.productId
          ? {
              ...p,
              id: swap.suggestedProduct.id,
              name: swap.suggestedProduct.name,
              price: swap.suggestedProduct.price,
              category: swap.suggestedProduct.category,
            }
          : p
      )
    )
  }

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

  const pendingSwaps = recommendedSwaps.filter(swap =>
    subscriptionProducts.some(p => p.id === swap.productId)
  )

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/account/subscriptions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Subscriptions
        </Link>

        <div className="bg-background rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-normal tracking-tight">Subscription #{subscription.contractId}</h1>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {subscription.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Started {subscription.date} &middot; Next order {subscription.nextBillingDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">Pause</Button>
              <Button variant="destructive" size="sm">Cancel</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Alert */}
      {pendingSwaps.length > 0 && (
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New scan recommendations</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Based on your {subscription.lastScanDate} scan, we recommend the following changes before your next renewal.
            </p>
            <div className="space-y-3">
              {pendingSwaps.map((swap) => (
                <div key={swap.productId} className="flex items-center justify-between gap-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-background flex-shrink-0">
                      <Image
                        src={swap.suggestedProduct.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                        alt={swap.suggestedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="text-muted-foreground line-through">{swap.currentName}</span>
                        {" "}
                        <ArrowRightLeft className="inline h-3 w-3 text-muted-foreground mx-1" />
                        {" "}
                        <span className="font-medium">{swap.suggestedProduct.name}</span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{swap.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent h-8">Dismiss</Button>
                    <Button size="sm" className="text-xs h-8 gap-1" onClick={() => handleAcceptSwap(swap)}>
                      <Check className="h-3 w-3" />
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Customer</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><p className="font-medium">{subscription.customer.name}</p></div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact</p>
                <p className="text-sm">{subscription.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Shipping address</p>
                <p className="text-sm">{subscription.customer.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Payment method</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{subscription.payment.method} &bull;&bull;&bull;&bull; {subscription.payment.last4}</p>
              <p className="text-sm text-muted-foreground">Expires {subscription.payment.expires}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Next Order</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium">{subscription.nextBillingDate}</p>
              <p className="text-xs text-muted-foreground">{subscription.deliveryFrequency}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">Change Date</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Order History</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {subscription.pastOrders.map((order, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                  <Link href={`/account/orders/${order.orderNumber.replace("#", "")}`} className="text-sm text-primary hover:underline">
                    {order.orderNumber}
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Products */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-lg font-medium">Products in this subscription</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {subscriptionProducts.length} items &middot; {subscription.deliveryFrequency}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionProducts.map((product) => {
                const swap = recommendedSwaps.find(s => s.productId === product.id)
                return (
                  <div key={product.id} className={`flex gap-4 p-3 rounded-lg border bg-background ${swap ? "border-primary/20" : ""}`}>
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0 relative overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                          {swap && (
                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Swap recommended
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-medium whitespace-nowrap">
                          ${(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => handleUpdateQuantity(product.id, -1)}>-</Button>
                          <span className="text-sm w-6 text-center">{product.quantity}</span>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => handleUpdateQuantity(product.id, 1)}>+</Button>
                        </div>
                        <div className="flex items-center gap-1">
                          {swap && (
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-xs text-primary">
                                  <ArrowRightLeft className="h-3 w-3" />
                                  Review Swap
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                                <SheetHeader className="px-6">
                                  <SheetTitle>Recommended Swap</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 px-6 space-y-6">
                                  <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-xs text-muted-foreground mb-2">Current product</p>
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-center">
                                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                                  </div>

                                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Sparkles className="h-4 w-4 text-primary" />
                                      <p className="text-xs font-medium">Recommended replacement</p>
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                                        <Image
                                          src={swap.suggestedProduct.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                                          alt={swap.suggestedProduct.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">{swap.suggestedProduct.name}</p>
                                        <p className="text-xs text-muted-foreground">${swap.suggestedProduct.price.toFixed(2)}</p>
                                      </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{swap.reason}</p>
                                    {swap.suggestedProduct.traits && (
                                      <div className="flex gap-1 mt-2">
                                        {swap.suggestedProduct.traits.slice(0, 3).map((trait) => (
                                          <Badge key={trait} variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                                            {trait}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 bg-transparent">Keep Current</Button>
                                    <Button className="flex-1 gap-1" onClick={() => handleAcceptSwap(swap)}>
                                      <Check className="h-4 w-4" />
                                      Accept Swap
                                    </Button>
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
                          )}
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
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({subscriptionProducts.reduce((sum, p) => sum + p.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>{subscription.discount}</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-3 border-t">
                <span>Total per order</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Orders */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-medium">Upcoming Orders</CardTitle></CardHeader>
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
