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

export default function AccountPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hello! I'm your ABBI AI assistant. How can I help with your skincare today?" },
  ])
  const [sameAsHome, setSameAsHome] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [familyMemberView, setFamilyMemberView] = useState<string | null>(null)

  const isAmbassador = true
  const viewingAsFamilyMember = "Emily Miller"

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

  const getTrackingProgress = (status: string) => {
    const stages = ["Ordered", "In Production", "Shipped", "In Transit", "Delivered"]
    const currentIndex = stages.indexOf(status)
    return { stages, currentIndex, percentage: ((currentIndex + 1) / stages.length) * 100 }
  }

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex gap-6 flex-wrap items-center flex-row justify-center">
                <div className="flex items-center gap-4 flex-col">
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
                    <div className="flex gap-2 flex-col mb-0 text-center items-center">
                      <h1 className="text-3xl font-normal tracking-tight">Sarah Miller</h1>
                      <div className="flex gap-2 flex-wrap items-center">
                        {isAmbassador && <Badge className="bg-primary text-primary-foreground">Ambassador</Badge>}
                        <Badge variant="outline" className="font-mono text-xs">
                          #ABBI-2023-1156
                        </Badge>
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
                            {viewingAsFamilyMember}'s family member
                          </Badge>
                        )}
                      </div>
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
                        Ambassador Dashboard
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal">Account Information</h2>
                <Sheet open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                      Edit Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="px-6">
                      <SheetTitle>Edit Account Information</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 px-6">
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
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Age</span>
                      <span className="text-sm">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gender</span>
                      <span className="text-sm">Female</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm">sarah.miller@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Mobile</span>
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Home Address</p>
                      <p className="text-sm">
                        123 Main St
                        <br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                      <p className="text-sm">Same as home address</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-normal mb-6">My Ambassador</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-normal">JD</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-normal text-lg mb-1">Jennifer Davis</p>
                      <p className="text-sm text-muted-foreground mb-2">Skincare Specialist</p>
                      <p className="text-sm text-muted-foreground">jennifer.davis@example.com</p>
                    </div>
                    <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Skin Scan History */}
            <section>
              <h2 className="text-2xl font-normal mb-6">Skin Scan History</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-medium">December 15, 2023</p>
                          <Badge variant="outline" className="text-xs">Regulation</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Regulation</span>
                            <span className="font-mono">78</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Hydration</span>
                            <span className="font-mono">62</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Radiance</span>
                            <span className="font-mono">55</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                    <div className="space-y-6 mx-6 my-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-normal">Dec 15, 2023</h2>
                          <Badge variant="outline">Regulation</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Age: 26</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Skin Analysis Scores</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Radiance</span>
                              <span className="text-sm font-mono">44</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "44%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Hydration</span>
                              <span className="text-sm font-mono">24</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "24%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Spots & Acne</span>
                              <span className="text-sm font-mono">6</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "6%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Skin Texture</span>
                              <span className="text-sm font-mono">0</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "0%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Regulation</span>
                              <span className="text-sm font-mono">78</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "78%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Wrinkles</span>
                              <span className="text-sm font-mono">27</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "27%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Sensitivity</span>
                              <span className="text-sm font-mono">18</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "18%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Blemishes</span>
                              <span className="text-sm font-mono">27</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "27%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Recommended Products</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Actif N°20 - Regulation</span>
                            <span className="text-sm font-mono">$45.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Actif N°22 - Radiance</span>
                            <span className="text-sm font-mono">$45.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Soothing Cleansing Foam</span>
                            <span className="text-sm font-mono">$38.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-medium">September 10, 2023</p>
                          <Badge variant="outline" className="text-xs">Hydration</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Firmness</span>
                            <span className="font-mono">75</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Hydration</span>
                            <span className="font-mono">58</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Radiance</span>
                            <span className="font-mono">52</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-normal">Sep 10, 2023</h2>
                          <Badge variant="outline">Hydration</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Age: 26</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Skin Analysis Scores</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Radiance</span>
                              <span className="text-sm font-mono">52</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "52%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Hydration</span>
                              <span className="text-sm font-mono">58</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "58%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Spots & Acne</span>
                              <span className="text-sm font-mono">8</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "8%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Skin Texture</span>
                              <span className="text-sm font-mono">2</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "2%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Regulation</span>
                              <span className="text-sm font-mono">72</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "72%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Wrinkles</span>
                              <span className="text-sm font-mono">30</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "30%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Sensitivity</span>
                              <span className="text-sm font-mono">22</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "22%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Blemishes</span>
                              <span className="text-sm font-mono">24</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: "24%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Recommended Products</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Hydration Boost Serum</span>
                            <span className="text-sm font-mono">$52.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Gentle Moisturizer</span>
                            <span className="text-sm font-mono">$38.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        
                        <p className="text-sm font-medium mb-4">June 5, 2023</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Hydration</span>
                            <span className="font-mono">54%</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Firmness</span>
                            <span className="font-mono">73%</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Radiance</span>
                            <span className="font-mono">48%</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline" className="text-xs">Dryness</Badge>
                            <Badge variant="outline" className="text-xs">Dullness</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Scan Details - June 5, 2023</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Skin Analysis</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Hydration Level</span>
                              <span className="text-sm font-mono">54%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "54%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Firmness</span>
                              <span className="text-sm font-mono">73%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "73%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Radiance</span>
                              <span className="text-sm font-mono">48%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "48%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-3">Identified Concerns</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Dryness</Badge>
                          <Badge variant="outline">Dullness</Badge>
                          <Badge variant="outline">Uneven Texture</Badge>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </section>

            {/* Awaiting Confirmation */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal">Awaiting Confirmation</h2>
                <Badge variant="outline" className="font-mono text-xs">2 Awaiting</Badge>
              </div>
              <div className="space-y-8">
                <Link href="/account/orders/PENDING-2023-1258" className="block">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-primary/30">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-2xl font-normal">#PENDING-2023-1258</p>
                            <p className="text-sm text-muted-foreground">Created by Emily Miller (Ambassador)</p>
                          </div>
                          <Badge variant="outline" className="text-muted-foreground">Awaiting Payment</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Review and confirm this order to proceed with payment
                        </p>
                      </div>
                      <div className="space-y-3">
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
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-normal mb-1">Custom Formula</p>
                                <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                              </div>
                              <span className="text-sm font-medium">$89.00</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Nourishing Serum"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-normal mb-1">Nourishing Serum</p>
                                <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                              </div>
                              <span className="text-sm font-medium">$52.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total (2 items)</span>
                        <span className="text-lg font-medium">$141.00</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/account/orders/PENDING-2023-1257" className="block">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-primary/30">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-2xl font-normal">#PENDING-2023-1257</p>
                            <p className="text-sm text-muted-foreground">Created by Emily Miller (Ambassador)</p>
                          </div>
                          <Badge variant="outline" className="text-muted-foreground">Awaiting Payment</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Review and confirm this order to proceed with payment
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                            <Image
                              src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                              alt="Daily Moisturizer"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-normal mb-1">Daily Moisturizer</p>
                                <p className="text-xs text-muted-foreground font-mono">Qty: 2</p>
                              </div>
                              <span className="text-sm font-medium">$68.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total (2 items)</span>
                        <span className="text-lg font-medium">$68.00</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>

            {/* Orders & Subscriptions */}
            <section>
              <h2 className="text-2xl font-normal mb-6">Active Orders</h2>
              <div className="space-y-8">
                <Link href="/account/orders/GC-2023-1256" className="block">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-2xl font-normal">#GC-2023-1256</p>
                            <p className="text-sm text-muted-foreground">December 20, 2023</p>
                          </div>
                        </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Tracking will be available once your order ships
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium">Ordered</span>
                              <span className="text-muted-foreground">In Production</span>
                              <span className="text-muted-foreground">Shipped</span>
                              <span className="text-muted-foreground">In Transit</span>
                              <span className="text-muted-foreground">Delivered</span>
                            </div>
                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="absolute h-full bg-primary transition-all duration-300"
                                style={{ width: "20%" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
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
                                  <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                                </div>
                                <span className="text-sm font-medium">$17.89</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt="Hyaluronic Serum"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-normal mb-1">Hyaluronic Serum</p>
                                  <p className="text-xs text-muted-foreground font-mono">Qty: 2</p>
                                </div>
                                <span className="text-sm font-medium">$34.00</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt="Night Cream"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-normal mb-1">Night Cream</p>
                                  <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                                </div>
                                <span className="text-sm font-medium">$45.00</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt="Vitamin C Concentrate"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-normal mb-1">Vitamin C Concentrate</p>
                                  <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                                </div>
                                <span className="text-sm font-medium">$28.00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total (4 items)</span>
                          <span className="text-lg font-medium">$124.89</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                <Link href="/account/orders/CF-2023-1245" className="block">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-2xl font-normal">#CF-2023-1245</p>
                            <p className="text-sm text-muted-foreground">December 18, 2023</p>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">Shipped</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Your order is on the way</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Ordered</span>
                            <span className="text-muted-foreground">In Production</span>
                            <span className="font-medium">Shipped</span>
                            <span className="text-muted-foreground">In Transit</span>
                            <span className="text-muted-foreground">Delivered</span>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-primary transition-all duration-300"
                              style={{ width: "60%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
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
                                <p className="text-xs text-muted-foreground font-mono">Qty: 1</p>
                              </div>
                              <span className="text-sm font-medium">$89.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total (1 item)</span>
                        <span className="text-lg font-medium">$89.00</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow bg-primary/5 border-primary/20">
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
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-normal">Hyaluronic Acid Serum</p>
                                  <Badge className="bg-primary text-primary-foreground h-5 px-2 text-xs">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                                      <path d="M21 3v5h-5" />
                                    </svg>
                                    Subscription
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Delivered every 60 days</p>
                              </div>
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

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal">Family Members</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                      Add Family Member
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
              </div>
              <div className="space-y-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-lg font-normal">EM</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-normal mb-1">Emily Miller</p>
                            <p className="text-sm text-muted-foreground">Daughter • Age 16</p>
                          </div>
                          <svg
                            className="w-5 h-5 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="px-6">
                      <SheetTitle>Emily Miller's Profile</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 px-6">
                      <Card>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Age</span>
                            <span className="text-sm">16</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Gender</span>
                            <span className="text-sm">Female</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email</span>
                            <span className="text-sm">emily.miller@example.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Mobile</span>
                            <span className="text-sm">+1 (555) 987-6543</span>
                          </div>
                        </CardContent>
                      </Card>
                      <div>
                        <h3 className="font-normal mb-4">Scan History</h3>
                        <div className="space-y-3">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm">November 28, 2023</span>
                                <Badge variant="outline">Latest</Badge>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-normal">7.5</span>
                                <span className="text-muted-foreground">/ 10</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-normal mb-4">Products</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                              <Image
                                src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                alt="Teen Gentle Cleanser"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-normal mb-1">Teen Gentle Cleanser</p>
                              <div className="flex gap-1 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  Sensitivity
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Acne
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Card>
                  <CardContent className="p-6 text-center">
                    <svg
                      className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      Add family members to manage their skincare routines
                    </p>
                  </CardContent>
                </Card>
              </div>
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
