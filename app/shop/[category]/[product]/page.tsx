import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"
import { getProductBySlug, getCategoryBySlug } from "@/lib/product-data"

export default function ProductPage({ params }: { params: { category: string; product: string } }) {
  const product = getProductBySlug(params.product)
  const category = getCategoryBySlug(params.category)

  if (!product || !category || product.category !== params.category) {
    notFound()
  }

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <Link
            href={`/shop/${params.category}`}
            className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
          >
            ← Back to {category.name}
          </Link>

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
              <p className="text-3xl font-mono">${product.price.toFixed(2)}</p>

              <div className="flex flex-wrap gap-2">
                {product.traits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-sm rounded-full">
                    {trait}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-muted-foreground">{product.description}</p>

              <div className="flex gap-4 mt-4">
                <Button size="lg" className="flex-1 font-mono uppercase tracking-widest">
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
