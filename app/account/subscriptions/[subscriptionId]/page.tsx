"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalNav } from "@/components/global-nav"
import { InfoCard } from "@/components/account/info-card"
import { SectionHeader } from "@/components/account/section-header"

export default function SubscriptionDetailsPage({ params }: { params: { subscriptionId: string } }) {
  // Mock data - in production this would come from an API
  const subscription = {
    id: params.subscriptionId,
    contractId: "34521284935",
    status: "ACTIVE",
    date: "January 13, 2026",
    orderNumber: "#1008",
    product: {
      name: "Thirst Aid Kit",
      image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 0.0,
      oneTimePrice: 0.0,
    },
    discount: "—",
    deliveryFrequency: "Every 2 WEEK",
    customer: {
      name: "yossi pardo",
      email: "yosyospardo@gmail.com",
      address: "—",
    },
    payment: {
      method: "Visa 4111",
      last4: "1111",
      expires: "12/26",
    },
    pastOrders: [
      {
        date: "January 13, 2026",
        orderNumber: "#1008",
      },
    ],
    upcomingOrders: [
      { date: "January 26, 2026" },
      { date: "February 9, 2026" },
      { date: "February 23, 2026" },
      { date: "March 9, 2026" },
      { date: "March 23, 2026" },
      { date: "April 6, 2026" },
      { date: "April 20, 2026" },
    ],
    nextBillingDate: "January 26, 2026",
    subtotal: 0.0,
    shipping: 0.0,
    tax: 0.0,
    total: 0.0,
  }

  return (
    <>
      <GlobalNav cartOpen={false} onCartOpenChange={() => {}} cartItems={[]} onRemoveFromCart={() => {}} onUpdateQuantity={() => {}} />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Subscriptions
            </Link>

            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-normal tracking-tight">{subscription.contractId}</h1>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {subscription.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {subscription.date} • Order {subscription.orderNumber}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Pause
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Customer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{subscription.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contact information</p>
                    <p className="text-sm">{subscription.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shipping address</p>
                    <p className="text-sm">{subscription.customer.address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Payment method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    {subscription.payment.method} •••• •••• {subscription.payment.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {subscription.payment.expires}</p>
                </CardContent>
              </Card>

              {/* Past Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Past orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription.pastOrders.map((order, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{order.date}</span>
                      <Link href={`/account/orders/${order.orderNumber.replace("#", "")}`} className="text-sm text-primary hover:underline">
                        {order.orderNumber}
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Billing Date */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Next Billing Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{subscription.nextBillingDate}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Change Date
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subscription Details */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium">Subscription details</CardTitle>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0 relative overflow-hidden">
                      <Image src={subscription.product.image} alt={subscription.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-primary">{subscription.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            One-time purchase price: €{subscription.product.oneTimePrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm">
                          €{subscription.product.price.toFixed(2)} x 1 €{subscription.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm font-medium mb-1">Discount</p>
                      <p className="text-sm text-muted-foreground">{subscription.discount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Delivery</p>
                      <p className="text-sm text-muted-foreground">{subscription.deliveryFrequency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>€{subscription.subtotal.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>€{subscription.shipping.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>€{subscription.tax.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-3 border-t">
                    <span>Total</span>
                    <span>€{subscription.total.toFixed(1)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Upcoming orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subscription.upcomingOrders.map((order, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm">{order.date}</span>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Skip Cycle
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
