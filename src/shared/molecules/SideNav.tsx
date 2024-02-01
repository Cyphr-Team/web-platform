import { cn } from "@/lib/utils"
import { DashboardNav } from "@/shared/layouts/dashboard-layout/dashboard-nav"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { useState } from "react"
import { Icons } from "@/components/ui/icons"
import { Account } from "@/shared/molecules/Account"
import { NavItem } from "@/types/common.type"
import { Header } from "../layouts/dashboard-layout/dashboard-header"

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
        "py-4xl border data-[collapsed=false]:w-60 flex-col flex ",
        className
      )}
      data-collapsed={isCollapsed}
    >
      <Header />

      <div className="pl-3xl pr-2xl items-center mb-3xl justify-between hidden md:flex">
        <LogoHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        {!isCollapsed && (
          <button onClick={toggleCollapse}>
            {Icons.arrowSquare({ className: "h-6 w-6" })}
          </button>
        )}
      </div>

      <div className="px-xl flex-col flex-1 hidden md:flex">
        <DashboardNav items={items} isCollapsed={isCollapsed} />
        <Account isCollapsed={isCollapsed} />
      </div>
    </div>
  )
}
