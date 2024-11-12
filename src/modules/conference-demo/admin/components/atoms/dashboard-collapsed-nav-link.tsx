import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
import { type NavItem } from "../../constants"

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
              "h-10 w-12 p-md rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100",
              isActive && "bg-gray-100"
            )
          }
          to={item.href ?? ""}
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <item.icon
                  className={cn("h-6 w-6", !isActive && "opacity-50")}
                />
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
