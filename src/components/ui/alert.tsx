import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icons } from "./icons"
import { X } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertVariants({ variant }), className)}
    role="alert"
    {...props}
  />
))

Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))

AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))

AlertDescription.displayName = "AlertDescription"

interface AppAlertProps {
  title: string
  description?: React.ReactNode
  variant: "success" | "error"
  onClose?: () => void
}

function AppAlert({ title, description, variant, onClose }: AppAlertProps) {
  const AlertIcon =
    variant === "success" ? Icons.alertSuccess : Icons.alertError

  return (
    <Alert>
      <AlertIcon className="-ml-2 -mt-2" />
      <AlertTitle className="ml-2 text-sm">
        {!!onClose && (
          <Button
            className="absolute right-4 size-auto p-0 text-muted-foreground"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        )}
        {title}
      </AlertTitle>
      <AlertDescription className="ml-2 text-muted-foreground">
        {description}
      </AlertDescription>
    </Alert>
  )
}

export { Alert, AlertTitle, AlertDescription, AppAlert }
