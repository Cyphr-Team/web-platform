import { cn } from "@/lib/utils"
import { DashboardNav } from "./dashboard-nav"
import { navItems } from "@/constants"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("py-16 border", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
