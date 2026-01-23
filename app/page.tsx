"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { useEffect, useRef, useState } from "react"

const categoryCards = [
  {
    title: "Custom Creams",
    badge: "Recommended",
    price: "Starting at $89",
    href: "/shop/in-lab-creams",
    image: "/images/custom-cream-alya.jpg",
    traits: ["Hydration", "Anti-Aging", "Radiance"],
  },
  {
    title: "Mix-at-Home Creams",
    badge: "Best Seller",
    price: "Starting at $24.90",
    href: "/shop/mix-at-home",
    image: "/images/mix-at-home-set.png",
    traits: ["Customizable", "Texture", "Radiance"],
  },
  {
    title: "Simple Solutions",
    badge: "New",
    price: "Complete kits starting at $59.95",
    href: "/shop/simple-solution",
    traits: ["Complete Kit", "Targeted"],
  },
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
  const [isScanning, setIsScanning] = useState(false)
  const scanSectionRef = useRef<HTMLDivElement>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const ambassadorsRef = useRef<HTMLDivElement>(null)

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1, id: Date.now() }])
    setCartOpen(true)
    setTimeout(() => setCartOpen(false), 3000)
  }

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setIsScanning(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (scanSectionRef.current) {
      observer.observe(scanSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (ambassadorsRef.current) {
        const rect = ambassadorsRef.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const sectionTop = ambassadorsRef.current.offsetTop
        const offset = (scrolled - sectionTop) * 0.06
        setParallaxOffset(offset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <GlobalNav
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative w-full min-h-[600px] md:min-h-[700px] bg-muted overflow-hidden">
          <Image
            src="/images/hero-bottle.png"
            alt="ABBI custom skincare bottle"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="relative h-full min-h-[600px] md:min-h-[700px] flex items-center justify-end px-6 md:px-10 py-10">
            <div className="max-w-xl flex flex-col items-end text-right gap-4">
              <h1 className="text-4xl font-normal text-white tracking-tight leading-tight">Your Skin, Our Formula</h1>
              <p className="text-lg text-white/80">Discover the future of personalized care.</p>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 h-12 text-white uppercase border-white hover:bg-white/10 bg-transparent rounded-sm font-mono font-normal tracking-widest text-sm"
              >
                <Link href="/skin-analysis">Start My Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <section ref={scanSectionRef} className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="max-w-lg mx-auto md:mx-0 text-center">
                <div className="flex flex-col items-center gap-2 mb-4 text-foreground font-mono text-xs uppercase tracking-widest">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                  <span>ABBI AI IS HERE</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-foreground leading-tight mb-6 font-normal tracking-tight">
                  Personalized cosmetics based on your skin's unique needs
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  97% accurate when compared to a dermatological exam.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-8 h-12 font-mono uppercase rounded-sm bg-muted text-primary tracking-widest"
                >
                  <Link href="/skin-analysis">Analyze My Skin</Link>
                </Button>
              </div>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/face-scan.png"
                  alt="AI skin analysis scan"
                  fill
                  className="object-cover p-2 px-0 py-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className={isScanning ? "scan-line" : "scan-line-hidden"} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-foreground mb-2 tracking-tight font-normal">
                Featured Products
              </h2>
              <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                Shop all Products
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryCards.map((category) => (
                <ProductCard
                  key={category.title}
                  title={category.title}
                  price={category.price}
                  badge={category.badge}
                  href={category.href}
                  image={category.image}
                  traits={category.traits}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center tracking-tight text-primary-foreground">
              How it works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.num} className="text-center relative">
                  <div className="text-2xl mb-6 font-serif text-accent">{step.num}</div>
                  <h3 className="text-xl md:text-2xl font-normal mb-4 tracking-tight text-chart-4">{step.title}</h3>
                  <p className="text-primary-foreground">{step.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-0 right-0 h-full w-px border-r border-dotted border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ambassadors Section */}
        <section ref={ambassadorsRef} className="relative py-24 md:py-32 bg-[oklch(0.65_0.13_192)] overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-8 mb-6">
                <span className="text-white/70 font-mono text-sm uppercase tracking-widest">JOIN</span>
                <h2 className="text-4xl md:text-6xl font-normal text-white tracking-tight">OUR AMBASSADORS</h2>
                <span className="text-white/70 font-mono text-sm uppercase tracking-widest">ABBI</span>
              </div>
            </div>

            <div className="flex justify-center py-0">
              <div
                className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Image
                  src="/images/image.png"
                  alt="ABBI Ambassadors - diverse group of women"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-12">FAQ</h2>
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
      <footer className="py-12 bg-primary text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="/shop/in-lab-creams" className="hover:text-background transition-colors">
                    Custom Creams
                  </Link>
                </li>
                <li>
                  <Link href="/shop/mix-at-home" className="hover:text-background transition-colors">
                    Mix-at-Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop/simple-solution" className="hover:text-background transition-colors">
                    Simple Solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="/skin-analysis" className="hover:text-background transition-colors">
                    Skin Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/ingredients" className="hover:text-background transition-colors">
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
                  <Link href="/about" className="hover:text-background transition-colors">
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
