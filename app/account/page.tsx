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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { productData } from "@/lib/product-data"
import { SectionHeader } from "@/components/account/section-header"
import { OrderCard } from "@/components/account/order-card"
import { SubscriptionsTable, type Subscription } from "@/components/account/subscriptions-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AccountPage() {
  const [sameAsHome, setSameAsHome] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  const isAmbassador = true
  const viewingAsFamilyMember = "Emily Miller"

  const ambassador = {
    name: "Jennifer Davis",
    initials: "JD",
    title: "Skincare Specialist",
    email: "jennifer.davis@example.com",
  }

  const subscriptions: Subscription[] = [
    {
      id: "31355011399",
      contractId: "31355011399",
      product: "Aloe Vera Base",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 89.0,
      deliveryFrequency: "Every 2 weeks",
      status: "cancelled",
    },
    {
      id: "34488942919",
      contractId: "34488942919",
      product: "Hyaluronic Acid Serum",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 34.0,
      deliveryFrequency: "Every 30 days",
      status: "cancelled",
    },
    {
      id: "34489270599",
      contractId: "34489270599",
      product: "Custom Formula - Aloe Vera",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 89.0,
      deliveryFrequency: "Every 30 days",
      nextOrderDate: "Mar 15, 2024",
      status: "active",
    },
    {
      id: "34520858951",
      contractId: "34520858951",
      product: "No. 1 Hydration",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 22.0,
      deliveryFrequency: "Every 45 days",
      nextOrderDate: "Mar 28, 2024",
      status: "active",
    },
    {
      id: "34521284935",
      contractId: "34521284935",
      product: "Soothing Cleansing Foam",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 38.0,
      deliveryFrequency: "Every 60 days",
      nextOrderDate: "Apr 10, 2024",
      status: "active",
    },
  ]

  // Get next upcoming autoship
  const nextAutoship = subscriptions
    .filter((s) => s.status === "active" && s.nextOrderDate)
    .sort((a, b) => new Date(a.nextOrderDate!).getTime() - new Date(b.nextOrderDate!).getTime())[0]

  const allOrders = [
    {
      orderId: "PENDING-2023-1256",
      orderNumber: "#PENDING-2023-1256",
      status: "Awaiting Payment",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Custom Formula",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 89.0,
        },
        {
          name: "Nourishing Serum",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 52.0,
        },
      ],
      total: 141.0,
      message: "Review and confirm this order to proceed with payment",
      isHighlighted: true,
      createdBy: "Emily Miller (Ambassador)",
    },
    {
      orderId: "GC-2023-1256",
      orderNumber: "#GC-2023-1256",
      date: "December 20, 2023",
      status: "In Production",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Gentle Cleanser",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 17.89,
        },
        {
          name: "Hyaluronic Serum",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 2,
          price: 34.0,
        },
        {
          name: "Night Cream",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 45.0,
        },
        {
          name: "Vitamin C Concentrate",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 28.0,
        },
      ],
      total: 124.89,
      message: "Tracking will be available once your order ships",
      showProgress: true,
      progressPercentage: 20,
      progressStages: ["Ordered", "In Production", "Shipped", "In Transit", "Delivered"],
      currentStage: 0,
    },
    {
      orderId: "CF-2023-1245",
      orderNumber: "#CF-2023-1245",
      date: "December 18, 2023",
      status: "Shipped",
      statusVariant: "default" as const,
      items: [
        {
          name: "Custom Formula",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 1,
          price: 89.0,
        },
      ],
      total: 89.0,
      message: "Your order is on the way",
      showProgress: true,
      progressPercentage: 60,
      progressStages: ["Ordered", "In Production", "Shipped", "In Transit", "Delivered"],
      currentStage: 2,
    },
  ]

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

  const skinScans = [
    {
      id: "scan-1",
      date: "December 15, 2023",
      shortDate: "Dec 15, 2023",
      age: 26,
      primaryConcern: "Regulation",
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
        { name: "Actif N°20 - Regulation", price: 45.0 },
        { name: "Actif N°22 - Radiance", price: 45.0 },
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
    },
    {
      id: "scan-2",
      date: "September 10, 2023",
      shortDate: "Sep 10, 2023",
      age: 26,
      primaryConcern: "Hydration",
      metrics: [
        { name: "Radiance", value: 52 },
        { name: "Hydration", value: 58 },
        { name: "Spots & Acne", value: 8 },
        { name: "Skin Texture", value: 2 },
        { name: "Regulation", value: 72 },
        { name: "Wrinkles", value: 30 },
        { name: "Sensitivity", value: 22 },
        { name: "Blemishes", value: 24 },
      ],
      recommendations: [
        { name: "Hydration Boost Serum", price: 52.0 },
        { name: "Gentle Moisturizer", price: 38.0 },
      ],
      insights: {
        overview: "This scan shows moderate hydration levels with room for improvement in moisture retention.",
        keyIssues: [
          { concern: "Hydration", score: 58, description: "Good hydration but could benefit from deeper moisture." },
          { concern: "Regulation", score: 72, description: "Some oil control needed in the T-zone area." },
          { concern: "Wrinkles", score: 30, description: "Early signs of fine lines - preventive care recommended." },
        ],
      },
    },
  ]

  const mostRecentScan = skinScans[0]

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent p-0 h-auto gap-1">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-full text-sm"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-full text-sm"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="subscriptions"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-full text-sm"
              >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger
                value="routine"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-full text-sm"
              >
                Routine
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-full text-sm"
              >
                Rewards
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="mt-0 space-y-6">
              {/* Enhanced Header Card */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Top branded banner */}
                  <div className="bg-primary/5 border-b px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span className="text-muted-foreground">Welcome back,</span>
                      <span className="font-medium">Sarah</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAmbassador && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-primary hover:bg-primary/90 font-mono text-xs gap-1.5"
                          asChild
                        >
                          <Link href="/ambassador-dashboard" target="_blank">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Dashboard
                          </Link>
                        </Button>
                      )}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
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
                              <Label className="text-sm font-mono text-muted-foreground">
                                ABBI User ID
                              </Label>
                              <div className="font-mono text-sm">#ABBI-2023-1156</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm font-mono">
                                  Age
                                </Label>
                                <Input id="age" type="number" defaultValue="32" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="gender" className="text-sm font-mono">
                                  Gender
                                </Label>
                                <Input id="gender" defaultValue="Female" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-sm font-mono">
                                Email Address
                              </Label>
                              <Input id="email" type="email" defaultValue="sarah.miller@example.com" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="mobile" className="text-sm font-mono">
                                Mobile Number
                              </Label>
                              <Input id="mobile" type="tel" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-sm font-mono">
                                Home Address
                              </Label>
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
                                <Checkbox
                                  id="sameAddress"
                                  checked={sameAsHome}
                                  onCheckedChange={(checked) => setSameAsHome(checked as boolean)}
                                />
                                <Label htmlFor="sameAddress" className="text-sm cursor-pointer font-normal">
                                  Same as home address
                                </Label>
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

                  <div className="p-6">
                    {/* User Info Row */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                              <span className="text-xl font-normal font-sans">SM</span>
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
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h1 className="text-xl font-normal tracking-tight">Sarah Miller</h1>
                            {isAmbassador && <Badge className="bg-primary text-primary-foreground text-xs">Ambassador</Badge>}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                            <span>32, Female</span>
                            {viewingAsFamilyMember && (
                              <>
                                <span className="text-border">•</span>
                                <Badge variant="outline" className="text-xs gap-1 pl-1.5 font-normal">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  {viewingAsFamilyMember}'s family
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Scan History Card */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <div className="bg-muted/50 rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Scan History</span>
                              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{mostRecentScan.shortDate}</p>
                                <p className="text-xs text-muted-foreground">{mostRecentScan.primaryConcern} focus</p>
                              </div>
                            </div>
                            {/* Mini metrics preview */}
                            <div className="mt-3 flex gap-2">
                              {mostRecentScan.metrics.slice(0, 3).map((metric) => (
                                <div key={metric.name} className="flex-1 text-center">
                                  <div className="text-xs font-mono">{metric.value}</div>
                                  <div className="text-[10px] text-muted-foreground truncate">{metric.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                          <SheetHeader className="px-6">
                            <SheetTitle>Scan History</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-4 px-6">
                            {skinScans.map((scan) => (
                              <Card key={scan.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <p className="text-sm font-medium">{scan.date}</p>
                                      <p className="text-xs text-muted-foreground">Age: {scan.age}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">{scan.primaryConcern}</Badge>
                                  </div>
                                  <div className="grid grid-cols-4 gap-2">
                                    {scan.metrics.slice(0, 4).map((metric) => (
                                      <div key={metric.name} className="text-center">
                                        <div className="text-sm font-mono">{metric.value}</div>
                                        <div className="text-[10px] text-muted-foreground">{metric.name}</div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button className="w-full font-mono text-xs" asChild>
                              <Link href="/skin-analysis">New Scan</Link>
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* Autoship Card */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Next Autoship</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setActiveTab("subscriptions")}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                        </div>
                        {nextAutoship ? (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted relative overflow-hidden flex-shrink-0">
                                <Image
                                  src={nextAutoship.productImage}
                                  alt={nextAutoship.product}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{nextAutoship.product}</p>
                                <p className="text-xs text-muted-foreground">{nextAutoship.nextOrderDate}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{nextAutoship.deliveryFrequency}</span>
                              <span className="font-mono">${nextAutoship.price.toFixed(2)}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-sm text-muted-foreground mb-2">No active subscriptions</p>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
                              <Link href="/shop">Explore Products</Link>
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Most Recent Order Card */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Latest Order</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setActiveTab("orders")}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                        </div>
                        {allOrders[0] && (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted relative overflow-hidden flex-shrink-0">
                                <Image
                                  src={allOrders[0].items[0].image}
                                  alt={allOrders[0].items[0].name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{allOrders[0].orderNumber}</p>
                                <Badge variant={allOrders[0].statusVariant} className="text-[10px] h-5 mt-0.5">
                                  {allOrders[0].status}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{allOrders[0].items.length} item{allOrders[0].items.length > 1 ? "s" : ""}</span>
                              <span className="font-mono">${allOrders[0].total.toFixed(2)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My ABBI Routine Preview */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-normal">My Routine</h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-normal">{ambassador.initials}</span>
                              </div>
                              <span className="hidden sm:inline">{ambassador.name}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            <div className="space-y-1">
                              <p className="font-medium">{ambassador.name}</p>
                              <p className="text-xs text-muted-foreground">{ambassador.title}</p>
                              <p className="text-xs text-muted-foreground">{ambassador.email}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => setActiveTab("routine")}>
                      View Full Routine
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Morning</p>
                        <p className="text-xs text-muted-foreground">{routineProducts.morning.length} steps</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Evening</p>
                        <p className="text-xs text-muted-foreground">{routineProducts.evening.length} steps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Favorites */}
              <section>
                <SectionHeader title="My Favorite Products" />
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

              {/* Family Members */}
              <section>
                <SectionHeader
                  title="Family Members"
                  action={
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                          Add Member
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                        <SheetHeader className="px-6">
                          <SheetTitle>Add Family Member</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-4 px-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-mono">
                              Full Name
                            </Label>
                            <Input id="fullName" placeholder="Enter full name" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="familyAge" className="text-sm font-mono">
                                Age
                              </Label>
                              <Input id="familyAge" type="number" placeholder="Age" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="familyGender" className="text-sm font-mono">
                                Gender
                              </Label>
                              <Input id="familyGender" placeholder="Gender" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="familyEmail" className="text-sm font-mono">
                              Email Address
                            </Label>
                            <Input id="familyEmail" type="email" placeholder="email@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="familyMobile" className="text-sm font-mono">
                              Mobile Number
                            </Label>
                            <Input id="familyMobile" type="tel" placeholder="+1 (555) 000-0000" />
                          </div>
                          <Button className="w-full font-mono text-xs">Add Family Member</Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  }
                />
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-normal">EM</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-normal text-sm">Emily Miller</p>
                        <p className="text-xs text-muted-foreground">28, Female</p>
                      </div>
                      <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-0 space-y-6">
              <SectionHeader
                title="Order History"
                action={
                  <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent" asChild>
                    <Link href="/account/orders">View All</Link>
                  </Button>
                }
              />
              <div className="space-y-4">
                {allOrders.map((order) => (
                  <OrderCard key={order.orderId} {...order} />
                ))}
              </div>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions" className="mt-0 space-y-6">
              <SectionHeader title="ABBI Autoship / Subscriptions" />
              <SubscriptionsTable subscriptions={subscriptions} />
            </TabsContent>

            {/* Routine Tab */}
            <TabsContent value="routine" className="mt-0 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-normal">My ABBI Routine</h2>
                  <p className="text-sm text-muted-foreground">Your personalized skincare prescription</p>
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
                        <Button size="sm" variant="outline" className="mt-2 w-full text-xs bg-transparent">
                          Contact
                        </Button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                {/* Morning Routine */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <h3 className="text-lg font-normal">Morning</h3>
                    </div>
                    <div className="space-y-4">
                      {routineProducts.morning.map((item) => (
                        <div key={item.step} className="flex gap-3 flex-row">
                          <div className="w-14 h-14 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex gap-2 mb-0.5 items-start flex-row">
                              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                                {item.step}
                              </span>
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
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <h3 className="text-lg font-normal">Evening</h3>
                    </div>
                    <div className="space-y-4">
                      {routineProducts.evening.map((item) => (
                        <div key={item.step} className="flex gap-3">
                          <div className="w-14 h-14 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                                {item.step}
                              </span>
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
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="mt-0 space-y-6">
              <SectionHeader title="Current Promotions" />
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <Badge className="mb-3">Active</Badge>
                    <h3 className="text-lg font-normal mb-1">10% Off Your Next Custom Formula</h3>
                    <p className="text-xs text-muted-foreground mb-3">Expires January 31, 2024</p>
                    <div className="bg-muted p-3 rounded font-mono text-center tracking-widest">CUSTOM10</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-3">Upcoming</Badge>
                    <h3 className="text-lg font-normal mb-1">Free Shipping on Orders Over $50</h3>
                    <p className="text-xs text-muted-foreground">Valid February 1-14, 2024</p>
                  </CardContent>
                </Card>
              </div>

              {/* Product Catalog */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-normal mb-2">ABBI Product Catalog 2024</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our complete collection of personalized skincare solutions
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button className="font-mono text-xs">View Catalog</Button>
                    <Button variant="outline" className="font-mono text-xs bg-transparent">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
