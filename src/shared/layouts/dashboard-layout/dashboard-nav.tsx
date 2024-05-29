import { TooltipProvider } from "@/components/ui/tooltip"
import { RoleBase } from "@/shared/molecules/RoleBase"
import { NavItem } from "@/types/common.type"
import { DashboardCollapsedNavLink } from "./dashboard-collapsed-nav-link"
import { DashboardNavLink } from "./dashboard-nav-link"
import { useQueryGetUnreadNotifications } from "@/modules/notification/hooks/useQuery/useQueryGetUnreadNotifications"
import { APP_PATH } from "@/constants"
import { cn } from "@/lib/utils"
import { BadgeUnreadNotifications } from "@/modules/notification/components/atoms/BadgeUnreadNotifications"
import { FeatureFlagsRenderer } from "../FeatureFlagRenderer"

interface DashboardNavProps {
  readonly items: NavItem[]
  readonly isCollapsed?: boolean
}

function NotificationBadge() {
  // fetch count unread notifications
  const { data: unreadCount = 0 } = useQueryGetUnreadNotifications()

  return unreadCount == 0 ? null : (
    <BadgeUnreadNotifications unreadCount={unreadCount} />
  )
}

function getBadgeByHref(href?: string) {
  return [
    APP_PATH.NOTIFICATION.list,
    APP_PATH.LOAN_APPLICATION.NOTIFICATION.list
  ].includes(href || "") ? (
    <NotificationBadge />
  ) : null
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
        !isCollapsed && "border-0 md:border-b mb-6"
      )}
    >
      <nav className="flex flex-col gap-y-2 flex-1">
        <TooltipProvider>
          {items.map((item) => {
            const badge = getBadgeByHref(item.href)
            const NavLinkComponent = isCollapsed
              ? DashboardCollapsedNavLink
              : DashboardNavLink
            return (
              !item.disabled && (
                <FeatureFlagsRenderer
                  key={item.label}
                  ffKey={item.featureFlag}
                  fallBackChildren={<></>}
                >
                  <RoleBase roles={item.roles} key={item.label}>
                    <NavLinkComponent item={item} badge={badge} />
                  </RoleBase>
                </FeatureFlagsRenderer>
              )
            )
          })}
        </TooltipProvider>
      </nav>
    </div>
  )
}
