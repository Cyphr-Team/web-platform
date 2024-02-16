import { TooltipProvider } from "@/components/ui/tooltip"
import { RoleBase } from "@/shared/molecules/RoleBase"
import { NavItem } from "@/types/common.type"
import { DashboardCollapsedNavLink } from "./dashboard-collapsed-nav-link"
import { DashboardNavLink } from "./dashboard-nav-link"
import { useNotification } from "@/hooks/useNotification"
import { Badge } from "@/components/ui/badge"
import { APP_PATH } from "@/constants"
import { cn } from "@/lib/utils"

interface DashboardNavProps {
  readonly items: NavItem[]
  readonly isCollapsed?: boolean
}

function NotificationBadge() {
  const { data } = useNotification()

  return data?.length ? (
    <Badge
      variant="solid"
      variantColor="red"
      className="flex p-0 h-4 w-4 justify-center"
    >
      {data.length}
    </Badge>
  ) : (
    ""
  )
}

function getBadgeByHref(href?: string) {
  return href === APP_PATH.NOTIFICATION.list ? <NotificationBadge /> : null
}

export function DashboardNav({ items, isCollapsed }: DashboardNavProps) {
  if (!items?.length) {
    return null
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group flex flex-col flex-1 gap-4 justify-between mb-0",
        !isCollapsed && "border-b mb-6"
      )}
    >
      <nav className="flex flex-col gap-y-2 flex-1">
        <TooltipProvider>
          {items.map((item) => {
            const badge = getBadgeByHref(item.href)
            return (
              <RoleBase roles={item.roles} key={item.label}>
                {isCollapsed ? (
                  <DashboardCollapsedNavLink item={item} badge={badge} />
                ) : (
                  <DashboardNavLink item={item} badge={badge} />
                )}
              </RoleBase>
            )
          })}
        </TooltipProvider>
      </nav>
    </div>
  )
}
