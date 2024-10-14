import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider.tsx"
import { useGetFinancialProjectLoanSummary } from "@/modules/loan-application/hooks/useGetFinancialProjectLoanSummary.ts"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { cn } from "@/lib/utils.ts"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"

export const ApplicationReviewPdf = () => {
  const financialApplicationForms = useGetFinancialProjectLoanSummary()
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()
  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: financialApplicationForms,
    kybFormData: loanSummary?.kybForm,
    kycFormData: loanSummary?.kycForm,
    loanApplicationDetails
  })

  return (
    <main className={cn("flex flex-col gap-4", "md:gap-8")}>
      {financialApplicationDetailData.map(
        ({
          id,
          subId = "",
          title,
          subTitle,
          financialApplicationFormData,
          subChildren
        }) => (
          <FinancialApplicationFormDetail
            isPdf
            key={id + subId}
            title={title}
            subTitle={subTitle}
            financialApplicationFormData={financialApplicationFormData}
            subChildren={subChildren}
          />
        )
      )}
    </main>
  )
}
