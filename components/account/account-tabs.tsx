"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabItems = [
  {
    label: "My Abbi",
    href: "/account",
  },
  {
    label: "Orders",
    href: "/account/orders",
  },
  {
    label: "Subscriptions",
    href: "/account/subscriptions",
  },
  {
    label: "Rewards",
    href: "/account/rewards",
  },
]

export function AccountTabs() {
  const pathname = usePathname()

  return (
    <div className="mb-8 text-center">
      <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]">
        {tabItems.map((item) => {
          const isActive =
            item.href === "/account"
              ? pathname === "/account"
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] rounded-xl",
                isActive
                  ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                  : "text-foreground dark:text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
