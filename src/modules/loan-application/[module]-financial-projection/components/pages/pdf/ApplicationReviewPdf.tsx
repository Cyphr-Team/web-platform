import { cn } from "@/lib/utils.ts"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"

export function ApplicationReviewPdf() {
  const financialApplicationForms = useGetFinancialProjectForms()
  const { loanApplicationDetails, kybFormData, kycFormData } =
    useBRLoanApplicationDetailsContext()
  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: financialApplicationForms,
    loanApplicationDetails,
    kybFormData,
    kycFormData
  })

  return (
    <main className={cn("flex flex-col gap-4 w-full", "md:gap-8")}>
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
            key={id + subId}
            isPdf
            financialApplicationFormData={financialApplicationFormData}
            subChildren={subChildren}
            subTitle={subTitle}
            title={title}
          />
        )
      )}
    </main>
  )
}
