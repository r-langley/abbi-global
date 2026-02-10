"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { SkinTrait } from "@/lib/account-data"

interface TopSkinTraitsProps {
  traits: SkinTrait[]
  scanDate?: string
  compact?: boolean
}

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

export function TopSkinTraits({ traits, scanDate, compact = false }: TopSkinTraitsProps) {
  const [showDetails, setShowDetails] = useState(false)

  const topThree = [...traits].sort((a, b) => a.score - b.score).slice(0, 3)

  return (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-3">
          {topThree.map((trait, i) => (
            <TraitCircle key={i} trait={trait} size={compact ? 40 : 48} />
          ))}
        </button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>My Skin</SheetTitle>
          {scanDate && (
            <p className="text-sm text-muted-foreground">Scanned {scanDate}</p>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Top 3 circles */}
          <div className="flex justify-center gap-4">
            {topThree.map((trait, i) => (
              <TraitCircle key={i} trait={trait} size={56} />
            ))}
          </div>

          {/* All traits list */}
          <div className="space-y-5">
            {traits.map((trait, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{trait.name}</span>
                  <span className="text-sm font-mono">{trait.score}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{trait.description}</p>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${trait.color} bg-current`}
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 font-mono text-xs" asChild>
              <Link href="/account/scan-history">See Full Analysis</Link>
            </Button>
            <Button className="flex-1 font-mono text-xs" asChild>
              <Link href="/skin-analysis">New Scan</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
