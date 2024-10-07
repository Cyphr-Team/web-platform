import { ButtonLoading } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { useGetFinancialProjectLoanSummary } from "@/modules/loan-application/hooks/useGetFinancialProjectLoanSummary"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { FolderDown } from "lucide-react"

export const FinancialProjectionApplicationDetails = () => {
  const financialApplicationForms = useGetFinancialProjectForms()
  const {
    loanApplicationDetails,
    kybFormData,
    kycFormData,
    isFetchingDetails,
    isLoading
  } = useBRLoanApplicationDetailsContext()
  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: financialApplicationForms,
    loanApplicationDetails,
    kybFormData,
    kycFormData
  })

  return (
    <Layout>
      <Header />
      <Main
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetchingDetails || isLoading}
      />
    </Layout>
  )
}

export const FinancialProjectionApplicationSummary = () => {
  const financialApplicationForms = useGetFinancialProjectLoanSummary()
  const { loanSummary, loanApplicationDetails, isFetchingSummary, isLoading } =
    useLoanApplicationDetailContext()
  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: financialApplicationForms,
    kybFormData: loanSummary?.kybForm,
    kycFormData: loanSummary?.kycForm,
    loanApplicationDetails
  })

  return (
    <Layout>
      <Header />
      <Main
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetchingSummary || isLoading}
      />
    </Layout>
  )
}

const Header = () => {
  return (
    <nav className={cn("mt-4", "md:mt-8")}>
      <div className="flex items-center gap-2 min-w-20">
        <h1
          className={cn(
            "text-lg font-semibold truncate min-w-20",
            "md:text-[2.5rem] md:leading-tight"
          )}
        >
          Application Summary
        </h1>
        <div className="ml-auto">
          <ButtonLoading>
            <FolderDown className="w-4 h-4 mr-1" /> Download PDF
          </ButtonLoading>
        </div>
      </div>

      <Separator className={cn("mt-2", "md:mt-5")} />
    </nav>
  )
}

interface MainProps {
  financialApplicationDetailData: FinancialApplicationDetailData[]
  isLoading?: boolean
}
const Main = ({ financialApplicationDetailData, isLoading }: MainProps) => {
  const render = financialApplicationDetailData.map(
    ({
      id,
      subId = "",
      title,
      subTitle,
      financialApplicationFormData,
      subChildren
    }) => (
      <FinancialApplicationFormDetail
        isLoading={isLoading}
        key={id + subId}
        title={title}
        subTitle={subTitle}
        financialApplicationFormData={financialApplicationFormData}
        subChildren={subChildren}
      />
    )
  )

  return <main className={cn("flex flex-col gap-4", "md:gap-8")}>{render}</main>
}

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      id="financial-application-detail"
      className={cn(
        "flex flex-col gap-4 px-4 flex-1 overflow-auto pb-4",
        "md:px-8 md:gap-8 md:pb-8"
      )}
    >
      {children}
    </div>
  )
}

export default FinancialProjectionApplicationDetails
