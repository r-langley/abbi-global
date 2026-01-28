"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, getCategoryBySlug, CUSTOM_CREAM_IMAGE } from "@/lib/product-data"

export default function InLabCreamsPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  
  // In a real app, this would come from auth/user context
  const hasSkinScan = false
  const isLoggedIn = false

  const category = getCategoryBySlug("in-lab-creams")
  const products = getProductsByCategory("in-lab-creams")

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
    setCartOpen(true)
    setTimeout(() => setCartOpen(false), 3000)
  }

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
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
        {/* Hero */}
        <section className="bg-primary/5 border-b border-border">
          <div className="container mx-auto px-6 py-12">
            <Breadcrumb className="mb-6">
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
                  <BreadcrumbPage>Custom Creams</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl md:text-4xl font-normal tracking-tight mb-2">Your Formula, Made Fresh</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Personalized skincare crafted in our French laboratory based on your unique skin analysis
            </p>
          </div>
        </section>

        {/* Skin Scan CTA for new users */}
        {!hasSkinScan && (
          <section className="border-b border-border">
            <div className="container mx-auto px-6 py-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4">Personalization Required</Badge>
                  <h2 className="text-2xl font-normal tracking-tight mb-4">
                    Get Your Personalized Recommendation
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our Custom Creams are formulated specifically for your skin. Complete a quick skin 
                    analysis to receive your personalized formula recommendation, or browse our base 
                    options below to learn more.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="font-mono uppercase tracking-widest">
                      <Link href="/skin-analysis">Start Skin Analysis</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-mono uppercase tracking-widest bg-transparent">
                      <Link href="/skin-analysis?mode=survey">Take Quick Survey</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={CUSTOM_CREAM_IMAGE || "/placeholder.svg"}
                    alt="Custom cream formulation"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        

        {/* Products Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-normal tracking-tight mb-2">Our Custom Cream Bases</h2>
            <p className="text-muted-foreground max-w-2xl">
              Each base is formulated with different hero ingredients. Your skin analysis will recommend 
              the best match, but you can explore all options below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                badge={product.recommended ? "Recommended" : undefined}
                href={`/shop/in-lab-creams/${product.slug}`}
                traits={product.traits}
                image={product.image}
                onAddToCart={hasSkinScan ? () => handleAddToCart(product) : undefined}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          {!hasSkinScan && (
            <section className="mt-16 text-center">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-normal tracking-tight mb-2">
                    Ready to discover your perfect formula?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Our AI-powered skin analysis takes just 2 minutes and provides personalized 
                    recommendations based on over 100 data points.
                  </p>
                  <Button asChild size="lg" className="font-mono uppercase tracking-widest">
                    <Link href="/skin-analysis">Start Your Skin Analysis</Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
