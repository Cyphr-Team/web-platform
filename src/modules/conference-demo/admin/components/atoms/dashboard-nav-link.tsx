import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
import { type NavItem } from "../../constants"

export function DashboardNavLink({
  item,
  badge
}: {
  item: NavItem
  badge?: React.ReactNode
}) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer hover:bg-gray-100",
          "flex items-center space-x-3 py-md px-lg rounded-md",
          isActive && "bg-gray-100",
          item.className
        )
      }
      to={item.href ?? ""}
    >
      {() => (
        <>
          <div className="relative">
            <item.icon className="h-6 w-6 text-disabled text-dark" />
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/2 z-1">
              {badge}
            </div>
          </div>
          <p className="text-sm">{item.title}</p>
        </>
      )}
    </NavLink>
  )
}
