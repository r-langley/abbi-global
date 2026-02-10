"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function AccountHeader() {
  const isAmbassador = false
  const viewingAsFamilyMember = null

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-normal">Sarah Miller</h1>
              {isAmbassador && (
                <Badge variant="secondary" className="text-xs">Ambassador</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1">sarah.miller@example.com</p>
            <p className="text-sm text-muted-foreground">Member since Dec 2023</p>
            {viewingAsFamilyMember && (
              <Badge variant="secondary" className="text-xs mt-1">Viewing as {viewingAsFamilyMember}</Badge>
            )}
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
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <input className="w-full px-3 py-2 rounded-md border bg-background" defaultValue="Sarah Miller" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input className="w-full px-3 py-2 rounded-md border bg-background" defaultValue="sarah.miller@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Age</label>
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
