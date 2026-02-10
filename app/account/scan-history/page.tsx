"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/account/section-header"
import { mockSkinScans, getAllSkinTraits, getTopSkinTraits } from "@/lib/account-data"
import type { SkinTrait } from "@/lib/account-data"

function TraitCircle({ trait, size = 48 }: { trait: SkinTrait; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-muted-foreground font-medium">{trait.name}</span>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size} viewBox="0 0 36 36">
          <path
            className="text-muted"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
          />
          <path
            className={trait.color}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${trait.score}, 100`}
            d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">{trait.score}</span>
      </div>
    </div>
  )
}

export default function ScanHistoryPage() {
  const [expandedScan, setExpandedScan] = useState<string | null>(mockSkinScans[0]?.id || null)

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Scan History"
        description="Track your skin health over time"
        action={
          <Button size="sm" className="font-mono text-xs" asChild>
            <Link href="/skin-analysis">New Scan</Link>
          </Button>
        }
      />

      <div className="space-y-4">
        {mockSkinScans.map((scan, scanIndex) => {
          const topTraits = getTopSkinTraits(scan)
          const allTraits = getAllSkinTraits(scan)
          const isExpanded = expandedScan === scan.id
          const previousScan = mockSkinScans[scanIndex + 1]

          return (
            <Card key={scan.id}>
              <CardContent className="p-5">
                {/* Scan summary - always visible */}
                <button
                  className="w-full text-left"
                  onClick={() => setExpandedScan(isExpanded ? null : scan.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-base font-medium">{scan.date}</p>
                      <p className="text-xs text-muted-foreground">Age {scan.age}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Top 3 trait circles */}
                  <div className="flex items-center gap-4">
                    {topTraits.map((trait, i) => (
                      <TraitCircle key={i} trait={trait} size={48} />
                    ))}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t space-y-6">
                    {/* All traits */}
                    <div className="space-y-4">
                      <p className="text-sm font-medium">All Traits</p>
                      <div className="grid gap-3">
                        {allTraits.map((trait, i) => {
                          const prevMetric = previousScan?.metrics.find(m => m.name === trait.name)
                          const diff = prevMetric ? trait.score - prevMetric.value : null

                          return (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm">{trait.name}</span>
                                <div className="flex items-center gap-2">
                                  {diff !== null && diff !== 0 && (
                                    <span className="text-xs text-muted-foreground font-mono">
                                      {diff > 0 ? "+" : ""}{diff}
                                    </span>
                                  )}
                                  <span className="text-sm font-mono w-6 text-right">{trait.score}</span>
                                </div>
                              </div>
                              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${trait.color} bg-current`}
                                  style={{ width: `${trait.score}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Recommendations */}
                    {scan.recommendations.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Recommended Products</p>
                        <div className="space-y-2">
                          {scan.recommendations.map((product, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2">
                              <span className="text-sm">{product.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-mono text-muted-foreground">${product.price.toFixed(0)}</span>
                                <Button size="sm" variant="outline" className="h-7 text-xs font-mono">Add</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
