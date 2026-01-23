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
import { getProductsByCategory, getCategoryBySlug, CUSTOM_CREAM_IMAGE, DEFAULT_PRODUCT_IMAGE } from "@/lib/product-data"

export default function MixAtHomePage() {
  const [selectedBase, setSelectedBase] = useState<string | null>(null)
  const [selectedConcentrates, setSelectedConcentrates] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const category = getCategoryBySlug("mix-at-home")
  const bases = getProductsByCategory("mix-at-home")
  const concentrates = getProductsByCategory("active-concentrate")

  const handleSelectBase = (baseId: string) => {
    setSelectedBase(baseId)
  }

  const handleToggleConcentrate = (concentrateId: string) => {
    setSelectedConcentrates((prev) =>
      prev.includes(concentrateId) ? prev.filter((id) => id !== concentrateId) : [...prev, concentrateId]
    )
  }

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

  const selectedBaseProduct = bases.find((b) => b.id === selectedBase)
  const selectedConcentrateProducts = concentrates.filter((c) => selectedConcentrates.includes(c.id))

  const totalPrice =
    (selectedBaseProduct?.price || 0) +
    selectedConcentrateProducts.reduce((sum, c) => sum + c.price, 0)

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
                  <BreadcrumbPage>Mix at Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl md:text-4xl font-normal tracking-tight mb-2">Build Your Routine</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Select a cream base, then customize with active concentrates for targeted results
            </p>
          </div>
        </section>

        {/* How It Works */}
        

        <div className="container mx-auto px-6 py-6">
          {/* Step 1: Choose Base */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-mono">
                1
              </div>
              <h2 className="text-2xl font-normal tracking-tight">Choose Your Cream Base</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Your base determines the texture and feel of your final cream. Each is formulated to work 
              seamlessly with our active concentrates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {bases.map((base) => (
                <Card
                  key={base.id}
                  className={`cursor-pointer transition-all ${
                    selectedBase === base.id
                      ? "ring-2 ring-primary border-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleSelectBase(base.id)}
                >
                  <CardContent className="p-4">
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                      <Image
                        src={base.image || CUSTOM_CREAM_IMAGE}
                        alt={base.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{base.name.split(' ').slice(0, 2).join(' ')}</h3>
                      {selectedBase === base.id && (
                        <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{base.description}</p>
                    <div className="flex justify-between flex-col items-start gap-3">
                      <span className="font-mono text-sm">${base.price.toFixed(2)}</span>
                      <div className="flex gap-1">
                        {base.traits.slice(0, 2).map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Step 2: Add Concentrates */}
          <section className={`mb-16 transition-opacity ${selectedBase ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                selectedBase ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                2
              </div>
              <h2 className="text-2xl font-normal tracking-tight">Add Active Concentrates</h2>
              {!selectedBase && (
                <Badge variant="outline" className="text-xs">Select a base first</Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Each concentrate targets specific skin concerns. Add 2-3 drops to your base before applying. 
              We recommend selecting 1-3 concentrates based on your primary concerns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concentrates.map((concentrate) => (
                <Card
                  key={concentrate.id}
                  className={`cursor-pointer transition-all ${
                    selectedConcentrates.includes(concentrate.id)
                      ? "ring-2 ring-primary border-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleToggleConcentrate(concentrate.id)}
                >
                  <CardContent className="p-4">
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                      <Image
                        src={concentrate.image || DEFAULT_PRODUCT_IMAGE}
                        alt={concentrate.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{concentrate.name}</h3>
                      {selectedConcentrates.includes(concentrate.id) && (
                        <Badge className="bg-primary text-primary-foreground">Added</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{concentrate.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">${concentrate.price.toFixed(2)}</span>
                      <div className="flex gap-1">
                        {concentrate.traits.slice(0, 2).map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Selection Summary */}
          {selectedBase && (
            <section className="sticky bottom-4 z-40">
              <Card className="bg-background/95 backdrop-blur border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Your Custom Routine</h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <Badge variant="secondary">{selectedBaseProduct?.name.split(' ').slice(0, 2).join(' ')}</Badge>
                        {selectedConcentrateProducts.map((c) => (
                          <Badge key={c.id} variant="outline">{c.name.split(' ').slice(0, 3).join(' ')}</Badge>
                        ))}
                        {selectedConcentrates.length === 0 && (
                          <span className="text-muted-foreground">+ Add concentrates</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-mono">${totalPrice.toFixed(2)}</p>
                      </div>
                      <Button
                        size="lg"
                        className="font-mono uppercase tracking-widest"
                        onClick={() => {
                          if (selectedBaseProduct) handleAddToCart(selectedBaseProduct)
                          selectedConcentrateProducts.forEach((c) => handleAddToCart(c))
                        }}
                      >
                        Add All to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
