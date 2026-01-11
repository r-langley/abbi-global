"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function AccountPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hello! I'm your ABBI AI assistant. How can I help with your skincare today?" },
  ])

  const isAmbassador = true

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
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
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-3xl font-normal tracking-tight">Sarah Miller</h1>
                      {isAmbassador && <Badge className="bg-primary text-primary-foreground">Ambassador</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">Member since March 2023</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {isAmbassador && (
                    <Button variant="outline" asChild className="font-mono text-xs bg-transparent">
                      <Link href="/ambassador-dashboard" target="_blank">
                        Business Center →
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h2 className="text-sm font-mono text-muted-foreground mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-auto py-4 font-mono text-xs bg-transparent">
                    New Skin Scan
                  </Button>
                  <Button variant="outline" className="h-auto py-4 font-mono text-xs bg-transparent">
                    Reorder Last
                  </Button>
                  <Button variant="outline" className="h-auto py-4 font-mono text-xs bg-transparent">
                    View Routine
                  </Button>
                  <Button variant="outline" className="h-auto py-4 font-mono text-xs bg-transparent" asChild>
                    <Link href="/join">Become Ambassador</Link>
                  </Button>
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
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-normal mb-1">Gentle Cleanser #GC-2023-1256</p>
                        <p className="text-sm text-muted-foreground">Ordered December 20, 2023</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Please confirm your order to begin processing</p>
                    <Button size="sm" className="font-mono text-xs">
                      Confirm Order
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-normal mb-1">Custom Formula #CF-2023-1245</p>
                        <p className="text-sm text-muted-foreground">Ordered December 18, 2023</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">In Production</Badge>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1 h-1 bg-foreground rounded"></div>
                      <div className="flex-1 h-1 bg-foreground rounded"></div>
                      <div className="flex-1 h-1 bg-muted rounded"></div>
                      <div className="flex-1 h-1 bg-muted rounded"></div>
                      <div className="flex-1 h-1 bg-muted rounded"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-mono mb-4">
                      <span>Ordered</span>
                      <span>Production</span>
                      <span>Shipped</span>
                      <span>Transit</span>
                      <span>Delivered</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order #CF-2023-1245</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div>
                            <h3 className="font-normal mb-2">Custom Formula - Aloe Vera Base</h3>
                            <p className="text-sm text-muted-foreground mb-4">Ordered December 18, 2023</p>
                            <div className="flex justify-between items-center py-4 border-t">
                              <span className="text-muted-foreground">Total</span>
                              <span className="font-normal text-lg">$89.00</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-normal mb-2">Personalized for:</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Hydration</Badge>
                              <Badge variant="outline">Sensitivity</Badge>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-normal mb-2">Based on Scan Results:</h4>
                            <p className="text-sm text-muted-foreground">December 15, 2023 - Score: 8.2/10</p>
                            <div className="mt-4 p-4 bg-muted rounded">
                              <p className="text-sm mb-2">Your skin analysis showed:</p>
                              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                <li>High hydration needs</li>
                                <li>Sensitivity to harsh ingredients</li>
                                <li>Improved barrier function since last scan</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-normal mb-1">Hyaluronic Acid Serum - Subscription</p>
                        <p className="text-sm text-muted-foreground">Delivered every 60 days</p>
                      </div>
                      <Badge>Subscription</Badge>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Next delivery:</span>
                        <span>January 15, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span>$34.00</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                        Skip Next
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard
                      title="Aloe Vera Base"
                      price={89.0}
                      href="/shop/in-lab-creams/aloe-vera-base"
                      traits={["Hydration", "Sensitivity"]}
                      badge="Favorite"
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard
                      title="No. 1 Hydration"
                      price={22.0}
                      href="/shop/active-concentrate/no-1-hydration"
                      traits={["Hydration"]}
                      badge="Favorite"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            {/* My ABBI Routine */}
            <section>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-normal mb-2">My ABBI Routine</h2>
                  <p className="text-sm text-muted-foreground mb-6">Your personalized beauty prescription</p>
                  <div className="space-y-6">
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
                </CardContent>
              </Card>
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
