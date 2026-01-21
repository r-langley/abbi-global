"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState } from "react"
import { Minus, Plus, Star, Sparkles, Droplet, Shield, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { GlobalNav } from "@/components/global-nav"
import { getProductBySlug, getCategoryBySlug, CUSTOM_CREAM_IMAGE } from "@/lib/product-data"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ProductPageClient({
  category: categorySlug,
  product: productSlug,
}: { category: string; product: string }) {
  const product = getProductBySlug(productSlug)
  const category = getCategoryBySlug(categorySlug)
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time")
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileToastQuantity, setMobileToastQuantity] = useState(1)
  const [toastTimeoutId, setToastTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  if (!product || !category || product.category !== categorySlug) {
    notFound()
  }

  const subscriptionPrice = product.price * 0.95
  const displayPrice = purchaseType === "subscription" ? subscriptionPrice : product.price
  const productImage = product.image || CUSTOM_CREAM_IMAGE

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      name: product.name,
      price: displayPrice,
      quantity: quantity,
      purchaseType: purchaseType,
      image: productImage,
    }
    setCartItems((prev) => [...prev, newItem])
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    if (isMobile) {
      // Mobile: Show toast at bottom
      setMobileToastQuantity(quantity)
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} - $${(displayPrice * quantity).toFixed(2)}`,
        action: (
          <ToastAction altText="View cart" onClick={() => setCartOpen(true)}>
            View Bag
          </ToastAction>
        ),
      })
    } else {
      // Desktop: Open cart drawer with peek effect
      setCartOpen(true)
      setTimeout(() => {
        setCartOpen(false)
      }, 3000)
    }
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
        <div className="container mx-auto px-6 py-6">
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
                  <Link href={`/shop/${categorySlug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={productImage || "/placeholder.svg"}
                    alt={`${product.name} - detail 1`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={productImage || "/placeholder.svg"}
                    alt={`${product.name} - detail 2`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={productImage || "/placeholder.svg"}
                    alt={`${product.name} - detail 3`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {product.recommended && (
                <Badge className="self-start text-background border-0 rounded-xs bg-primary">Recommended</Badge>
              )}
              <h1 className="font-normal tracking-tight text-3xl">{product.name}</h1>
              <p className="font-mono text-lg">${displayPrice.toFixed(2)}</p>

              <div className="flex flex-wrap gap-2">
                {product.traits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-sm rounded-full">
                    {trait}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground text-base">{product.description}</p>

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

              {/* Quantity Picker */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-mono text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
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

          {/* Custom Ingredients Section - Only for In-Lab Creams */}
          {product.category === "in-lab-creams" && (
            <section className="mt-16 py-6 px-6 bg-primary">
              <h2 className="text-3xl font-normal tracking-tight text-center mb-4 text-primary-foreground">Ingredients</h2>
              <p className="text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
                Each ingredient is carefully dosed based on your AI-powered skin analysis
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Droplet className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Hyaluronic Acid
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Deeply hydrates and plumps skin at multiple layers for lasting moisture
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">2.5% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Matrixyl Peptides
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Stimulates collagen production to reduce fine lines and improve firmness
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">1.8% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Niacinamide
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Brightens skin tone, minimizes pores, and strengthens the skin barrier
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">5% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Vitamin C
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Powerful antioxidant that brightens and protects against environmental damage
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">10% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Droplet className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Ceramide Complex
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Restores and maintains the skin's protective moisture barrier
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">3% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="group text-left p-6 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        Botanical Blend
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Soothing chamomile and green tea extracts calm inflammation and redness
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">4% concentration</Badge>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* Skin Traits & Scan Results */}
          <section className="py-16 bg-muted/30 -mx-6 px-6 md:-mx-0 md:px-12 rounded-lg">
            <h2 className="text-3xl font-normal tracking-tight text-center mb-4">Personalized for Your Skin</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              This formula targets the specific concerns identified in your skin scan
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-medium text-lg mb-4">Traits This Targets</h3>
                <div className="space-y-3">
                  {product.traits.map((trait) => (
                    <div key={trait} className="flex items-center gap-3 p-3 rounded-md bg-muted flex-row justify-start">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">Ingredient Purity</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Hyaluronic Acid</span>
                      <span className="text-sm font-mono">98.5%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "98.5%" }} />
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Peptide Complex</span>
                      <span className="text-sm font-mono">97.2%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "97.2%" }} />
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Botanical Extracts</span>
                      <span className="text-sm font-mono">99.1%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "99.1%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-primary/5 -mx-6 px-6 md:-mx-0 md:px-12 rounded-lg">
            <h2 className="text-3xl font-normal tracking-tight text-center mb-12">
              Why Your Skin Will Love This
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Clinically Proven Results</h3>
                <p className="text-sm text-muted-foreground">Visible improvements in skin texture within 2-4 weeks</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Dermatologist Tested</h3>
                <p className="text-sm text-muted-foreground">Safe for sensitive skin and hypoallergenic</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Droplet className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Clean Formulation</h3>
                <p className="text-sm text-muted-foreground">Free from parabens, sulfates, and synthetic fragrances</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Fast Absorption</h3>
                <p className="text-sm text-muted-foreground">Lightweight texture that doesn't clog pores</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16">
            <h2 className="text-3xl font-normal tracking-tight text-center mb-2">What Our Members Say</h2>
            <div className="flex items-center justify-center gap-2 mb-12">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-mono text-sm">4.9 out of 5</span>
              <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "My skin has never looked better. The personalized formula really works - I saw results in just
                    two weeks!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-sm">Sarah M.</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "Finally, a skincare product that's made specifically for MY skin. The texture is perfect and it
                    absorbs so quickly."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-sm">Jessica L.</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "Worth every penny. My hyperpigmentation has faded significantly and my skin feels so much more
                    balanced."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-sm">Maya P.</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-normal tracking-tight text-center mb-12">Questions? We're Here to Help</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How is this personalized for my skin?</AccordionTrigger>
                <AccordionContent>
                  Your formula is custom-blended in our French laboratory based on your AI-powered skin scan results.
                  We analyze over 100 data points including hydration levels, skin tone, texture, and specific
                  concerns to create your unique formulation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does it take to see results?</AccordionTrigger>
                <AccordionContent>
                  Most members notice improvements in skin texture and hydration within 2 weeks. For concerns like
                  dark spots or fine lines, visible results typically appear after 6-8 weeks of consistent use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I use this with other ABBI products?</AccordionTrigger>
                <AccordionContent>
                  Yes! This cream is designed to work seamlessly with other ABBI products. Apply after serums and
                  concentrates for best results. Your personalized routine guide provides specific layering
                  instructions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What if my skin changes over time?</AccordionTrigger>
                <AccordionContent>
                  We recommend retaking your skin scan every 3-6 months to adjust your formula as your skin evolves
                  with seasons, lifestyle changes, or aging. Your personalized formula can be updated at any time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </>
  )
}
