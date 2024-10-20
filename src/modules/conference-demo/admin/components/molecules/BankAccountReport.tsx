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
    <Card className="border-r-0 border-b-0 shadow-none pl-0 mb-6">
      <CardHeader className="border-b px-8 md:py-4 border-r rounded-tr-lg p-4 md:p-4 xl:p-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle className="font-semibold text-2xl flex items-center gap-3">
            {data.bankAccountName}

            <Badge
              border
              isDot
              className="capitalize text-sm rounded-lg"
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
