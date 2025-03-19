import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"
import { Badge } from "@/components/ui/badge"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { cn } from "@/lib/utils"
import { type BankAccountSummary } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

interface Props {
  data: BankAccountSummary
  isLoading: boolean
  className: string
}

export const BankAccountReport: React.FC<Props> = ({
  data,
  isLoading,
  className
}) => {
  const formatHeader = (header: string) => {
    // CHASE SAVINGS PLAID SAVING 1111 (3r4WXxlv4N)
    // remove (3r4WXxlv4N) from the header
    const headerParts = header.split(" ")

    headerParts.pop()

    return headerParts.join(" ")
  }

  return (
    <Card className={cn("border-b-0 border-r-0 shadow-none", className)}>
      <CardHeader className="rounded-tr-md border-b border-r px-8 md:py-4">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            {formatHeader(data.bankAccountName ?? "N/A")}
            <Badge
              border
              isDot
              className="rounded-lg text-sm capitalize"
              isDotBefore={false}
              variant="soft"
              variantColor={getBadgeVariantByInsightStatus(
                TaskFieldStatus.SUCCESS
              )}
            >
              Connected
            </Badge>
          </CardTitle>
          <DateHeader />
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="grid grid-cols-2">
          <InformationRow
            isLoading={isLoading}
            label="Account holder"
            value={data.accountHolder ?? "N/A"}
          />
          <InformationRow
            isLoading={isLoading}
            label="Days of negative balance"
            value={data.numDaysNegativeBalance?.toString() ?? "N/A"}
          />
          <InformationRow
            isLoading={isLoading}
            label="Beginning balance"
            value={toCurrency(data.beginBalance ?? 0)}
          />
          <InformationRow
            isLoading={isLoading}
            label="Ending balance"
            value={toCurrency(data.endBalance ?? 0)}
          />
          <InformationRow
            className="rounded-bl-md"
            isLoading={isLoading}
            label="Average daily balance"
            value={toCurrency(data.averageDailyBalance ?? 0)}
          />
          <InformationRow
            isLoading={isLoading}
            label="Average transaction size"
            value={toCurrency(data.averageTransactionSize ?? 0)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
