import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"
import { Badge } from "@/components/ui/badge"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { cn } from "@/lib/utils"
import { BankAccountSummary } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

type Props = {
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
    <Card className={cn("border-r-0 border-b-0 shadow-none", className)}>
      <CardHeader className="border-b px-8 md:py-4 border-r rounded-tr-md">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-2xl flex items-center gap-3">
            {formatHeader(data.bankAccountName ?? "N/A")}
            <Badge
              isDot
              variant="soft"
              variantColor={getBadgeVariantByInsightStatus(
                TaskFieldStatus.SUCCESS
              )}
              className="capitalize text-sm rounded-lg"
              isDotBefore={false}
              border
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
            label="Account holder"
            value={data.accountHolder ?? "N/A"}
            isLoading={isLoading}
          />
          <InformationRow
            label="Days of negative balance"
            value={data.numDaysNegativeBalance?.toString() ?? "N/A"}
            isLoading={isLoading}
          />
          <InformationRow
            label="Beginning balance"
            value={toCurrency(data.beginBalance ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Ending balance"
            value={toCurrency(data.endBalance ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Average daily balance"
            value={toCurrency(data.averageDailyBalance ?? 0)}
            className="rounded-bl-md"
            isLoading={isLoading}
          />
          <InformationRow
            label="Average transaction size"
            value={toCurrency(data.averageTransactionSize ?? 0)}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  )
}
