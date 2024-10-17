import { cn } from "@/lib/utils.ts"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"

export const ApplicationReviewPdf = () => {
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
