"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { productData } from "@/lib/product-data"

export default function AccountPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hello! I'm your ABBI AI assistant. How can I help with your skincare today?" },
  ])

  const isAmbassador = true

  const routineProducts = {
    morning: [
      {
        product: productData.find((p) => p.slug === "exfoliating-cleansing-foam")!,
        step: 1,
        advice: "Massage gently in circular motions for 60 seconds to activate the cleansing foam",
        benefits: ["Removes overnight impurities", "Preps skin for product absorption", "Balances skin pH"],
      },
      {
        product: productData.find((p) => p.slug === "hyaluronic-acid-plumping-serum")!,
        step: 2,
        advice: "Apply 2-3 drops while skin is still damp for maximum absorption",
        benefits: ["Plumps fine lines", "Provides 24-hour hydration", "Creates moisture barrier"],
      },
      {
        product: productData.find((p) => p.slug === "aloe-vera-base")!,
        step: 3,
        advice: "Apply upward motions from center of face outward, including neck",
        benefits: ["Locks in hydration", "Soothes sensitivity", "Protects throughout the day"],
      },
    ],
    evening: [
      {
        product: productData.find((p) => p.slug === "soothing-revitalizing-oil")!,
        step: 1,
        advice: "Warm between palms and massage into dry skin to dissolve makeup and impurities",
        benefits: ["Gentle makeup removal", "Nourishes while cleansing", "Maintains skin barrier"],
      },
      {
        product: productData.find((p) => p.slug === "no-1-hydration")!,
        step: 2,
        advice: "Mix 2-3 drops with your evening cream for boosted hydration",
        benefits: ["Intensifies moisture", "Enhances cream effectiveness", "Customizes your routine"],
      },
      {
        product: productData.find((p) => p.slug === "aloe-vera-base")!,
        step: 3,
        advice: "Apply generously for overnight repair and regeneration",
        benefits: ["Night repair mode", "Cellular regeneration", "Wake up refreshed"],
      },
    ],
  }

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex gap-6 flex-wrap items-center flex-row justify-center">
                <div className="flex items-center gap-4 flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-20 h-20 rounded-full bg-muted flex items-center justify-center hover:opacity-80 transition-opacity">
                        <span className="text-3xl font-normal font-sans">SM</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Photo</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Button variant="outline" className="w-full font-mono text-xs bg-transparent">
                          Take Selfie
                        </Button>
                        <Button variant="outline" className="w-full font-mono text-xs bg-transparent">
                          Upload Photo
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div>
                    <div className="flex gap-2 flex-col items-start mb-0">
                      <h1 className="text-3xl font-normal tracking-tight">Sarah Miller</h1>
                      {isAmbassador && <Badge className="bg-primary text-primary-foreground">Ambassador</Badge>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border border-none">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-4 font-mono text-xs bg-transparent justify-center gap-2"
                    asChild
                  >
                    <Link href="/skin-analysis">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      New Skin Scan
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 font-mono text-xs bg-transparent justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reorder Last
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-auto py-4 font-mono text-xs bg-transparent justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        View Routine
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                      <SheetHeader className="px-6">
                        <SheetTitle>My ABBI Routine</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-6 px-6">
                        <div>
                          <h3 className="font-normal mb-3">Morning Routine</h3>
                          <ol className="space-y-3">
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">1.</span>
                              <div>
                                <p className="font-normal">Exfoliating Cleansing Foam</p>
                                <p className="text-sm text-muted-foreground">Gently cleanse and prep skin</p>
                              </div>
                            </li>
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">2.</span>
                              <div>
                                <p className="font-normal">Hyaluronic Acid Serum</p>
                                <p className="text-sm text-muted-foreground">Apply 2-3 drops for deep hydration</p>
                              </div>
                            </li>
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">3.</span>
                              <div>
                                <p className="font-normal">Custom Cream - Aloe Vera Base</p>
                                <p className="text-sm text-muted-foreground">Moisturize and protect</p>
                              </div>
                            </li>
                          </ol>
                        </div>
                        <div>
                          <h3 className="font-normal mb-3">Evening Routine</h3>
                          <ol className="space-y-3">
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">1.</span>
                              <div>
                                <p className="font-normal">Soothing and Revitalizing Oil</p>
                                <p className="text-sm text-muted-foreground">Remove makeup and impurities</p>
                              </div>
                            </li>
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">2.</span>
                              <div>
                                <p className="font-normal">No. 1 Hydration Concentrate</p>
                                <p className="text-sm text-muted-foreground">Mix with evening cream</p>
                              </div>
                            </li>
                            <li className="flex gap-4">
                              <span className="text-muted-foreground">3.</span>
                              <div>
                                <p className="font-normal">Custom Cream - Aloe Vera Base</p>
                                <p className="text-sm text-muted-foreground">Night repair and regeneration</p>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  {isAmbassador && (
                    <Button
                      variant="default"
                      className="h-auto py-4 bg-primary hover:bg-primary/90 font-mono text-xs justify-center gap-2"
                      asChild
                    >
                      <Link href="/ambassador-dashboard" target="_blank">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Go to Dashboard
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Skin Scan History */}
            <section>
              <h2 className="text-2xl font-normal mb-6">Skin Scan History</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground font-mono mb-2">Latest Scan</p>
                    <p className="text-sm mb-1">December 15, 2023</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-normal">8.2</span>
                      <span className="text-muted-foreground">/ 10</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground font-mono mb-2">Previous Scan</p>
                    <p className="text-sm mb-1">September 10, 2023</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-normal">7.8</span>
                      <span className="text-muted-foreground">/ 10</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Orders & Subscriptions */}
            <section>
              <h2 className="text-2xl font-normal mb-6">Orders & Subscriptions</h2>
              <div className="space-y-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Gentle Cleanser"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-normal mb-1">Gentle Cleanser</p>
                                <p className="text-xs text-muted-foreground font-mono">#GC-2023-1256</p>
                              </div>
                              <Badge variant="secondary">Pending</Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Date</span>
                                <span>Dec 20, 2023</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total</span>
                                <span className="font-medium">$17.89</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Based on Scan</span>
                                <span>Dec 15, 2023 (8.2/10)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="px-6">
                      <SheetTitle>Order #GC-2023-1256</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 px-6">
                      <div>
                        <h3 className="font-normal mb-4">Scan Analysis</h3>
                        <Card>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Scan Date</span>
                              <span className="text-sm">December 15, 2023</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Skin Score</span>
                              <span className="text-sm font-medium">8.2 / 10</span>
                            </div>
                            <div className="pt-3 border-t">
                              <p className="text-xs text-muted-foreground mb-2">Recommended Traits</p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">Hydration</Badge>
                                <Badge variant="outline">Sensitivity</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div>
                        <h3 className="font-normal mb-4">Order Details</h3>
                        <div className="flex gap-4 mb-4">
                          <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Gentle Cleanser"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-normal mb-2">Gentle Cleanser</p>
                            <p className="text-sm text-muted-foreground mb-2">Based on your scan results</p>
                            <p className="text-sm font-medium">$17.89</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button className="w-full font-mono text-xs">Confirm Order</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Custom Formula"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-normal mb-1">Custom Formula</p>
                                <p className="text-xs text-muted-foreground font-mono">#CF-2023-1245</p>
                              </div>
                              <Badge className="bg-primary text-primary-foreground">In Production</Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Date</span>
                                <span>Dec 18, 2023</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total</span>
                                <span className="font-medium">$89.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Based on Scan</span>
                                <span>Dec 15, 2023 (8.2/10)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="px-6">
                      <SheetTitle>Order #CF-2023-1245</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 px-6">
                      <div>
                        <h3 className="font-normal mb-4">Scan Analysis</h3>
                        <Card>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Scan Date</span>
                              <span className="text-sm">December 15, 2023</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Skin Score</span>
                              <span className="text-sm font-medium">8.2 / 10</span>
                            </div>
                            <div className="pt-3 border-t">
                              <p className="text-xs text-muted-foreground mb-2">Recommended Traits</p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">Hydration</Badge>
                                <Badge variant="outline">Wrinkles</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div>
                        <h3 className="font-normal mb-4">Order Details</h3>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt="Aloe Vera Base"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-normal mb-2">Aloe Vera Base</p>
                              <p className="text-sm text-muted-foreground mb-2">Custom formula for hydration</p>
                              <p className="text-sm font-medium">$89.00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className="bg-primary text-primary-foreground">In Production</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Estimated Ship Date</span>
                          <span className="text-sm">December 22, 2023</span>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4 mb-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Hyaluronic Acid Serum"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-normal mb-1">Hyaluronic Acid Serum - Subscription</p>
                                <p className="text-sm text-muted-foreground">Delivered every 60 days</p>
                              </div>
                              <Badge>Subscription</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Tap to view subscription details</p>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="px-6">
                      <SheetTitle>Subscription Details</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 px-6">
                      <div>
                        <h3 className="font-normal mb-4">Product</h3>
                        <div className="flex gap-4 mb-4">
                          <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Hyaluronic Acid Serum"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-normal mb-2">Hyaluronic Acid Serum</p>
                            <div className="flex gap-2 mb-2">
                              <Badge variant="outline">Hydration</Badge>
                              <Badge variant="outline">Wrinkles</Badge>
                            </div>
                            <p className="text-sm font-medium">$34.00</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Frequency</span>
                          <span className="text-sm">Every 60 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Next Delivery</span>
                          <span className="text-sm">January 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price</span>
                          <span className="text-sm font-medium">$34.00</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 font-mono text-xs bg-transparent">
                          Skip Next
                        </Button>
                        <Button variant="outline" className="flex-1 font-mono text-xs bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </section>

            {/* Favorites */}
            <section>
              <h2 className="text-2xl font-normal mb-2">My Favorite Products</h2>
              <p className="text-sm text-muted-foreground mb-6">Quick access to your most-loved items</p>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard
                      title="Hyaluronic Acid Serum"
                      price={34.0}
                      href="/shop/essential/hyaluronic-acid-plumping-serum"
                      traits={["Hydration", "Wrinkles"]}
                      badge="Favorite"
                      image="/minimalist-cosmetic-pump-bottle-cream.jpg"
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard
                      title="Aloe Vera Base"
                      price={89.0}
                      href="/shop/in-lab-creams/aloe-vera-base"
                      traits={["Hydration", "Sensitivity"]}
                      badge="Favorite"
                      image="/minimalist-cosmetic-pump-bottle-cream.jpg"
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard
                      title="No. 1 Hydration"
                      price={22.0}
                      href="/shop/active-concentrate/no-1-hydration"
                      traits={["Hydration"]}
                      badge="Favorite"
                      image="/minimalist-cosmetic-pump-bottle-cream.jpg"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            {/* My ABBI Routine */}
            <section>
              <h2 className="text-2xl font-normal mb-2">My ABBI Routine</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Your personalized skincare prescription based on your latest skin analysis
              </p>

              <div className="space-y-8">
                {/* Morning Routine */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <h3 className="text-xl font-normal">Morning Routine</h3>
                    </div>
                    <div className="space-y-6">
                      {routineProducts.morning.map((item) => (
                        <div key={item.step} className="flex gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-muted rounded-lg relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                                    {item.step}
                                  </span>
                                  <h4 className="font-normal text-lg">{item.product.name}</h4>
                                </div>
                                <div className="flex gap-2 mb-2">
                                  {item.product.traits.map((trait) => (
                                    <Badge key={trait} variant="outline" className="text-xs">
                                      {trait}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm font-medium">${item.product.price.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-foreground font-medium italic">{item.advice}</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {item.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Evening Routine */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <h3 className="text-xl font-normal">Evening Routine</h3>
                    </div>
                    <div className="space-y-6">
                      {routineProducts.evening.map((item) => (
                        <div key={item.step} className="flex gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-muted rounded-lg relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                                    {item.step}
                                  </span>
                                  <h4 className="font-normal text-lg">{item.product.name}</h4>
                                </div>
                                <div className="flex gap-2 mb-2">
                                  {item.product.traits.map((trait) => (
                                    <Badge key={trait} variant="outline" className="text-xs">
                                      {trait}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm font-medium">${item.product.price.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-foreground font-medium italic">{item.advice}</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {item.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Current Promotions */}
            <section>
              <h2 className="text-2xl font-normal mb-6">Current Promotions</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <Badge className="mb-4">Active</Badge>
                    <h3 className="text-xl font-normal mb-2">10% Off Your Next Custom Formula</h3>
                    <p className="text-sm text-muted-foreground mb-4">Expires January 31, 2024</p>
                    <div className="bg-muted p-4 rounded font-mono text-center text-lg tracking-widest">CUSTOM10</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-4">
                      Upcoming
                    </Badge>
                    <h3 className="text-xl font-normal mb-2">Free Shipping on Orders Over $50</h3>
                    <p className="text-sm text-muted-foreground">Valid February 1-14, 2024</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Product Catalog */}
            <section>
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-normal mb-4">ABBI Product Catalog 2024</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Browse our complete collection of personalized skincare solutions
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button className="font-mono text-xs">View Online Catalog</Button>
                    <Button variant="outline" className="font-mono text-xs bg-transparent">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
              aria-label="Open ABBI AI chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md h-[500px] flex flex-col rounded-xl">
            <DialogHeader>
              <DialogTitle className="font-normal text-xl">ABBI AI Assistant</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-4 border-t">
              <Input placeholder="Ask about your skincare..." className="flex-1" />
              <Button size="icon">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
