"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { categories, traits, productData } from "@/lib/product-data"

export default function ShopPage() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]))
  }

  const filteredProducts =
    selectedTraits.length > 0
      ? productData.filter((p) => selectedTraits.some((trait) => p.traits.includes(trait)))
      : productData

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
        <div className="container mx-auto py-6 px-4">
          <section className="mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filter by Trait
                  {selectedTraits.length > 0 && <Badge variant="secondary">{selectedTraits.length}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {traits.map((trait) => (
                  <DropdownMenuCheckboxItem
                    key={trait}
                    checked={selectedTraits.includes(trait)}
                    onCheckedChange={() => toggleTrait(trait)}
                  >
                    {trait}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          <section className="space-y-16">
            {categories.map((cat) => {
              const categoryProducts = filteredProducts.filter((p) => p.category === cat.slug)
              if (categoryProducts.length === 0) return null

              return (
                <div key={cat.slug}>
                  <div className="mb-6">
                    <Link href={`/shop/${cat.slug}`} className="group">
                      <h2 className="text-2xl font-normal tracking-tight mb-2 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground">{cat.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categoryProducts.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        badge={product.recommended ? "Recommended" : undefined}
                        href={`/shop/${cat.slug}/${product.slug}`}
                        traits={product.traits}
                        onAddToCart={() => handleAddToCart(product)}
                      />
                    ))}
                  </div>

                  {categoryProducts.length > 4 && (
                    <div className="mt-6 text-center">
                      <Link
                        href={`/shop/${cat.slug}`}
                        className="text-sm font-mono hover:text-primary transition-colors"
                      >
                        View all {categoryProducts.length} products →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </section>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found for selected trait.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
