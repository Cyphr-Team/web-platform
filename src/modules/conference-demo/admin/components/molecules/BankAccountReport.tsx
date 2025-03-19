import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BankAccountInformation } from "@/modules/conference-demo/admin/components/atoms"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { type BankAccountSummary } from "@/modules/loan-application-management/constants/types/v2/cashflow.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { toCurrency } from "@/utils"

interface Props {
  data: BankAccountSummary
}

function BankAccountReport({ data }: Props) {
  const bankAccountCurrency = (value: number) => toCurrency(value, 0)

  return (
    <Card className="mb-6 border-b-0 border-r-0 pl-0 shadow-none">
      <CardHeader className="rounded-tr-lg border-b border-r p-4 px-8 md:p-4 xl:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            {data.bankAccountName}

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

          <div className="text-text-tertiary">Last updated on 03/25/2024</div>
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <div className="grid grid-cols-2">
          <BankAccountInformation
            label="Account holder"
            value={data.accountHolder ?? "N/A"}
          />
          <BankAccountInformation
            label="Days of negative balance"
            value={data.numDaysNegativeBalance?.toString() ?? "N/A"}
          />
          <BankAccountInformation
            label="Beginning balance"
            value={bankAccountCurrency(data.beginBalance ?? 0)}
          />
          <BankAccountInformation
            label="Ending balance"
            value={bankAccountCurrency(data.endBalance ?? 0)}
          />
          <BankAccountInformation
            className="rounded-l-lg"
            label="Average daily balance"
            value={bankAccountCurrency(data.averageDailyBalance ?? 0)}
          />
          <BankAccountInformation
            className="rounded-r-lg"
            label="Average transaction size"
            value={bankAccountCurrency(data.averageTransactionSize ?? 0)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BankAccountReport
