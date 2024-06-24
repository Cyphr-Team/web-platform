import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dot } from "@/components/ui/dot"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ReactNode } from "react"
import { InsightStatus } from "../../../loan-application-management/constants/types/middesk.type"

export const NotFoundAlert = ({
  status,
  label
}: React.PropsWithChildren<{ status?: InsightStatus; label: ReactNode }>) => {
  return (
    <Alert className="bg-gray-100">
      <AlertDescription className="text-text-tertiary">
        <div className="flex items-center">
          <Dot variantColor={getBadgeVariantByInsightStatus(status)} />
          {label}
        </div>
      </AlertDescription>
    </Alert>
  )
}
