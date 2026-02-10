"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getRewardsProgress } from "@/lib/account-data"

export function AccountHeader() {
  const isAmbassador = false
  const viewingAsFamilyMember = null
  const rewardsProgress = getRewardsProgress()

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-lg font-normal">Sarah Miller</h1>
              {isAmbassador && (
                <Badge variant="secondary" className="text-xs">Ambassador</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">sarah.miller@example.com</p>
            <p className="text-xs text-muted-foreground">Member since Dec 2023</p>
            {viewingAsFamilyMember && (
              <Badge variant="secondary" className="text-xs mt-1">Viewing as {viewingAsFamilyMember}</Badge>
            )}
          </div>

          {/* Rewards Progress */}
          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Month {rewardsProgress.currentMonth}</span>
              {rewardsProgress.nextTier && (
                <span className="text-xs text-muted-foreground">
                  {rewardsProgress.nextTier.month - rewardsProgress.currentMonth} months to {rewardsProgress.nextTier.perks[0]}
                </span>
              )}
            </div>
            <div className="relative h-1.5 bg-muted rounded-full overflow-hidden mb-2">
              <div 
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                style={{ width: `${rewardsProgress.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              {rewardsProgress.currentTier.perks.map((perk, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] font-mono">{perk}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isAmbassador && (
              <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent gap-1.5">
                Dashboard
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="font-mono text-xs bg-transparent">
                  Edit
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Account Details</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                    <input className="w-full px-3 py-2 rounded-md border bg-background" defaultValue="Sarah Miller" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                    <input className="w-full px-3 py-2 rounded-md border bg-background" defaultValue="sarah.miller@example.com" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Age</label>
                    <input className="w-full px-3 py-2 rounded-md border bg-background" defaultValue="32" />
                  </div>
                  <Button className="w-full font-mono text-xs">Save Changes</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
