import { FinancialProjectionApplicationSummary } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/FinancialProjectionApplicationDetails"

export function Component() {
  return (
    <div className="-m-4xl -mt-3xl bg-white">
      <FinancialProjectionApplicationSummary />
    </div>
  )
}

Component.displayName = "LoanReadyLoanSummary"
