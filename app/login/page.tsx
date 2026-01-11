import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"

export default function LoginPage() {
  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-normal tracking-tight mb-4">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your ABBI account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button size="lg" className="w-full h-12 font-mono uppercase rounded-xs tracking-widest">
              Sign In
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
