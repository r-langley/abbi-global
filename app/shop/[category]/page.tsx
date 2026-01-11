import Link from "next/link"
import { notFound } from "next/navigation"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/product-data"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category)
  const products = getProductsByCategory(params.category)

  if (!category) {
    notFound()
  }

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="mb-12">
            <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
              ← Back to Shop
            </Link>
            <h1 className="text-4xl font-normal tracking-tight mb-4">{category.name}</h1>
            <p className="text-lg text-muted-foreground">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                badge={product.recommended ? "Recommended" : undefined}
                href={`/shop/${params.category}/${product.slug}`}
                traits={product.traits}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
