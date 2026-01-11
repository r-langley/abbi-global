"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { categories, traits, productData } from "@/lib/product-data"

export default function ShopPage() {
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null)

  const filteredProducts = selectedTrait ? productData.filter((p) => p.traits.includes(selectedTrait)) : productData

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6 px-4">
          <section className="mb-12">
            <h2 className="text-xl font-normal tracking-tight mb-4">Filter by Trait</h2>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant={selectedTrait === null ? "default" : "outline"}
                className="px-4 py-2 text-sm rounded-full cursor-pointer"
                onClick={() => setSelectedTrait(null)}
              >
                All
              </Badge>
              {traits.map((trait) => (
                <Badge
                  key={trait}
                  variant={selectedTrait === trait ? "default" : "outline"}
                  className="px-4 py-2 text-sm rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedTrait(trait)}
                >
                  {trait}
                </Badge>
              ))}
            </div>
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
