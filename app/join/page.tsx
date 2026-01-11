import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"

export default function JoinPage() {
  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-normal tracking-tight mb-8">Join ABBI</h1>

          <div className="space-y-6 text-lg text-muted-foreground mb-12">
            <p>Become part of the ABBI community and help others discover personalized skincare solutions.</p>
            <p>
              Our ambassador program offers exclusive benefits, early access to new products, and opportunities to share
              your skincare journey with others.
            </p>
          </div>

          <div className="space-y-4">
            <Button size="lg" className="w-full md:w-auto px-8 h-12 font-mono uppercase rounded-xs tracking-widest">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
