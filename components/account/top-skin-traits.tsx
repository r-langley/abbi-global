"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface SkinTrait {
  name: string
  score: number
  description: string
  color: string
}

interface TopSkinTraitsProps {
  traits: SkinTrait[]
  scanDate?: string
  compact?: boolean
}

export function TopSkinTraits({ traits, scanDate, compact = false }: TopSkinTraitsProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const topThree = traits.slice(0, 3)

  return (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <div className={`flex items-center gap-2 ${compact ? "" : "flex-wrap"}`}>
        {topThree.map((trait, i) => (
          <SheetTrigger key={i} asChild>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
              <span className="text-[10px] text-muted-foreground font-medium">{trait.name}</span>
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
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
            </button>
          </SheetTrigger>
        ))}
        {!compact && scanDate && (
          <span className="text-xs text-muted-foreground ml-2">{scanDate}</span>
        )}
      </div>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>My Skin Analysis</SheetTitle>
          {scanDate && (
            <p className="text-sm text-muted-foreground">Scanned {scanDate}</p>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Top 3 Summary */}
          <div>
            <h3 className="text-sm font-medium mb-3">Top Areas</h3>
            <div className="flex gap-3">
              {topThree.map((trait, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
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
                    <span className="absolute inset-0 flex items-center justify-center text-base font-medium">{trait.score}</span>
                  </div>
                  <span className="text-xs font-medium">{trait.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Traits Detail */}
          <div>
            <h3 className="text-sm font-medium mb-3">All Traits</h3>
            <div className="space-y-4">
              {traits.map((trait, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <Badge variant={trait.score < 50 ? "destructive" : trait.score < 70 ? "secondary" : "default"} className="text-xs">
                      {trait.score}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait.description}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${trait.color} bg-current`}
                      style={{ width: `${trait.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full font-mono text-xs"
            onClick={() => setShowDetails(false)}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
