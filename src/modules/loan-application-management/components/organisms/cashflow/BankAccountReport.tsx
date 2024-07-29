import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toCurrency } from "@/utils"
import { AccountSummaryType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"
import { Badge } from "@/components/ui/badge"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { InformationRow } from "../../atoms/InformationRow"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

type Props = {
  data: AccountSummaryType
  isLoading: boolean
}

export const BankAccountReport: React.FC<Props> = ({ data, isLoading }) => {
  const formatHeader = (header: string) => {
    // CHASE SAVINGS PLAID SAVING 1111 (3r4WXxlv4N)
    // remove (3r4WXxlv4N) from the header
    const headerParts = header.split(" ")
    headerParts.pop()
    return headerParts.join(" ")
  }
  return (
    <Card className="border-r-0 border-b-0">
      <CardHeader className="border-b px-8 md:py-4 border-r rounded-tr-md">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-2xl flex items-center gap-3">
            {formatHeader(data.bankAccountName)}
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
            value={data.accountHolder}
            isLoading={isLoading}
          />
          <InformationRow
            label="Days of negative balance"
            value={data.numDaysNegativeBalance.toString()}
            isLoading={isLoading}
          />
          <InformationRow
            label="Begin date"
            value={data.beginDate}
            isLoading={isLoading}
          />
          <InformationRow
            label="Average transaction size"
            value={toCurrency(data.averageTransactionSize ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="End date"
            value={data.endDate}
            isLoading={isLoading}
          />

          <InformationRow
            label="Max deposit"
            value={toCurrency(data.maxDeposit ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Beginning balance"
            value={toCurrency(data.beginBalance ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Average deposit"
            value={toCurrency(data.averageDeposit ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Ending balance"
            value={toCurrency(data.endBalance ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Max withdrawal"
            value={toCurrency(data.maxWithdrawal ?? 0)}
            isLoading={isLoading}
          />
          <InformationRow
            label="Average daily balance"
            value={toCurrency(data.averageDailyBalance ?? 0)}
            className="rounded-bl-md"
            isLoading={isLoading}
          />
          <InformationRow
            label="Average withdrawal"
            value={toCurrency(data.averageWithdrawal ?? 0)}
            className="rounded-br-md"
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  )
}
