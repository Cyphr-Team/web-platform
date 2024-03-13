import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { CheckCheckIcon, Loader2 } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { PaginationState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { NotificationCard } from "@/components/ui/notification"
import { DataListPagination } from "@/shared/molecules/DataListPagination"
import { cn } from "@/lib/utils"
import {
  FilterParams,
  useQueryGetNotifications
} from "../hooks/useQuery/useQueryGetNotifications"
import { useMarkAllNotificationsAsRead } from "../hooks/useMutation/useMarkAllNotificationsAsRead"
import { useMarkNotificationAsRead } from "../hooks/useMutation/useMarkNotificationAsRead"
import { useMarkNotificationAsUnread } from "../hooks/useMutation/useMarkNotificationAsUnread"
import { NotificationType } from "../constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"

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
    markAllAsRead(null, { onSuccess: () => refetch() })
  }
  const handleClickMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, { onSuccess: () => refetch() })
  }
  const handleClickMarkAsUnread = (notificationId: string) => {
    markAsUnread(notificationId, { onSuccess: () => refetch() })
  }

  const isLoanApplicant = checkIsLoanApplicant()
  const getLinkDetails = (notificationId: string) => {
    return isLoanApplicant
      ? `${APP_PATH.LOAN_APPLICATION.NOTIFICATION.details(notificationId)}`
      : `${APP_PATH.NOTIFICATION.details(notificationId)}`
  }

  return (
    <div className="container mx-auto py-4xl overflow-auto">
      {/* Top bar */}
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Notifications</h1>

      {/* Filter bar */}
      <div className="bg-gray-100 bg-opacity-60 p-3 rounded-lg mb-5 flex justify-between">
        <div>
          <Button
            onClick={() =>
              setFilterParams({ ...filterParams, read: undefined })
            }
            size="sm"
            variant="secondary"
            className={cn(
              "border rounded-r-none",
              filterParams?.read == undefined &&
                "bg-primary text-white cursor-default hover:bg-primary"
            )}
          >
            All
          </Button>
          <Button
            onClick={() => setFilterParams({ ...filterParams, read: false })}
            size="sm"
            variant="secondary"
            className={cn(
              "border rounded-l-none",
              filterParams?.read == false &&
                "bg-primary text-white cursor-default hover:bg-primary"
            )}
          >
            Unread
          </Button>
        </div>
        <Button
          onClick={handleClickMarkAllAsRead}
          size="sm"
          style={{ background: "gray" }}
        >
          Mark all as read <CheckCheckIcon className="ml-1 w-4" />
        </Button>
      </div>

      {/* List of item */}
      {isFetching && (
        <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
          <div className="sticky top-12 left-1/2 mt-12 justify-center items-center w-full flex flex-col">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />{" "}
            Loading...
          </div>
        </div>
      )}
      {total === 0 ? (
        "No results."
      ) : (
        <Fragment>
          {notifications.map((notification, index) => (
            <NotificationCard
              id={notification.id}
              key={notification.id ?? index}
              title={notification.subject}
              description={notification.content}
              variant={notification.type ?? NotificationType.INFO}
              timestamp={notification.createdAt}
              linkDetails={getLinkDetails(notification.id)}
              isRead={notification.isRead}
              onMarkAsRead={handleClickMarkAsRead}
              onMarkAsUnread={handleClickMarkAsUnread}
            />
          ))}
          <div className="flex items-center justify-end space-x-2 py-4">
            <DataListPagination
              pageSize={pagination.pageSize}
              setPageSize={(pageSize) =>
                setPagination({ ...pagination, pageSize })
              }
              pageCount={Math.ceil(total / pagination.pageSize)}
              pageIndex={pagination.pageIndex}
              setPageIndex={(pageIndex) =>
                setPagination({ ...pagination, pageIndex })
              }
              canPreviousPage={pagination.pageIndex > 0}
              previousPage={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex - 1
                })
              }
              canNextPage={
                pagination.pageIndex <
                Math.ceil(total / pagination.pageSize) - 1
              }
              nextPage={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex + 1
                })
              }
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

Component.displayName = "NotificationPage"
