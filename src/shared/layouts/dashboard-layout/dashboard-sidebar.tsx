import { cn } from "@/lib/utils"
import { DashboardNav } from "./dashboard-nav"
import { DASHBOARD_NAV_ITEM } from "@/constants/nav-item.constant"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("border", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <DashboardNav items={DASHBOARD_NAV_ITEM} />
          </div>
        </div>
      </div>
    </div>
  )
}
