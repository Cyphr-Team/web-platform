import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { type NavItem } from "@/types/common.type"
import { NavLink } from "react-router-dom"

export function DashboardCollapsedNavLink({
  item,
  badge
}: {
  item: NavItem
  badge?: React.ReactNode
}) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger className={item.className}>
        <NavLink
          className={({ isActive }) =>
            cn(
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "h-9 w-10 px-3 py-2 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100",
              isActive && "bg-gray-100"
            )
          }
          to={item.href ?? ""}
        >
          {() => (
            <>
              <div className="relative">
                <item.icon className={cn("h-5 w-5")} />
                <div className="z-1 absolute right-0 top-0 -translate-y-1/2 translate-x-1/3">
                  {badge}
                </div>
              </div>
              <span className="sr-only">{item.title}</span>
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{item.title}</TooltipContent>
    </Tooltip>
  )
}
