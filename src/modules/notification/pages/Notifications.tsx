import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { CheckCheckIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { type PaginationState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { NotificationCard } from "@/components/ui/notification"
import { DataListPagination } from "@/shared/molecules/DataListPagination"
import { cn } from "@/lib/utils"
import {
  type FilterParams,
  useQueryGetNotifications
} from "../hooks/useQuery/useQueryGetNotifications"
import { useMarkAllNotificationsAsRead } from "../hooks/useMutation/useMarkAllNotificationsAsRead"
import { useMarkNotificationAsRead } from "../hooks/useMutation/useMarkNotificationAsRead"
import { useMarkNotificationAsUnread } from "../hooks/useMutation/useMarkNotificationAsUnread"
import { NotificationType } from "../constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { useQueryGetUnreadNotifications } from "../hooks/useQuery/useQueryGetUnreadNotifications"

export function Component() {
  const crumbs = useBreadcrumb()
  const [filterParams, setFilterParams] = useState<FilterParams>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead()
  const { mutate: markAsRead } = useMarkNotificationAsRead()
  const { mutate: markAsUnread } = useMarkNotificationAsUnread()

  const { data, isFetching, refetch } = useQueryGetNotifications({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    ...filterParams
  })
  const { data: notifications, total } = data ?? { data: [], total: 0 }

  useEffect(() => {
    refetch()
  }, [filterParams, refetch])

  const handleClickMarkAllAsRead = () => {
    markAllAsRead(null, {
      onSuccess: () => {
        refetch()
        refetchUnreadCount()
      }
    })
  }
  const handleClickMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, {
      onSuccess: () => {
        refetch()
        refetchUnreadCount()
      }
    })
  }
  const handleClickMarkAsUnread = (notificationId: string) => {
    markAsUnread(notificationId, {
      onSuccess: () => {
        refetch()
        refetchUnreadCount()
      }
    })
  }

  const isLoanApplicant = checkIsLoanApplicant()
  const getLinkDetails = (notificationId: string) => {
    return isLoanApplicant
      ? APP_PATH.LOAN_APPLICATION.NOTIFICATION.details(notificationId)
      : APP_PATH.NOTIFICATION.details(notificationId)
  }

  // fetch count unread notifications
  const { data: unreadCount = 0, refetch: refetchUnreadCount } =
    useQueryGetUnreadNotifications()

  return (
    <div className={cn("container mx-auto overflow-auto p-2xl", "md:p-4xl")}>
      {/* Top bar */}
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Notifications</h1>

      {/* Filter bar */}
      <div className="mb-5 flex justify-between rounded-lg bg-gray-100 bg-opacity-60 p-3">
        <div>
          <Button
            className={cn(
              "rounded-r-none border",
              filterParams?.read == undefined &&
                "cursor-default bg-primary text-white hover:bg-primary"
            )}
            size="sm"
            variant="secondary"
            onClick={() =>
              setFilterParams({ ...filterParams, read: undefined })
            }
          >
            All
          </Button>
          <Button
            className={cn(
              "rounded-l-none border",
              filterParams?.read == false &&
                "cursor-default bg-primary text-white hover:bg-primary"
            )}
            size="sm"
            variant="secondary"
            onClick={() => setFilterParams({ ...filterParams, read: false })}
          >
            Unread
          </Button>
        </div>
        <Button
          className="rounded-md border-gray-300 bg-gray-400 text-white hover:bg-gray-500"
          disabled={unreadCount === 0}
          size="sm"
          onClick={handleClickMarkAllAsRead}
        >
          Mark all as read <CheckCheckIcon className="ml-1 w-4" />
        </Button>
      </div>

      {/* List of item */}
      {isFetching ? (
        <div className="absolute z-10 size-full rounded bg-zinc-50/50">
          <div className="sticky left-1/2 top-12 mt-12 flex w-full flex-col items-center justify-center">
            <Loader2 className="size-10 animate-spin text-primary" /> Loading...
          </div>
        </div>
      ) : null}

      {total === 0 ? (
        !isFetching ? (
          "No results."
        ) : (
          ""
        )
      ) : (
        <>
          {notifications.map((notification, index) => (
            <NotificationCard
              key={notification.id ?? index}
              description={notification.content}
              id={notification.id}
              isRead={notification.isRead}
              linkDetails={getLinkDetails(notification.id)}
              timestamp={notification.createdAt}
              title={notification.subject}
              variant={notification.type ?? NotificationType.INFO}
              onMarkAsRead={handleClickMarkAsRead}
              onMarkAsUnread={handleClickMarkAsUnread}
            />
          ))}
          <div className="flex items-center justify-end space-x-2 py-4">
            <DataListPagination
              canNextPage={
                pagination.pageIndex <
                Math.ceil(total / pagination.pageSize) - 1
              }
              canPreviousPage={pagination.pageIndex > 0}
              nextPage={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex + 1
                })
              }
              pageCount={Math.ceil(total / pagination.pageSize)}
              pageIndex={pagination.pageIndex}
              pageSize={pagination.pageSize}
              previousPage={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex - 1
                })
              }
              setPageIndex={(pageIndex) =>
                setPagination({ ...pagination, pageIndex })
              }
              setPageSize={(pageSize) =>
                setPagination({ ...pagination, pageSize })
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

Component.displayName = "NotificationPage"
