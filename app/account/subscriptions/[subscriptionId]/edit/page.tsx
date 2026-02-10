"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Plus, Minus, Trash2, Repeat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productData, categories, DEFAULT_PRODUCT_IMAGE } from "@/lib/product-data"

interface EditItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
  isOriginal: boolean // was in subscription before editing
}

const FREQUENCY_OPTIONS = [
  { value: "15", label: "Every 15 days" },
  { value: "30", label: "Every 30 days" },
  { value: "45", label: "Every 45 days" },
  { value: "60", label: "Every 60 days" },
  { value: "90", label: "Every 90 days" },
]

export default function EditSubscriptionPage({ params }: { params: { subscriptionId: string } }) {
  // Original subscription products (the baseline to compare against)
  const originalItems: EditItem[] = [
    {
      productId: "1",
      name: "Aloe Vera Hydrating Base Cream with Botanical Extracts",
      image: "/images/custom-cream-alya.jpg",
      price: 89.0,
      quantity: 1,
      category: "in-lab-creams",
      isOriginal: true,
    },
    {
      productId: "14",
      name: "No. 1 Deep Hydration Concentrate",
      image: DEFAULT_PRODUCT_IMAGE,
      price: 22.0,
      quantity: 2,
      category: "active-concentrate",
      isOriginal: true,
    },
    {
      productId: "22",
      name: "Enzyme Exfoliating Cleanser",
      image: DEFAULT_PRODUCT_IMAGE,
      price: 17.89,
      quantity: 1,
      category: "essential",
      isOriginal: true,
    },
  ]

  const [items, setItems] = useState<EditItem[]>(originalItems)
  const [frequency, setFrequency] = useState("30")
  const [showCatalog, setShowCatalog] = useState(false)

  const originalTotal = originalItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const currentSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = currentSubtotal * 0.15
  const newTotal = currentSubtotal - discount
  const originalDiscountedTotal = originalTotal - originalTotal * 0.15
  const priceDifference = newTotal - originalDiscountedTotal

  const hasChanges = useMemo(() => {
    if (frequency !== "30") return true
    if (items.length !== originalItems.length) return true
    return items.some((item) => {
      const orig = originalItems.find((o) => o.productId === item.productId)
      if (!orig) return true
      return orig.quantity !== item.quantity
    })
  }, [items, frequency])

  const handleAdd = (productId: string) => {
    const existing = items.find((i) => i.productId === productId)
    if (existing) {
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
      )
    } else {
      const product = productData.find((p) => p.id === productId)
      if (!product) return
      setItems((prev) => [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          image: product.image || DEFAULT_PRODUCT_IMAGE,
          price: product.price,
          quantity: 1,
          category: product.category,
          isOriginal: false,
        },
      ])
    }
  }

  const handleRemove = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  const handleQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId) {
          const q = Math.max(1, i.quantity + delta)
          return { ...i, quantity: q }
        }
        return i
      })
    )
  }

  // Products not currently in cart, for the browse catalog
  const availableProducts = productData.filter(
    (p) => !items.some((i) => i.productId === p.id)
  )

  return (
    <div className="space-y-5">
      <Link
        href={`/account/subscriptions/${params.subscriptionId}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to subscription
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-normal">Edit Subscription Products</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Subscription #34521284935 &middot; Changes apply to your next order
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          <Repeat className="w-3 h-3 mr-1" />
          Auto-ship
        </Badge>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Cart (left, wider) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Current products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Your Products</CardTitle>
                <span className="text-xs text-muted-foreground">{items.length} items</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => {
                const wasOriginal = originalItems.some((o) => o.productId === item.productId)
                const origQty = originalItems.find((o) => o.productId === item.productId)?.quantity
                const qtyChanged = wasOriginal && origQty !== item.quantity

                return (
                  <div
                    key={item.productId}
                    className={`flex gap-4 p-3 rounded-lg border ${
                      !wasOriginal ? "border-primary/30 bg-primary/5" : ""
                    }`}
                  >
                    <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {wasOriginal && (
                              <span className="text-[10px] text-muted-foreground">In subscription</span>
                            )}
                            {!wasOriginal && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                                New
                              </Badge>
                            )}
                            {qtyChanged && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                was {origQty}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleQuantity(item.productId, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm w-6 text-center font-mono">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleQuantity(item.productId, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(item.productId)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {items.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">
                  No products in subscription. Add items from the catalog below.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Browse catalog */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Add Products</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setShowCatalog(!showCatalog)}
                >
                  {showCatalog ? "Collapse" : "Browse catalog"}
                </Button>
              </div>
            </CardHeader>
            {showCatalog && (
              <CardContent className="space-y-6">
                {categories.map((cat) => {
                  const catProducts = availableProducts.filter((p) => p.category === cat.slug)
                  if (catProducts.length === 0) return null

                  return (
                    <div key={cat.slug}>
                      <p className="text-xs font-medium text-muted-foreground mb-3">{cat.name}</p>
                      <div className="space-y-2">
                        {catProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                              <Image
                                src={product.image || DEFAULT_PRODUCT_IMAGE}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 flex-shrink-0"
                              onClick={() => handleAdd(product.id)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Summary sidebar (right, sticky) */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Delivery frequency */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Delivery Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {frequency !== "30" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Changed from every 30 days
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Price summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>${currentSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-primary">
                  <span>15% subscriber discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2.5 border-t">
                  <span>New total per order</span>
                  <span>${newTotal.toFixed(2)}</span>
                </div>

                {/* Price difference callout */}
                {hasChanges && priceDifference !== 0 && (
                  <div className={`flex justify-between text-xs p-2 rounded ${
                    priceDifference > 0 ? "bg-muted" : "bg-primary/5 text-primary"
                  }`}>
                    <span>{priceDifference > 0 ? "Additional charge" : "You save"}</span>
                    <span className="font-mono">
                      {priceDifference > 0 ? "+" : "-"}${Math.abs(priceDifference).toFixed(2)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirm */}
            <div className="space-y-2">
              <Button
                className="w-full font-mono text-xs"
                disabled={!hasChanges || items.length === 0}
              >
                {priceDifference > 0
                  ? `Update & Pay $${priceDifference.toFixed(2)}`
                  : "Update Subscription"}
              </Button>
              <Button variant="ghost" className="w-full text-xs" asChild>
                <Link href={`/account/subscriptions/${params.subscriptionId}`}>
                  Cancel
                </Link>
              </Button>
              {hasChanges && (
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  Changes will apply to your next order on Feb 13, 2026. 
                  {priceDifference > 0 && " The price difference will be charged now."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
