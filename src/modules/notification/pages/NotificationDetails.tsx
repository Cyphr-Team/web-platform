import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { useQueryGetNotificationDetails } from "../hooks/useQuery/useQueryGetNotificationDetails"
import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { NotFoundLayout } from "@/shared/layouts"
import { formatDistance } from "date-fns"
import { getReferenceResource, transformString } from "../services"

export function Component() {
  const crumbs = useBreadcrumb()
  const params = useParams()
  const notificationId = params.id || ""
  const { data: notification, isFetching } =
    useQueryGetNotificationDetails(notificationId)

  if (!notification && !isFetching) {
    return <NotFoundLayout />
  }

  const referenceResource = getReferenceResource(
    notification?.referenceType || "",
    notification?.referenceId || ""
  )

  return (
    <div className="container mx-auto overflow-auto py-4xl">
      {/* Top bar */}
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Notification</h1>

      {/* Loading */}
      {isFetching ? (
        <div className="absolute z-10 size-full rounded bg-zinc-50/50">
          <div className="sticky left-1/2 top-12 mt-12 flex w-full flex-col items-center justify-center">
            <Loader2 className="size-10 animate-spin text-primary" /> Loading...
          </div>
        </div>
      ) : null}

      <div className="rounded border p-6">
        {/* Timestamp */}
        <p
          className="mb-2xl flex space-x-1 text-sm text-muted-foreground"
          data-timestamp={notification?.createdAt}
          style={{ borderBottom: "1px solid #dfe1e6", width: "fit-content" }}
        >
          {formatDistance(
            new Date(),
            new Date(notification?.createdAt || new Date()),
            {
              addSuffix: false
            }
          ) + " ago"}
        </p>

        {/* Subject */}
        <h2 className="text-md mb-l font-semibold">
          {notification?.subject || "Notification"}
        </h2>

        {/* Description */}
        <p className="text-md mb-2xl">
          {notification?.content || "No description"}
        </p>

        {/* Reference resource */}
        {referenceResource ? (
          <p className="mb-2xl text-sm italic">
            <a
              className="ml-1 text-blue-700 underline"
              href={referenceResource}
              rel="noopener noreferrer"
              target="_blank"
            >
              Click to view the {transformString(notification?.referenceType)}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  )
}

Component.displayName = "NotificationPage"
