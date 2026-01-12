"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { GlobalNav } from "@/components/global-nav"
import { getProductBySlug, getCategoryBySlug } from "@/lib/product-data"

export default function ProductPageClient({ params }: { params: { category: string; product: string } }) {
  const product = getProductBySlug(params.product)
  const category = getCategoryBySlug(params.category)
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  if (!product || !category || product.category !== params.category) {
    notFound()
  }

  const subscriptionPrice = product.price * 0.95
  const displayPrice = purchaseType === "subscription" ? subscriptionPrice : product.price

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      name: product.name,
      price: displayPrice,
      quantity: 1,
      purchaseType: purchaseType,
      image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
    }
    setCartItems([...cartItems, newItem])
    setCartOpen(true)

    setTimeout(() => {
      setCartOpen(false)
    }, 3000)
  }

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  return (
    <>
      <GlobalNav
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/shop/${params.category}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-6">
              {product.recommended && (
                <Badge className="self-start text-background border-0 rounded-xs bg-primary">Recommended</Badge>
              )}
              <h1 className="text-4xl font-normal tracking-tight">{product.name}</h1>
              <p className="text-3xl font-mono">${displayPrice.toFixed(2)}</p>

              <div className="flex flex-wrap gap-2">
                {product.traits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-sm rounded-full">
                    {trait}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-muted-foreground">{product.description}</p>

              <div className="border border-border rounded-lg p-6">
                <RadioGroup
                  value={purchaseType}
                  onValueChange={(value) => setPurchaseType(value as "one-time" | "subscription")}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <div className="flex-1">
                      <Label htmlFor="one-time" className="text-base font-medium cursor-pointer">
                        One-Time Purchase
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1 font-mono">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <div className="flex-1">
                      <Label
                        htmlFor="subscription"
                        className="text-base font-medium cursor-pointer flex items-center gap-2"
                      >
                        ABBI Autoship
                        <Badge variant="secondary" className="text-xs">
                          Save 5%
                        </Badge>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1 font-mono">
                        ${subscriptionPrice.toFixed(2)} • Delivered monthly
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4 mt-4">
                <Button size="lg" className="flex-1 font-mono uppercase tracking-widest" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="font-mono uppercase tracking-widest bg-transparent">
                  Learn More
                </Button>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h3 className="text-sm font-medium mb-4">Product Details</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Made in France</li>
                  <li>• Personalized formula</li>
                  <li>• Dermatologically tested</li>
                  <li>• Suitable for all skin types</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
