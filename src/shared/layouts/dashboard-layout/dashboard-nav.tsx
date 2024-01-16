import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types"
import { NavLink, useLocation } from "react-router-dom"

interface DashboardNavProps {
  readonly items: NavItem[]
  readonly isCollapsed?: boolean
}

export function DashboardNav({ items, isCollapsed }: DashboardNavProps) {
  const location = useLocation()

  if (!items?.length) {
    return null
  }

  const currentPath = location.pathname
  const isSelected = (href: string) => currentPath.startsWith(href)

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col flex-1 gap-4"
    >
      <nav className="grid group-[[data-collapsed=true]]:justify-center space-y-2">
        <TooltipProvider>
          {items.map((item, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.href ?? ""}
                    className={({ isActive }) =>
                      cn(
                        "h-9 w-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-active",
                        isActive && "bg-active"
                      )
                    }
                    data-selected={isSelected(item.href ?? "")}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.title}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink
                to={item.href ?? ""}
                key={index}
                className={({ isActive }) =>
                  cn(
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer hover:bg-active",
                    "flex items-center gap-4 py-md px-lg rounded-md",
                    isActive && "bg-active"
                  )
                }
                data-selected={isSelected(item.href ?? "")}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </NavLink>
            )
          )}
        </TooltipProvider>
      </nav>
    </div>
  )
}
