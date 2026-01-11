import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"

export default function CartPage() {
  const cartEmpty = true
  const isLoggedIn = true

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-normal tracking-tight mb-8">Shopping Cart</h1>

          {cartEmpty ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-8">Your cart is empty.</p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild className="px-8 h-12 font-mono uppercase rounded-xs tracking-widest">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
                {isLoggedIn && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="px-8 h-12 font-mono uppercase rounded-xs tracking-widest bg-transparent"
                  >
                    <Link href="/shop">Shop for Someone Else</Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground">Cart items will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
