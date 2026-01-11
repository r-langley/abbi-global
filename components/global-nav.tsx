"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { categories } from "@/lib/product-data"

export function GlobalNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [bagMenuOpen, setBagMenuOpen] = useState(false)

  const isLoggedIn = true
  const userName = "Sarah"
  const cartItemCount = 0

  return (
    <>
      <div className="bg-primary text-white text-center py-2 px-4">
        <p className="text-xs font-mono tracking-wide font-medium">ENJOY 10% OFF YOUR FIRST ORDER</p>
      </div>

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
                  <nav className="flex flex-col gap-4 mx-4 my-8">
                    <Link
                      href="/skin-analysis"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Skin Analysis
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
                    <div className="border-t border-border my-2" />
                    <Link
                      href="/ingredients"
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Ingredients
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              <nav className="hidden md:flex items-center gap-6 text-sm font-light font-mono">
                <Link href="/skin-analysis" className="hover:text-primary transition-colors font-normal">
                  Science
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <Link href="/shop" className="hover:text-primary transition-colors font-normal">
                    Shop
                  </Link>
                  {megaMenuOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-background border border-border rounded-lg shadow-lg p-6 w-64">
                        <div className="flex flex-col gap-3">
                          {categories.map((category) => (
                            <Link key={category.slug} href={`/shop/${category.slug}`} className="group">
                              <div className="font-mono text-sm hover:text-primary transition-colors">
                                {category.name}
                              </div>
                              <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-0.5">
                                {category.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/about" className="hover:text-primary transition-colors font-normal">
                  About
                </Link>
                <Link href="/join" className="hover:text-primary transition-colors font-normal">
                  Join
                </Link>
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="block">
                <Image src="/images/abbi-logo.png" alt="ABBI" width={80} height={32} className="w-auto h-8" />
              </Link>
            </div>

            {/* Right: Cart + Account */}
            <div className="flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => isLoggedIn && cartItemCount === 0 && setBagMenuOpen(true)}
                onMouseLeave={() => setBagMenuOpen(false)}
              >
                <Link href="/cart">
                  <Button variant="ghost" className="rounded-lg relative gap-2 px-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="text-sm font-mono font-normal">Bag</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {bagMenuOpen && isLoggedIn && cartItemCount === 0 && (
                  <div className="absolute top-full right-0 pt-2">
                    <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-48">
                      <Link
                        href="/shop"
                        className="block text-sm font-mono hover:text-primary transition-colors"
                        onClick={() => setBagMenuOpen(false)}
                      >
                        Shop for Someone Else
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href={isLoggedIn ? "/account" : "/login"}>
                <Button variant="ghost" className="rounded-lg gap-2 px-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-mono font-normal">{isLoggedIn ? userName : "Account"}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
