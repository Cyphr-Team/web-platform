import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dot } from "@/components/ui/dot"
import { MiddeskStatus } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ReactNode } from "react"

export const NotFoundAlert = ({
  status,
  label
}: React.PropsWithChildren<{ status?: MiddeskStatus; label: ReactNode }>) => {
  return (
    <Alert className="bg-gray-100">
      <AlertDescription className="text-text-tertiary">
        <div className="flex items-center">
          <Dot variantColor={getBadgeVariantByMiddeskStatus(status)} />
          {label}
        </div>
      </AlertDescription>
    </Alert>
  )
}
