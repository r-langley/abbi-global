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
      status: "active",
    },
    {
      id: "34520858951",
      contractId: "34520858951",
      product: "No. 1 Hydration",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 22.0,
      deliveryFrequency: "Every 45 days",
      status: "active",
    },
    {
      id: "34521284935",
      contractId: "34521284935",
      product: "Soothing Cleansing Foam",
      productImage: "/minimalist-cosmetic-pump-bottle-cream.jpg",
      price: 38.0,
      deliveryFrequency: "Every 60 days",
      status: "active",
    },
  ]

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
      orderId: "PENDING-2023-1257",
      orderNumber: "#PENDING-2023-1257",
      status: "Awaiting Payment",
      statusVariant: "outline" as const,
      items: [
        {
          name: "Daily Moisturizer",
          image: "/minimalist-cosmetic-pump-bottle-cream.jpg",
          quantity: 2,
          price: 68.0,
        },
      ],
      total: 68.0,
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

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          {/* Header Card with Account Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
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
                      <h1 className="text-2xl font-normal tracking-tight">Sarah Miller</h1>
                      {isAmbassador && <Badge className="bg-primary text-primary-foreground text-xs">Ambassador</Badge>}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                      <span>32, Female</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {viewingAsFamilyMember && (
                        <Badge variant="outline" className="text-xs gap-1.5 pl-1.5">
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
                      )}
                    </div>
                  </div>
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

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  className="h-auto py-3 font-mono text-xs bg-transparent justify-center gap-2"
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
                    New Scan
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-3 font-mono text-xs bg-transparent justify-center gap-2"
                  asChild
                >
                  <a href="#orders">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    Orders
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-3 font-mono text-xs bg-transparent justify-center gap-2"
                  asChild
                >
                  <a href="#routine">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    My Routine
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-3 font-mono text-xs bg-transparent justify-center gap-2"
                  asChild
                >
                  <Link href="/shop">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Shop
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* Skin Scan History */}
            <section>
              <SectionHeader title="Skin Scan History" />
              <div className="grid md:grid-cols-2 gap-4">
                {skinScans.map((scan) => (
                  <Sheet key={scan.id}>
                    <SheetTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm font-medium">{scan.date}</p>
                              <p className="text-xs text-muted-foreground">Age: {scan.age}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">{scan.primaryConcern}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                            {scan.metrics.slice(0, 4).map((metric) => (
                              <div key={metric.name} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{metric.name}</span>
                                <span className="font-mono">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                      <div className="space-y-6 mx-6 my-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-normal">{scan.shortDate}</h2>
                            <Badge variant="outline">{scan.primaryConcern}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Age: {scan.age}</p>
                        </div>
                        
                        {/* AI Insights */}
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-medium mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            AI Insights
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{scan.insights.overview}</p>
                          <div className="space-y-2">
                            {scan.insights.keyIssues.map((issue) => (
                              <div key={issue.concern} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-0.5">•</span>
                                <div>
                                  <span className="font-medium">{issue.concern}</span>
                                  <span className="text-muted-foreground"> ({issue.score}%) - {issue.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4">Skin Analysis Scores</h3>
                          <div className="space-y-3">
                            {scan.metrics.map((metric) => (
                              <div key={metric.name}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-sm">{metric.name}</span>
                                  <span className="text-sm font-mono">{metric.value}</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full" style={{ width: `${metric.value}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">Recommended Products</h3>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">Add All</Button>
                          </div>
                          <div className="space-y-2">
                            {scan.recommendations.map((product, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <span className="text-sm">{product.name}</span>
                                <span className="text-sm font-mono">${product.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </section>

            {/* Orders */}
            <section id="orders">
              <SectionHeader
                title="Orders"
                action={
                  <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent" asChild>
                    <Link href="/account/orders">View All</Link>
                  </Button>
                }
              />
              <div className="space-y-4">
                {allOrders.slice(0, 3).map((order) => (
                  <OrderCard key={order.orderId} {...order} />
                ))}
              </div>
            </section>

            {/* Subscriptions */}
            <section>
              <SectionHeader title="ABBI Autoship / Subscriptions" />
              <SubscriptionsTable subscriptions={subscriptions} />
            </section>

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

            {/* My ABBI Routine with Ambassador */}
            <section id="routine">
              <div className="flex items-center justify-between mb-4">
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
            </section>

            {/* Current Promotions */}
            <section>
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
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-normal">EM</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-normal">Emily Miller</p>
                      <p className="text-xs text-muted-foreground">28, Female • emily.m@example.com</p>
                    </div>
                    <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Product Catalog */}
            <section>
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
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
