import { TooltipProvider } from "@/components/ui/tooltip"
import { RoleBase } from "@/shared/molecules/RoleBase"
import { NavItem } from "@/types/common.type"
import { DashboardCollapsedNavLink } from "./dashboard-collapsed-nav-link"
import { DashboardNavLink } from "./dashboard-nav-link"
import { useNotification } from "@/hooks/useNotification"
import { Badge } from "@/components/ui/badge"
import { NOTIFICATION_NAV_ITEM } from "@/constants/nav-item.constant"

interface DashboardNavProps {
  readonly items: NavItem[]
  readonly isCollapsed?: boolean
}

function NotificationNavLink({ isCollapsed }: { isCollapsed?: boolean }) {
  const { data } = useNotification()

  const badge = data?.length ? (
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

  return (
    <RoleBase
      roles={NOTIFICATION_NAV_ITEM.roles}
      key={NOTIFICATION_NAV_ITEM.label}
    >
      {isCollapsed ? (
        <DashboardCollapsedNavLink item={NOTIFICATION_NAV_ITEM} badge={badge} />
      ) : (
        <DashboardNavLink item={NOTIFICATION_NAV_ITEM} badge={badge} />
      )}
    </RoleBase>
  )
}

export function DashboardNav({ items, isCollapsed }: DashboardNavProps) {
  if (!items?.length) {
    return null
  }

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
                <DashboardCollapsedNavLink item={item} />
              ) : (
                <DashboardNavLink item={item} />
              )}
            </RoleBase>
          ))}

          {/* NOTIFICATION */}
          <NotificationNavLink isCollapsed={isCollapsed} />
        </TooltipProvider>
      </nav>
    </div>
  )
}
