import { cn } from "@/lib/utils"
import { DashboardNav } from "@/shared/layouts/dashboard-layout/dashboard-nav"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import React, { useState } from "react"
import { Icons } from "@/components/ui/icons"
import { Account } from "@/shared/molecules/Account"
import { type NavItem } from "@/types/common.type"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function SideNav({ items, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "flex flex-col border py-4xl data-[collapsed=false]:w-60",
        className
      )}
      data-collapsed={isCollapsed}
    >
      <div className="mb-3xl hidden items-center justify-between pl-3xl pr-2xl md:flex">
        <LogoHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        {!isCollapsed ? (
          <button type="button" onClick={toggleCollapse}>
            {Icons.arrowSquare({ className: "h-6 w-6" })}
          </button>
        ) : null}
      </div>

      <div className="hidden flex-1 flex-col px-xl md:flex">
        <DashboardNav isCollapsed={isCollapsed} items={items} />
        <Account isCollapsed={isCollapsed} />
      </div>
    </div>
  )
}
