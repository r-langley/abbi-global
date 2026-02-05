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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { productData } from "@/lib/product-data"
import { SectionHeader } from "@/components/account/section-header"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AccountPage() {
  const [sameAsHome, setSameAsHome] = useState(true)

  const isAmbassador = true
  const viewingAsFamilyMember = "Emily Miller"

  const ambassador = {
    name: "Jennifer Davis",
    initials: "JD",
    title: "Skincare Specialist",
    email: "jennifer.davis@example.com",
  }

  // Most recent scan
  const latestScan = {
    id: "scan-1",
    date: "December 15, 2023",
    shortDate: "Dec 15, 2023",
    age: 26,
    primaryConcern: "Regulation",
    overallScore: 72,
    metrics: [
      { name: "Radiance", value: 44 },
      { name: "Hydration", value: 24 },
      { name: "Spots & Acne", value: 6 },
      { name: "Skin Texture", value: 0 },
      { name: "Regulation", value: 78 },
      { name: "Wrinkles", value: 27 },
      { name: "Sensitivity", value: 18 },
      { name: "Blemishes", value: 27 },
    ],
    recommendations: [
      { name: "Actif N\u00b020 - Regulation", price: 45.0 },
      { name: "Actif N\u00b022 - Radiance", price: 45.0 },
      { name: "Soothing Cleansing Foam", price: 38.0 },
    ],
    insights: {
      overview: "Your AI skin analysis evaluates eight critical concerns tailored to your age and skin type.",
      keyIssues: [
        { concern: "Sebum Regulation", score: 78, description: "High oil production that may benefit from mattifying products." },
        { concern: "Radiance", score: 44, description: "Your skin's natural glow could use enhancement with brightening actives." },
        { concern: "Hydration", score: 24, description: "Your skin needs more moisture retention for optimal health." },
      ],
    },
  }

  // Next subscription renewal
  const nextRenewal = {
    date: "Mar 15, 2024",
    daysUntil: 12,
    products: [
      { name: "Custom Formula - Aloe Vera", price: 89.0 },
      { name: "No. 1 Hydration", price: 22.0 },
    ],
    hasNewRecommendation: true,
    recommendedSwap: {
      current: "No. 1 Hydration",
      suggested: "Actif N\u00b020 - Regulation",
      reason: "Your latest scan shows Regulation (78) as your top concern, replacing Hydration focus",
    },
  }

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

  const routineProducts = {
    morning: [
      {
        product: productData.find((p) => p.slug === "exfoliating-cleansing-foam")!,
        step: 1,
        advice: "Massage gently in circular motions for 60 seconds to activate the cleansing foam",
      },
      {
        product: productData.find((p) => p.slug === "hyaluronic-acid-plumping-serum")!,
        step: 2,
        advice: "Apply 2-3 drops while skin is still damp for maximum absorption",
      },
      {
        product: productData.find((p) => p.slug === "aloe-vera-base")!,
        step: 3,
        advice: "Apply upward motions from center of face outward, including neck",
      },
    ],
    evening: [
      {
        product: productData.find((p) => p.slug === "soothing-revitalizing-oil")!,
        step: 1,
        advice: "Warm between palms and massage into dry skin to dissolve makeup and impurities",
      },
      {
        product: productData.find((p) => p.slug === "no-1-hydration")!,
        step: 2,
        advice: "Mix 2-3 drops with your evening cream for boosted hydration",
      },
      {
        product: productData.find((p) => p.slug === "aloe-vera-base")!,
        step: 3,
        advice: "Apply generously for overnight repair and regeneration",
      },
    ],
  }

  // Scan reminder state
  const scanReminderActive = nextRenewal.daysUntil <= 3

  return (
    <div className="space-y-8">
      {/* Header Card with Account Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-16 h-16 rounded-full bg-muted flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                    <span className="text-2xl font-normal font-sans">SM</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile Photo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button variant="outline" className="w-full font-mono text-xs bg-transparent">Take Selfie</Button>
                    <Button variant="outline" className="w-full font-mono text-xs bg-transparent">Upload Photo</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl font-normal tracking-tight">Sarah Miller</h1>
                  {isAmbassador && <Badge className="bg-primary text-primary-foreground text-xs">Ambassador</Badge>}
                </div>
                <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                  <span>32, Female</span>
                </div>
                {viewingAsFamilyMember && (
                  <Badge variant="secondary" className="text-xs mt-1">Viewing as {viewingAsFamilyMember}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isAmbassador && (
                <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent gap-1.5" asChild>
                  <Link href="/ambassador-dashboard">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Dashboard
                  </Link>
                </Button>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader className="px-6">
                    <SheetTitle>Edit Account Information</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6 px-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-mono text-muted-foreground">ABBI User ID</Label>
                      <div className="font-mono text-sm">#ABBI-2023-1156</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-sm font-mono">Age</Label>
                        <Input id="age" type="number" defaultValue="32" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-mono">Gender</Label>
                        <Input id="gender" defaultValue="Female" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-mono">Email Address</Label>
                      <Input id="email" type="email" defaultValue="sarah.miller@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-sm font-mono">Mobile Number</Label>
                      <Input id="mobile" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-mono">Home Address</Label>
                      <Input id="address" defaultValue="123 Main St" className="mb-2" />
                      <Input id="city" defaultValue="San Francisco" className="mb-2" />
                      <div className="grid grid-cols-2 gap-2">
                        <Input id="state" defaultValue="CA" />
                        <Input id="zip" defaultValue="94102" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-mono">Shipping Address</Label>
                      <div className="flex items-center gap-2">
                        <Checkbox id="sameAddress" checked={sameAsHome} onCheckedChange={(checked) => setSameAsHome(checked as boolean)} />
                        <Label htmlFor="sameAddress" className="text-sm cursor-pointer font-normal">Same as home address</Label>
                      </div>
                      {!sameAsHome && (
                        <div className="space-y-2 pt-2">
                          <Input placeholder="Street Address" />
                          <Input placeholder="City" />
                          <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="State" />
                            <Input placeholder="ZIP Code" />
                          </div>
                        </div>
                      )}
                    </div>
                    <Button className="w-full font-mono text-xs">Save Changes</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Reminder Alert */}
      {scanReminderActive && (
        <Card className="border-primary/30">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Your subscription renews in {nextRenewal.daysUntil} days</p>
                <p className="text-xs text-muted-foreground">Scan your skin to update your routine and product recommendations before renewal</p>
              </div>
            </div>
            <Button size="sm" className="font-mono text-xs flex-shrink-0" asChild>
              <Link href="/skin-analysis">Scan Now</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Priority Data: Skin Score, Orders, Subscriptions */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Skin Score */}
        <Link href="/account/scan-history" className="block">
          <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-sm text-muted-foreground">Skin Score</p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-muted"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                    />
                    <path
                      className="text-primary"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${latestScan.overallScore}, 100`}
                      d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-medium">{latestScan.overallScore}</span>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs mb-1">{latestScan.primaryConcern}</Badge>
                  <p className="text-xs text-muted-foreground">{latestScan.shortDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Orders */}
        <Link href="/account/orders" className="block">
          <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-sm text-muted-foreground">Orders</p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-normal">{latestOrder.orderNumber}</span>
                <Badge variant={latestOrder.statusVariant} className="text-xs">{latestOrder.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{latestOrder.date}</p>
              <p className="text-sm">{latestOrder.itemCount} items &middot; ${latestOrder.total.toFixed(2)}</p>
            </CardContent>
          </Card>
        </Link>

        {/* Subscriptions */}
        <Link href="/account/subscriptions" className="block">
          <Card className={`cursor-pointer hover:shadow-md transition-shadow h-full ${nextRenewal.hasNewRecommendation ? "border-primary/30" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <p className="text-sm text-muted-foreground">Subscriptions</p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm font-normal mb-1">Renews {nextRenewal.date}</p>
              <p className="text-xs text-muted-foreground mb-3">{nextRenewal.daysUntil} days away</p>
              <div className="flex items-center gap-1.5 mb-2">
                {nextRenewal.products.map((p, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image src="/minimalist-cosmetic-pump-bottle-cream.jpg" alt={p.name} fill className="object-cover" />
                  </div>
                ))}
                <span className="text-xs text-muted-foreground ml-1">{nextRenewal.products.length} products</span>
              </div>
              {nextRenewal.hasNewRecommendation && (
                <div className="bg-primary/5 rounded-md p-2 mt-2">
                  <p className="text-xs text-primary font-medium">New recommendation available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* My ABBI Routine */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-normal">My ABBI Routine</h2>
            <p className="text-sm text-muted-foreground">Based on your {latestScan.shortDate} scan results</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-normal">{ambassador.initials}</span>
                  </div>
                  <span className="hidden sm:inline">{ambassador.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">{ambassador.name}</p>
                  <p className="text-xs text-muted-foreground">{ambassador.title}</p>
                  <p className="text-xs text-muted-foreground">{ambassador.email}</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full text-xs bg-transparent">Contact</Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

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
                <h3 className="text-lg font-normal">Morning</h3>
              </div>
              <div className="space-y-4">
                {routineProducts.morning.map((item) => (
                  <div key={item.step} className="flex gap-3 flex-row">
                    <div className="w-14 h-14 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image src="/minimalist-cosmetic-pump-bottle-cream.jpg" alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-0.5 items-start flex-row">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">{item.step}</span>
                        <h4 className="font-normal truncate text-base">{item.product.name}</h4>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm">{item.advice}</p>
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
                <h3 className="text-lg font-normal">Evening</h3>
              </div>
              <div className="space-y-4">
                {routineProducts.evening.map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-14 h-14 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image src="/minimalist-cosmetic-pump-bottle-cream.jpg" alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">{item.step}</span>
                        <h4 className="font-normal text-sm truncate">{item.product.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Family Members */}
      <section>
        <SectionHeader
          title="Family Members"
          action={
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">Add Member</Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader className="px-6">
                  <SheetTitle>Add Family Member</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4 px-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-mono">Full Name</Label>
                    <Input id="fullName" placeholder="Enter full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="familyAge" className="text-sm font-mono">Age</Label>
                      <Input id="familyAge" type="number" placeholder="Age" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="familyGender" className="text-sm font-mono">Gender</Label>
                      <Input id="familyGender" placeholder="Gender" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="familyEmail" className="text-sm font-mono">Email Address</Label>
                    <Input id="familyEmail" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="familyMobile" className="text-sm font-mono">Mobile Number</Label>
                    <Input id="familyMobile" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <Button className="w-full font-mono text-xs">Add Family Member</Button>
                </div>
              </SheetContent>
            </Sheet>
          }
        />
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-normal">EM</span>
              </div>
              <div className="flex-1">
                <p className="font-normal">Emily Miller</p>
                <p className="text-xs text-muted-foreground">28, Female &middot; emily.m@example.com</p>
              </div>
              <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">View</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
