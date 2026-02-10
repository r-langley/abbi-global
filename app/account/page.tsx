"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getMorningRoutine, getEveningRoutine, mockOrders, mockSubscriptions, mockPromotions } from "@/lib/account-data"
import { productData } from "@/lib/product-data"
import { SectionHeader } from "@/components/account/section-header"
import { TopSkinTraits } from "@/components/account/top-skin-traits"
import { getTopSkinTraits, getAllSkinTraits, mockSkinScans } from "@/lib/account-data"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AccountPage() {
  const routineProducts = {
    morning: getMorningRoutine(),
    evening: getEveningRoutine(),
  }
  
  const latestScan = mockSkinScans[0]
  const topTraits = getTopSkinTraits(latestScan)
  const allTraits = getAllSkinTraits(latestScan)

  // Most recent order
  const latestOrder = {
    orderId: "GC-2023-1256",
    orderNumber: "#GC-2023-1256",
    date: "December 20, 2023",
    status: "In Production",
    statusVariant: "outline" as const,
    total: 124.89,
    itemCount: 4,
  }

  // Next subscription renewal with products
  const nextRenewal = {
    date: "Mar 15, 2024",
    daysUntil: 2,
    products: [
      { name: "Custom Formula - Aloe Vera" },
      { name: "No. 1 Hydration" },
    ],
    hasNewRecommendation: true,
    recommendedSwap: {
      current: "No. 1 Hydration",
      suggested: "Actif N°20 - Regulation",
      reason: "Your latest scan shows Regulation (78) as your top concern",
    },
  }

  // Scan reminder state
  const scanReminderActive = nextRenewal.daysUntil <= 3

  return (
    <div className="space-y-5">
          {/* Scan Reminder Alert */}
          {scanReminderActive && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm mb-1">Time for your monthly scan</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Subscription renews in {nextRenewal.daysUntil} days. Scan to update your recommendations.
                    </p>
                    <Button size="sm" variant="default" className="font-mono text-xs" asChild>
                      <Link href="/skin-analysis">Start Scan</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Priority Data: My Skin, Orders, Subscriptions */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* My Skin - Top 3 Traits */}
            <Card className="h-full flex flex-col">
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">My Skin</p>
                  </div>
                  <Link href="/account/scan-history">
                    <svg className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center flex-1">
                  <TopSkinTraits traits={allTraits} scanDate={latestScan.shortDate} />
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 font-mono text-xs" asChild>
                  <Link href="/skin-analysis">New Scan</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Orders */}
            <Card className="h-full flex flex-col">
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <Link href="/account/orders">
                    <svg className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="flex flex-col flex-1 justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src="/minimalist-cosmetic-pump-bottle-cream.jpg" alt="Latest order" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{latestOrder.orderNumber}</span>
                        <Badge variant={latestOrder.statusVariant} className="text-xs">{latestOrder.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{latestOrder.date}</p>
                    </div>
                  </div>
                  
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 font-mono text-xs" asChild>
                  <Link href={`/account/orders/${latestOrder.orderId}`}>Track Order</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Subscriptions */}
            <Link href="/account/subscriptions" className="block">
              <Card className={`cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col ${nextRenewal.hasNewRecommendation ? "border-primary/30" : ""}`}>
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <p className="text-xs text-muted-foreground">Subscriptions</p>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-1 justify-center gap-3">
                    <div>
                      <p className="text-sm mb-1">Renews {nextRenewal.date}</p>
                      <p className="text-xs text-muted-foreground">{nextRenewal.daysUntil} days away</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {nextRenewal.products.map((p, i) => (
                        <div key={i} className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <Image src="/minimalist-cosmetic-pump-bottle-cream.jpg" alt={p.name} fill className="object-cover" />
                        </div>
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{nextRenewal.products.length} products</span>
                    </div>
                    {nextRenewal.hasNewRecommendation && (
                      <div className="bg-primary/5 rounded-md p-2">
                        <p className="text-xs text-primary font-medium">New recommendation available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Routine Section */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Morning Routine */}
            <Card>
              <div className="relative w-full h-24 overflow-hidden">
                <Image
                  src="/images/morning-routine-header.jpg"
                  alt="Morning routine"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <CardContent className="p-6 -mt-4 relative">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="text-sm font-medium">Morning</h3>
                </div>
                <div className="space-y-4">
                  {routineProducts.morning.map((item) => (
                    <div key={item.step} className={`flex gap-4 p-4 rounded-lg ${item.owned ? "bg-muted/30" : "border border-dashed border-muted-foreground/20"}`}>
                      <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.product.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"} alt={item.product.name} fill className="object-cover" />
                        {item.owned && (
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-tl-md flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">{item.step}</span>
                              <h4 className="text-sm font-medium">{item.product.name}</h4>
                            </div>
                            {item.owned && item.source && (
                              <span className="text-[10px] text-muted-foreground">via {item.source}</span>
                            )}
                          </div>
                          {!item.owned && (
                            <Button size="sm" variant="outline" className="text-xs h-8 px-3 flex-shrink-0 font-mono">Add</Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{item.advice}</p>
                        <ul className="space-y-1">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
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
              <div className="relative w-full h-24 overflow-hidden">
                <Image
                  src="/images/evening-routine-header.jpg"
                  alt="Evening routine"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <CardContent className="p-6 -mt-4 relative">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <h3 className="text-sm font-medium">Evening</h3>
                </div>
                <div className="space-y-4">
                  {routineProducts.evening.map((item) => (
                    <div key={item.step} className={`flex gap-4 p-4 rounded-lg ${item.owned ? "bg-muted/30" : "border border-dashed border-muted-foreground/20"}`}>
                      <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.product.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"} alt={item.product.name} fill className="object-cover" />
                        {item.owned && (
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-tl-md flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">{item.step}</span>
                              <h4 className="text-sm font-medium">{item.product.name}</h4>
                            </div>
                            {item.owned && item.source && (
                              <span className="text-[10px] text-muted-foreground">via {item.source}</span>
                            )}
                          </div>
                          {!item.owned && (
                            <Button size="sm" variant="outline" className="text-xs h-8 px-3 flex-shrink-0 font-mono">Add</Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{item.advice}</p>
                        <ul className="space-y-1">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
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
        </TabsContent>

        {/* Orders Tab Content */}
        <TabsContent value="orders" className="space-y-6">
          <SectionHeader title="Orders" />
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <OrderCard key={order.orderId} {...order} />
            ))}
          </div>
        </TabsContent>

        {/* Subscriptions Tab Content */}
        <TabsContent value="subscriptions" className="space-y-6">
          <SectionHeader title="Subscriptions" />
          <SubscriptionsTable subscriptions={mockSubscriptions} />
        </TabsContent>

        {/* Rewards Tab Content */}
        <TabsContent value="rewards" className="space-y-8">
          <SectionHeader title="Rewards & Promotions" />

          {/* Promotions */}
          <section>
            <h3 className="text-sm font-medium mb-4">Current Promotions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockPromotions.map((promo) => (
                <Card key={promo.id}>
                  <CardContent className="p-5">
                    <Badge className={promo.status === "active" ? "" : ""}
                      variant={promo.status === "active" ? "default" : "secondary"}
                    >
                      {promo.status === "active" ? "Active" : promo.status === "upcoming" ? "Upcoming" : "Expired"}
                    </Badge>
                    <h3 className="text-sm mt-3 mb-1">{promo.title}</h3>
                    {promo.expiryDate && (
                      <p className="text-xs text-muted-foreground mb-3">Expires {promo.expiryDate}</p>
                    )}
                    {promo.validPeriod && (
                      <p className="text-xs text-muted-foreground mb-3">Valid {promo.validPeriod}</p>
                    )}
                    {promo.code && (
                      <div className="bg-muted p-3 rounded font-mono text-center tracking-widest">{promo.code}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Favorites */}
          <section>
            <h3 className="text-sm font-medium mb-4">My Favorite Products</h3>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Your saved favorites will appear here. Browse the shop to add products to your favorites.</p>
              </CardContent>
            </Card>
          </section>

          {/* Product Catalog */}
          <section>
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-lg font-normal mb-2">ABBI Product Catalog 2024</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Browse our complete collection of personalized skincare solutions
                </p>
              </CardContent>
            </Card>
          </section>
    </div>
  )
}
