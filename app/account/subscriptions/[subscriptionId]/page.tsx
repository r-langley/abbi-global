"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowRightLeft, Plus, Trash2, Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalNav } from "@/components/global-nav"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { productData, categories } from "@/lib/product-data"

interface SubscriptionProduct {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
}

export default function SubscriptionDetailsPage({ params }: { params: { subscriptionId: string } }) {
  const [swapSheetOpen, setSwapSheetOpen] = useState(false)
  const [selectedProductToSwap, setSelectedProductToSwap] = useState<SubscriptionProduct | null>(null)
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

  // Mock data
  const subscription = {
    id: params.subscriptionId,
    contractId: "34521284935",
    status: "ACTIVE",
    date: "January 13, 2026",
    orderNumber: "#1008",
    discount: "15% Subscription Discount",
    deliveryFrequency: "Every 30 days",
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
    nextBillingDate: "February 13, 2026",
  }

  // Latest scan recommendations for swap suggestions
  const scanRecommendations = [
    { trait: "Regulation", products: productData.filter(p => p.traits.includes("Shine") || p.traits.includes("Texture")).slice(0, 3) },
    { trait: "Hydration", products: productData.filter(p => p.traits.includes("Hydration")).slice(0, 3) },
  ]

  const subtotal = subscriptionProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const discountAmount = subtotal * 0.15
  const shipping = 0
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  const handleSwapProduct = (newProduct: typeof productData[0]) => {
    if (!selectedProductToSwap) return
    
    setSubscriptionProducts(prev => 
      prev.map(p => 
        p.id === selectedProductToSwap.id 
          ? { ...p, id: newProduct.id, name: newProduct.name, price: newProduct.price, category: newProduct.category }
          : p
      )
    )
    setSwapSheetOpen(false)
    setSelectedProductToSwap(null)
  }

  const handleRemoveProduct = (productId: string) => {
    setSubscriptionProducts(prev => prev.filter(p => p.id !== productId))
  }

  const handleAddProduct = (product: typeof productData[0]) => {
    const existing = subscriptionProducts.find(p => p.id === product.id)
    if (existing) {
      setSubscriptionProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      )
    } else {
      setSubscriptionProducts(prev => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image || "/minimalist-cosmetic-pump-bottle-cream.jpg",
          price: product.price,
          quantity: 1,
          category: product.category,
        },
      ])
    }
    setSwapSheetOpen(false)
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
                    <h1 className="text-3xl font-normal tracking-tight">Subscription #{subscription.contractId}</h1>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {subscription.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Started {subscription.date} • Next order {subscription.nextBillingDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Pause
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel
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
                    <p className="text-sm text-muted-foreground mb-1">Contact</p>
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
                    {subscription.payment.method} •••• {subscription.payment.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {subscription.payment.expires}</p>
                </CardContent>
              </Card>

              {/* Next Billing Date */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Next Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-medium">{subscription.nextBillingDate}</p>
                  <p className="text-xs text-muted-foreground">
                    {subscription.deliveryFrequency}
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Change Date
                  </Button>
                </CardContent>
              </Card>

              {/* Past Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Order History</CardTitle>
                </CardHeader>
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">Products in this subscription</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {subscriptionProducts.length} items • Swap or add products based on your latest scan
                    </p>
                  </div>
                  <Sheet open={swapSheetOpen && !selectedProductToSwap} onOpenChange={(open) => {
                    if (!open) setSelectedProductToSwap(null)
                    setSwapSheetOpen(open)
                  }}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                      <SheetHeader className="px-6">
                        <SheetTitle>Add Product to Subscription</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 px-6 space-y-6">
                        {/* Scan Recommendations */}
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Based on your latest scan</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Your scan identified Regulation and Hydration as key areas to address
                          </p>
                          <div className="space-y-2">
                            {scanRecommendations[0].products.slice(0, 2).map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleAddProduct(product)}
                                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-background transition-colors text-left"
                              >
                                <div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                                  <Image
                                    src={product.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                                </div>
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Browse by Category */}
                        {categories.map((category) => {
                          const categoryProducts = productData.filter(p => p.category === category.slug)
                          if (categoryProducts.length === 0) return null
                          return (
                            <div key={category.slug}>
                              <h4 className="text-sm font-medium mb-3">{category.name}</h4>
                              <div className="space-y-2">
                                {categoryProducts.slice(0, 4).map((product) => (
                                  <button
                                    key={product.id}
                                    onClick={() => handleAddProduct(product)}
                                    className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted/50 transition-colors text-left"
                                  >
                                    <div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                                      <Image
                                        src={product.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm truncate">{product.name}</p>
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                                        {product.traits.slice(0, 2).map((trait) => (
                                          <Badge key={trait} variant="outline" className="text-[10px] px-1 py-0">
                                            {trait}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subscriptionProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-3 rounded-lg border bg-background">
                      <div className="w-16 h-16 bg-muted rounded flex-shrink-0 relative overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                          </div>
                          <p className="text-sm font-medium whitespace-nowrap">
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleUpdateQuantity(product.id, -1)}
                            >
                              -
                            </Button>
                            <span className="text-sm w-6 text-center">{product.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleUpdateQuantity(product.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* Swap Product Sheet */}
                            <Sheet 
                              open={swapSheetOpen && selectedProductToSwap?.id === product.id} 
                              onOpenChange={(open) => {
                                setSwapSheetOpen(open)
                                if (open) setSelectedProductToSwap(product)
                                else setSelectedProductToSwap(null)
                              }}
                            >
                              <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-xs">
                                  <ArrowRightLeft className="h-3 w-3" />
                                  Swap
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                                <SheetHeader className="px-6">
                                  <SheetTitle>Swap Product</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 px-6 space-y-6">
                                  {/* Current Product */}
                                  <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-xs text-muted-foreground mb-2">Replacing</p>
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Scan-based Recommendations */}
                                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Sparkles className="h-4 w-4 text-primary" />
                                      <span className="text-sm font-medium">Recommended swaps</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">
                                      Based on your Dec 15 scan results showing elevated Regulation (78) and low Hydration (24)
                                    </p>
                                    <div className="space-y-2">
                                      {scanRecommendations.flatMap(r => r.products).slice(0, 3).map((rec) => (
                                        <button
                                          key={rec.id}
                                          onClick={() => handleSwapProduct(rec)}
                                          className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-background transition-colors text-left"
                                        >
                                          <div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                                            <Image
                                              src={rec.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                                              alt={rec.name}
                                              fill
                                              className="object-cover"
                                            />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{rec.name}</p>
                                            <div className="flex items-center gap-2">
                                              <p className="text-xs text-muted-foreground">${rec.price.toFixed(2)}</p>
                                              {rec.traits.slice(0, 2).map((trait) => (
                                                <Badge key={trait} variant="outline" className="text-[10px] px-1 py-0 border-primary/30 text-primary">
                                                  {trait}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                          <Check className="h-4 w-4 text-primary" />
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Browse All */}
                                  <div>
                                    <h4 className="text-sm font-medium mb-3">Browse all products</h4>
                                    {categories.map((category) => {
                                      const categoryProducts = productData.filter(p => p.category === category.slug)
                                      if (categoryProducts.length === 0) return null
                                      return (
                                        <div key={category.slug} className="mb-4">
                                          <p className="text-xs text-muted-foreground mb-2">{category.name}</p>
                                          <div className="space-y-1">
                                            {categoryProducts.slice(0, 3).map((p) => (
                                              <button
                                                key={p.id}
                                                onClick={() => handleSwapProduct(p)}
                                                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted/50 transition-colors text-left"
                                              >
                                                <div className="relative w-8 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                                                  <Image
                                                    src={p.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                                                    alt={p.name}
                                                    fill
                                                    className="object-cover"
                                                  />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-sm truncate">{p.name}</p>
                                                  <p className="text-xs text-muted-foreground">${p.price.toFixed(2)}</p>
                                                </div>
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
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
                  ))}
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Order Summary</CardTitle>
                </CardHeader>
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
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Upcoming Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {subscription.upcomingOrders.map((order, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm">{order.date}</span>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs h-7">
                        Skip
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
