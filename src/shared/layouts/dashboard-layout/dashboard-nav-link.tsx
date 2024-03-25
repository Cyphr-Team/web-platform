import { cn } from "@/lib/utils"
import { NavItem } from "@/types/common.type"
import { NavLink } from "react-router-dom"

export function DashboardNavLink({
  item,
  badge
}: {
  item: NavItem
  badge?: React.ReactNode
}) {
  return (
    <NavLink
      to={item.href ?? ""}
      className={({ isActive }) =>
        cn(
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer hover:bg-gray-100",
          "flex items-center space-x-3 py-md px-lg rounded-md",
          isActive && "bg-gray-100",
          item.className
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <item.icon
              className={cn("h-6 w-6 text-disabled", isActive && "text-dark")}
            />
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/2 z-1">
              {badge}
            </div>
          </div>
          <p className="text-base font-medium">{item.title}</p>
        </>
      )}
    </NavLink>
  )
}
