"use client"

import Link from "next/link"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SectionHeader } from "@/components/account/section-header"
import { mockSkinScans } from "@/lib/account-data"
import { cn } from "@/lib/utils"

export default function ScanHistoryPage() {
  // Calculate trends by comparing consecutive scans
  const calculateTrend = (currentValue: number, previousValue?: number) => {
    if (!previousValue) return null
    const diff = currentValue - previousValue
    if (Math.abs(diff) < 3) return 'stable'
    return diff > 0 ? 'up' : 'down'
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Scan History"
        description="Track your skin health journey over time"
        action={
          <Button size="sm" className="font-mono text-xs" asChild>
            <Link href="/skin-analysis">New Scan</Link>
          </Button>
        }
      />
      </div>

      <div className="space-y-4">
        {mockSkinScans.map((scan, scanIndex) => {
          const previousScan = mockSkinScans[scanIndex + 1]
          
          return (
            <Sheet key={scan.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-base font-medium mb-1">{scan.date}</p>
                        <p className="text-xs text-muted-foreground">Age: {scan.age}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{scan.primaryConcern}</Badge>
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-muted"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                            />
                            <path
                              className="text-primary"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              fill="none"
                              strokeDasharray={`${scan.metrics.reduce((acc, m) => acc + m.value, 0) / scan.metrics.length}, 100`}
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {Math.round(scan.metrics.reduce((acc, m) => acc + m.value, 0) / scan.metrics.length)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {scan.metrics.slice(0, 4).map((metric, idx) => {
                        const prevMetric = previousScan?.metrics.find(m => m.name === metric.name)
                        const trend = calculateTrend(metric.value, prevMetric?.value)
                        
                        return (
                          <div key={metric.name} className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground truncate">{metric.name}</span>
                              {trend && (
                                <span className={cn(
                                  "flex-shrink-0",
                                  trend === 'up' && "text-green-600 dark:text-green-400",
                                  trend === 'down' && "text-red-600 dark:text-red-400",
                                  trend === 'stable' && "text-muted-foreground"
                                )}>
                                  {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                                  {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                                  {trend === 'stable' && <Minus className="w-3 h-3" />}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    metric.value >= 70 ? "bg-green-500" :
                                    metric.value >= 40 ? "bg-yellow-500" :
                                    "bg-red-500"
                                  )}
                                  style={{ width: `${metric.value}%` }} 
                                />
                              </div>
                              <span className="text-xs font-mono font-medium w-7 text-right">{metric.value}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {scan.recommendations.length} product recommendations
                      </p>
                      <span className="text-xs text-primary font-medium">View Details →</span>
                    </div>
                  </CardContent>
                </Card>
              </SheetTrigger>
              
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                <div className="space-y-6 py-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-normal">{scan.shortDate}</h2>
                      <Badge variant="outline">{scan.primaryConcern}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Age: {scan.age}</p>
                  </div>

                  {/* Overall Score Circle */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Overall Skin Health</p>
                          <p className="text-3xl font-normal">
                            {Math.round(scan.metrics.reduce((acc, m) => acc + m.value, 0) / scan.metrics.length)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Average across all factors</p>
                        </div>
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-muted"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              fill="none"
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                            />
                            <path
                              className="text-primary"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              fill="none"
                              strokeDasharray={`${scan.metrics.reduce((acc, m) => acc + m.value, 0) / scan.metrics.length}, 100`}
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-lg font-medium">
                            {Math.round(scan.metrics.reduce((acc, m) => acc + m.value, 0) / scan.metrics.length)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Metrics */}
                  <div>
                    <h3 className="font-medium mb-4">Skin Analysis Details</h3>
                    <div className="grid gap-4">
                      {scan.metrics.map((metric) => {
                        const prevMetric = previousScan?.metrics.find(m => m.name === metric.name)
                        const trend = calculateTrend(metric.value, prevMetric?.value)
                        const trendValue = prevMetric ? metric.value - prevMetric.value : 0
                        
                        return (
                          <Card key={metric.name}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium">{metric.name}</span>
                                    {trend && (
                                      <div className={cn(
                                        "flex items-center gap-1 text-xs",
                                        trend === 'up' && "text-green-600 dark:text-green-400",
                                        trend === 'down' && "text-red-600 dark:text-red-400",
                                        trend === 'stable' && "text-muted-foreground"
                                      )}>
                                        {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                                        {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                                        {trend === 'stable' && <Minus className="w-3 h-3" />}
                                        <span>
                                          {trend === 'stable' ? 'No change' : 
                                           `${trendValue > 0 ? '+' : ''}${trendValue} from last scan`}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {metric.value >= 70 ? 'Excellent condition' :
                                     metric.value >= 40 ? 'Needs attention' :
                                     'Requires treatment'}
                                  </p>
                                </div>
                                <div className="relative w-16 h-16 flex-shrink-0">
                                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      className="text-muted"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      fill="none"
                                      d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                                    />
                                    <path
                                      className={cn(
                                        "transition-all",
                                        metric.value >= 70 ? "text-green-500" :
                                        metric.value >= 40 ? "text-yellow-500" :
                                        "text-red-500"
                                      )}
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      fill="none"
                                      strokeDasharray={`${metric.value}, 100`}
                                      d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                                    />
                                  </svg>
                                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                    {metric.value}
                                  </span>
                                </div>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    metric.value >= 70 ? "bg-green-500" :
                                    metric.value >= 40 ? "bg-yellow-500" :
                                    "bg-red-500"
                                  )}
                                  style={{ width: `${metric.value}%` }} 
                                />
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>

                  {/* Recommended Products */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Recommended Products</h3>
                      <Badge variant="secondary" className="text-xs">
                        {scan.recommendations.length} products
                      </Badge>
                    </div>
                    <div className="grid gap-3">
                      {scan.recommendations.map((product, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">Targets: {scan.primaryConcern}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-mono">${product.price.toFixed(2)}</p>
                                <Button size="sm" variant="ghost" className="h-7 text-xs mt-1">
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )
        })}
      </div>
    </div>
  )
}
