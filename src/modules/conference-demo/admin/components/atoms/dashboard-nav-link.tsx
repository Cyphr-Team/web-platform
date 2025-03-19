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
          "cursor-pointer hover:bg-gray-100 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
          "flex items-center space-x-3 rounded-md px-lg py-md",
          isActive && "bg-gray-100",
          item.className
        )
      }
      to={item.href ?? ""}
    >
      {() => (
        <>
          <div className="relative">
            <item.icon className="text-dark size-6 text-disabled" />
            <div className="z-1 absolute right-0 top-0 -translate-y-1/2 translate-x-1/3">
              {badge}
            </div>
          </div>
          <p className="text-sm">{item.title}</p>
        </>
      )}
    </NavLink>
  )
}
