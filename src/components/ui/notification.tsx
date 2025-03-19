import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { type IconProps, Icons } from "./icons"
import { CheckIcon, Circle, Clock } from "lucide-react"
import { format, formatDistance } from "date-fns"
import { Link } from "react-router-dom"
import { NotificationType } from "@/modules/notification/constants"

const notificationVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        info: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
)

const Notification = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof notificationVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(notificationVariants({ variant }), className)}
    // role="notification"
    {...props}
  />
))

Notification.displayName = "Notification"

const NotificationTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))

NotificationTitle.displayName = "NotificationTitle"

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))

NotificationDescription.displayName = "NotificationDescription"

const NotificationTimestamp = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-none tracking-tight", className)}
    {...props}
  />
))

NotificationTimestamp.displayName = "NotificationTimestamp"

const NotificationAction = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-medium leading-none tracking-tight", className)}
    {...props}
  />
))

NotificationAction.displayName = "NotificationAction"

interface AppNotificationProps {
  id: string
  title: string
  description?: string
  variant: NotificationType
  timestamp: string
  linkDetails: string
  isRead: boolean
  onMarkAsRead?: (notificationId: string) => void
  onMarkAsUnread?: (notificationId: string) => void
  className?: string
}

function NotificationCard({
  id,
  title,
  description,
  variant,
  timestamp,
  linkDetails,
  isRead,
  onMarkAsRead,
  onMarkAsUnread,
  className
}: AppNotificationProps) {
  let NotificationIcon: (props: IconProps) => JSX.Element

  switch (variant.toUpperCase()) {
    case NotificationType.SUCCESS:
      NotificationIcon = Icons.notificationSuccess
      break
    case NotificationType.ERROR:
    case NotificationType.WARNING:
      NotificationIcon = Icons.notificationError
      break
    default:
      NotificationIcon = Icons.notificationInfo
      break
  }

  return (
    <Notification
      className={cn(
        "group mb-2 flex justify-between hover:bg-gray-200",
        !isRead && "border-primary-500 border-l-4 bg-gray-100",
        className
      )}
    >
      <NotificationIcon className="-ml-2 -mt-2" />
      <div>
        <NotificationTitle className="ml-2 text-sm">{title}</NotificationTitle>
        <NotificationDescription className="ml-2 text-muted-foreground">
          <p className="line-clamp-2">{description}</p>
          {linkDetails ? (
            <Link
              className="underline"
              to={linkDetails}
              onClick={() => onMarkAsRead && onMarkAsRead(id)}
            >
              Click to view detail
            </Link>
          ) : null}
        </NotificationDescription>
      </div>
      <div className="flex flex-col items-end">
        <NotificationTimestamp className="flex space-x-1 text-muted-foreground">
          <Clock size={12} />
          <p
            data-timestamp={timestamp}
            title={format(timestamp ?? new Date(), "hh:mm a - LLL dd, y")}
          >
            {formatDistance(new Date(), new Date(timestamp), {
              addSuffix: false
            }) + " ago"}
          </p>
        </NotificationTimestamp>
        {isRead ? (
          <div
            className="mt-auto hidden w-full cursor-pointer items-center rounded-md border-gray-300 bg-gray-400 px-2 py-1 text-xs text-white hover:bg-gray-500 group-hover:flex"
            title="Mark as Unread"
            onClick={() => onMarkAsUnread && onMarkAsUnread(id)}
          >
            Mark as Unread <Circle className="ml-1 w-4" size={12} />
          </div>
        ) : (
          <div
            className="border-primary-300 mt-auto hidden w-full cursor-pointer items-center rounded-md bg-primary px-2 py-1 text-xs text-white hover:bg-primary/90 group-hover:flex"
            title="Mark as Read"
            onClick={() => onMarkAsRead && onMarkAsRead(id)}
          >
            Mark as Read <CheckIcon className="ml-1 w-4" size={12} />
          </div>
        )}
      </div>
    </Notification>
  )
}

export {
  Notification,
  NotificationTitle,
  NotificationDescription,
  NotificationTimestamp,
  NotificationCard
}
