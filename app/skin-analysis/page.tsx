import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"

export default function SkinAnalysisPage() {
  return (
    <>
      <GlobalNav />

      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <div className="max-w-2xl text-center space-y-6">
          <div className="flex justify-center mb-8">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-normal tracking-tight">AI Skin Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Get personalized skincare recommendations based on your skin's unique needs. Our AI technology provides 97%
            accuracy compared to a dermatological exam.
          </p>
          <div className="pt-6">
            <Button size="lg" className="px-8 h-12 font-mono uppercase rounded-xs tracking-widest">
              Start Analysis
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
