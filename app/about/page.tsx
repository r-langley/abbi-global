import { GlobalNav } from "@/components/global-nav"

export default function AboutPage() {
  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-normal tracking-tight mb-8">About ABBI</h1>

          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              ABBI is pioneering the future of personalized skincare through advanced AI technology and scientific
              innovation.
            </p>
            <p>
              Our mission is to make professional-grade, customized skincare accessible to everyone by combining
              cutting-edge artificial intelligence with dermatological expertise.
            </p>
            <p>
              With 97% accuracy compared to traditional dermatological exams, our AI-powered skin analysis delivers
              personalized product recommendations that address your unique skin concerns.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
