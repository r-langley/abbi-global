"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { getCategoryBySlug, getProductsByCategory, traits } from "@/lib/product-data"

export default function CategoryPageClient({ category: categorySlug }: { category: string }) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const category = getCategoryBySlug(categorySlug)
  const allProducts = getProductsByCategory(categorySlug)

  if (!category) {
    notFound()
  }

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]))
  }

  const products =
    selectedTraits.length > 0
      ? allProducts.filter((p) => selectedTraits.some((trait) => p.traits.includes(trait)))
      : allProducts

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
        <div className="container mx-auto px-6 py-16">
          <div className="mb-12">
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
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-normal tracking-tight mb-4">{category.name}</h1>
            <p className="text-lg text-muted-foreground">{category.description}</p>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                badge={product.recommended ? "Recommended" : undefined}
                href={`/shop/${categorySlug}/${product.slug}`}
                traits={product.traits}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
