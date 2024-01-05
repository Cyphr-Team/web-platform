"use client"

import { cn } from "@/lib/utils"
import { NavItem } from "@/types"
import { ArrowRightIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface DashboardNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = ""

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        return (
          item.href && (
            <a
              key={item.href}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false)
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <ArrowRightIcon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </a>
          )
        )
      })}
    </nav>
  )
}
