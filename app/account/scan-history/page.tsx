"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SectionHeader } from "@/components/account/section-header"
import { mockSkinScans } from "@/lib/account-data"

export default function ScanHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          My Abbi
        </Link>
        <SectionHeader
          title="Scan History"
          action={
            <Button size="sm" className="font-mono text-xs" asChild>
              <Link href="/skin-analysis">New Scan</Link>
            </Button>
          }
        />
      </div>

      <div className="space-y-4">
        {mockSkinScans.map((scan) => (
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5">
                    {scan.metrics.map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{metric.name}</span>
                        <span className="font-mono">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      {scan.recommendations.length} product recommendations
                    </p>
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
    </div>
  )
}
