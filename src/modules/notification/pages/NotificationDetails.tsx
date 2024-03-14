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
    <div className="container mx-auto py-4xl overflow-auto">
      {/* Top bar */}
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Notification</h1>

      {/* Loading */}
      {isFetching && (
        <div className="absolute h-full w-full bg-zinc-50/50 z-10 rounded">
          <div className="sticky top-12 left-1/2 mt-12 justify-center items-center w-full flex flex-col">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />{" "}
            Loading...
          </div>
        </div>
      )}

      <div className="border rounded p-6">
        {/* Timestamp */}
        <p
          className="text-muted-foreground flex space-x-1 text-sm mb-2xl"
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
        <h2 className="text-md font-semibold mb-l">
          {notification?.subject || "Notification"}
        </h2>

        {/* Description */}
        <p className="text-md mb-2xl">
          {notification?.content || "No description"}
        </p>

        {/* Reference resource */}
        {referenceResource && (
          <p className="text-sm mb-2xl italic">
            <a
              href={referenceResource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1 text-blue-700"
            >
              Click to view the {transformString(notification?.referenceType)}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

Component.displayName = "NotificationPage"
