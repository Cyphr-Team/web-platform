import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InformationRow } from "../../../atoms/InformationRow"
import { toCurrency } from "@/utils"
import { BankAccountReport } from "../BankAccountReport"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"

export const CashflowGlanceReport = () => {
  const { cashFlowAnalysis, isFetchingCashflow } =
    useLoanApplicationDetailContext()

  return (
    <div className="flex flex-col space-y-3xl">
      {" "}
      <Card className="border-r-0 border-b-0">
        <CardHeader className="border-b px-8 md:py-4 border-r rounded-tr-md">
          <div className="flex justify-between items-center flex-wrap gap-1">
            <CardTitle className="font-semibold text-2xl flex items-center gap-3">
              Cash Flow at a Glance
            </CardTitle>
            <DateHeader />
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <div className="grid grid-cols-2">
            <InformationRow
              label="Total Revenue"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalRevenue ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Total Loan Proceeds"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalLoanProceeds ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Total Expenses"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalExpense ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Total Loan Payments"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalLoanPayments ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Total NSF Count"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalNsfFeeCount ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Debt-to-Income Ratio (DTI)"
              value="N/A"
              isLoading={isFetchingCashflow}
            />

            <InformationRow
              label="Total NSF Amount"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalNsfAmount ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Debt Service Coverage Ratio (DSCR)"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.debtCoverageRatio ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Overdraft Fee Count"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalOverdraftFeeCount ?? 0
              )}
              isLoading={isFetchingCashflow}
            />
            <InformationRow label="Current Ratio" value="N/A" />
            <InformationRow
              label="Total Overdraft Amount"
              value={toCurrency(
                cashFlowAnalysis?.cashFlowGlance.totalOverdraftFeeSum ?? 0
              )}
              className="rounded-bl-md"
              isLoading={isFetchingCashflow}
            />
            <InformationRow
              label="Quick Ratio"
              value="N/A"
              className="rounded-br-md"
              isLoading={isFetchingCashflow}
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
