"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  { title: "Custom Creams", badge: "Recommended", price: "Starting at $89", cta: "CREATE MY ROUTINE" },
  { title: "Mix-at-Home Creams", badge: "Best Seller", price: "Starting at $49", cta: "PICK YOUR BASE" },
  { title: "Simple Solutions", badge: "New", price: "Complete kits starting at $119", cta: "SHOP BY TRAIT" },
]

const steps = [
  { num: "I", title: "Scan your skin", desc: "Take a quick selfie for AI analysis" },
  { num: "II", title: "Create your routine", desc: "Get personalized product recommendations" },
  { num: "III", title: "See the results", desc: "Track your skin's transformation" },
]

const faqs = [
  "How to use ABBI products?",
  "What is the difference between INLAB and ABBI FreshActive care?",
  "What is the shelf life of ABBI products?",
  "Are ABBI skincare products suitable for all skin types?",
  "What is ABBI Fresh Active cosmetic?",
  "What is the reliability rate of the ABBI online skin analysis?",
  "How many drops should I use for my ABBI treatments?",
  "Can I mix all ABBI FreshActiv actives together?",
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartItemCount = 0

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Hamburger + Desktop Nav */}
            <div className="flex items-center gap-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-80">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse site navigation</SheetDescription>
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/science"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Science
                    </Link>
                    <Link
                      href="/shop"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link
                      href="/about"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/join"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Join
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              <nav className="hidden md:flex items-center gap-6 text-sm font-light font-mono">
                <Link href="/science" className="hover:text-primary transition-colors">
                  Science
                </Link>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Shop
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/join" className="hover:text-primary transition-colors">
                  Join
                </Link>
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="text-xl font-semibold tracking-tight">
                ABBI
              </Link>
            </div>

            {/* Right: Cart + Account */}
            <div className="flex items-center gap-1">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="rounded-lg relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Log In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:min-h-[700px] w-full bg-muted overflow-hidden">
          <Image
            src="/images/image.png"
            alt="Diverse group of women representing ABBI community"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="relative h-full min-h-[600px] md:min-h-[700px] flex items-center justify-end px-6 md:px-10 py-10">
            <div className="max-w-xl flex flex-col items-end text-right gap-4">
              <h1 className="text-4xl font-normal text-white tracking-tight leading-tight md:text-4xl">
                Your Skin, Our Formula
              </h1>
              <p className="text-white/80 text-base">Discover the future of personalized care.</p>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 h-12 text-white uppercase border-white hover:bg-white/10 bg-transparent rounded-xs font-mono font-normal tracking-widest text-sm"
              >
                <Link href="#">Start My Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="max-w-lg mx-auto md:mx-0 text-center">
                <div className="flex flex-col items-center gap-2 mb-4 text-foreground font-mono text-xs uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                  <span>ABBI AI IS HERE</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-foreground leading-tight mb-6 font-normal tracking-tight">
                  Personalized cosmetics based on your skin's unique needs
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  97% accurate when compared to a dermatological exam.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-8 h-12 font-mono uppercase rounded-xs bg-muted text-primary tracking-widest"
                >
                  <Link href="#">Analyze My Skin</Link>
                </Button>
              </div>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/woman-face-skin-analysis-ai-scan.jpg"
                  alt="Personalized skin analysis result"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Scanning Animation Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="scan-line" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-foreground mb-2 tracking-tight text-2xl md:text-3xl font-normal">
                Featured Products
              </h2>
              <p className="text-muted-foreground">Shop all Products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.title}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[3/4] bg-muted">
                    <Badge className="absolute top-4 left-4 z-10 text-background border-0 rounded-xs bg-primary">
                      {product.badge}
                    </Badge>
                    <Image
                      src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col px-4 py-4 gap-0">
                    <h3 className="text-xl md:text-2xl font-normal text-foreground mb-2 tracking-tight">
                      {product.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">{product.price}</p>
                    <Button
                      asChild
                      variant="link"
                      className="justify-start px-0 font-mono uppercase tracking-widest text-sm"
                    >
                      <Link href="#">{product.cta}</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-normal text-foreground mb-12 text-center tracking-tight">
              How it works
            </h2>

            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-16">
              <Image
                src="/abstract-botanical-watercolor-yellow-illustration.jpg"
                alt="Abstract botanical watercolor illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.num} className="text-center relative">
                  <div className="text-primary text-2xl mb-6 font-serif">{step.num}</div>
                  <h3 className="text-xl md:text-2xl font-normal text-foreground mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-0 right-0 h-full w-px border-r border-dotted border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="text-2xl md:text-4xl font-medium text-foreground mb-12">FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-muted-foreground hover:text-primary py-6 text-left">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    Our products are designed to be used daily. For specific application instructions, please refer to
                    the individual product packaging or our detailed usage guide on the product page.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-background py-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Custom Creams
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Mix-at-Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Simple Solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Skin Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Ingredients
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Shipping
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-background transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70">© 2025 ABBI. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-background/70">
              <Link href="#" className="hover:text-background transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
