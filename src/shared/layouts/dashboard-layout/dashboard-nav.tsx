import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { RoleBase } from "@/shared/molecules/RoleBase"
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
          {items.map((item) => (
            <RoleBase roles={item.roles} key={item.label}>
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <NavLink
                      to={item.href ?? ""}
                      data-selected={isSelected(item.href ?? "")}
                      className={({ isActive }) =>
                        cn(
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                          "h-10 w-12 p-md rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100",
                          isActive && "bg-gray-100"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn("h-6 w-6", !isActive && "opacity-50")}
                          />
                          <span className="sr-only">{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ) : (
                <NavLink
                  to={item.href ?? ""}
                  className={({ isActive }) =>
                    cn(
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer hover:bg-gray-100",
                      "flex items-center space-x-3 py-md px-lg rounded-md",
                      isActive && "bg-gray-100"
                    )
                  }
                  data-selected={isSelected(item.href ?? "")}
                >
                  <item.icon className="h-6 w-6" />
                  <p className="text-base font-medium">{item.title}</p>
                </NavLink>
              )}
            </RoleBase>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  )
}
