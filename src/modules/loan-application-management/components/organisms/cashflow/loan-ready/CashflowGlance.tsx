import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InformationRow } from "../../../atoms/InformationRow"
import { toCurrency } from "@/utils"
import { BankAccountReport } from "../BankAccountReport"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"

export function CashflowGlanceReport() {
  const { cashFlowAnalysis, isFetchingCashflow } =
    useLoanApplicationDetailContext()

  return (
    <div className="flex flex-col space-y-3xl">
      <Card className="border-b-0 border-r-0">
        <CardHeader className="rounded-tr-md border-b border-r px-8 md:py-4">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
              Cash Flow at a Glance
            </CardTitle>
            <DateHeader />
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <div className="grid grid-cols-2">
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total Revenue"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalRevenue ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total Loan Proceeds"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalLoanProceeds ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total Expenses"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalExpense ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total Loan Payments"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalLoanPayments ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total NSF Count"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalNsfFeeCount ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Debt-to-Income Ratio (DTI)"
              value="N/A"
            />

            <InformationRow
              isLoading={isFetchingCashflow}
              label="Total NSF Amount"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalNsfAmount ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Debt Service Coverage Ratio (DSCR)"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.debtCoverageRatio ?? 0
              )}
            />
            <InformationRow
              isLoading={isFetchingCashflow}
              label="Overdraft Fee Count"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalOverdraftFeeCount ?? 0
              )}
            />
            <InformationRow label="Current Ratio" value="N/A" />
            <InformationRow
              className="rounded-bl-md"
              isLoading={isFetchingCashflow}
              label="Total Overdraft Amount"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalOverdraftFeeSum ?? 0
              )}
            />
            <InformationRow
              className="rounded-br-md"
              isLoading={isFetchingCashflow}
              label="Quick Ratio"
              value="N/A"
            />
          </div>
        </CardContent>
      </Card>
      {cashFlowAnalysis?.bankAccountSummary?.map((data, index) => (
        <BankAccountReport
          key={index}
          data={data}
          isLoading={isFetchingCashflow}
        />
      ))}
    </div>
  )
}
