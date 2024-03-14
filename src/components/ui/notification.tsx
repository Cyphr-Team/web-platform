import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { CheckIcon, Clock, Circle } from "lucide-react"
import { format, formatDistance } from "date-fns"
import { Link } from "react-router-dom"
import { NotificationType } from "@/modules/notification/constants"

const notificationVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
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
    role="notification"
    className={cn(notificationVariants({ variant }), className)}
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

const NotificationCard = ({
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
}: AppNotificationProps) => {
  let NotificationIcon = Icons.notificationInfo
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
        "group flex justify-between mb-2 hover:bg-gray-200",
        !isRead && "bg-gray-100 border-l-4 border-primary-500",
        className
      )}
    >
      <NotificationIcon className="-ml-2 -mt-2" />
      <div>
        <NotificationTitle className="ml-2 text-sm">{title}</NotificationTitle>
        <NotificationDescription className="ml-2 text-muted-foreground">
          <p className="line-clamp-2">{description}</p>
          {linkDetails && (
            <Link
              to={linkDetails}
              className="underline"
              onClick={() => onMarkAsRead && onMarkAsRead(id)}
            >
              Click to view detail
            </Link>
          )}
        </NotificationDescription>
      </div>
      <div className="flex flex-col items-end">
        <NotificationTimestamp className="text-muted-foreground flex space-x-1">
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
            onClick={() => onMarkAsUnread && onMarkAsUnread(id)}
            className="hidden group-hover:flex cursor-pointer text-xs items-center mt-auto pl-2 pr-2 pt-1 pb-1 bg-gray-400 hover:bg-gray-500 text-white border-gray-300 rounded-md w-full"
            title="Mark as Unread"
          >
            Mark as Unread <Circle size={12} className="ml-1 w-4" />
          </div>
        ) : (
          <div
            onClick={() => onMarkAsRead && onMarkAsRead(id)}
            className="hidden group-hover:flex cursor-pointer text-xs items-center mt-auto pl-2 pr-2 pt-1 pb-1 bg-primary hover:bg-primary/90 text-white border-primary-300 rounded-md w-full"
            title="Mark as Read"
          >
            Mark as Read <CheckIcon size={12} className="ml-1 w-4" />
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
