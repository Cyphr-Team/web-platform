import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dot } from "@/components/ui/dot"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type ReactNode } from "react"

export function NotFoundAlert({
  status,
  label
}: React.PropsWithChildren<{ status?: InsightStatus; label: ReactNode }>) {
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
