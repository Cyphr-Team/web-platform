import { cn } from "@/lib/utils"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { useAdminFinancialProjectionApplicationDetails } from "@/modules/loan-application/[module]-financial-projection/hooks/details/admin/useAdminFinancialProjectionApplicationDetails"
import { useApplicantFinancialProjectionApplicationDetails } from "@/modules/loan-application/[module]-financial-projection/hooks/details/applicant/useApplicantFinancialProjectionApplicationDetails"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { BasicApplicationDrawer } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/BasicApplicationDrawer.tsx"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

// The function is used for applicant site
export function FinancialProjectionApplicationDetails() {
  const { kybFormData } = useBRLoanApplicationDetailsContext()

  const { financialApplicationDetailData, isFetching } =
    useApplicantFinancialProjectionApplicationDetails()

  return (
    <>
      <Header />
      <Main
        companyName={kybFormData?.businessLegalName ?? ""}
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetching}
      />
    </>
  )
}

// The function is used for admin site
export function FinancialProjectionApplicationSummary() {
  const {
    loanSummary,
    applicationSummary: applicationSummaryV2,
    isFetchingSummary,
    isLoading
  } = useLoanApplicationDetailContext()

  const { isFetching, financialApplicationDetailData } =
    useAdminFinancialProjectionApplicationDetails()

  const businessLegalName = isEnableFormV2()
    ? applicationSummaryV2?.businessInfo?.businessName?.value
    : loanSummary?.kybForm?.businessLegalName

  return (
    <Layout>
      <Header />
      <Main
        companyName={businessLegalName ?? ""}
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetchingSummary || isLoading || isFetching}
      />
    </Layout>
  )
}

function Header() {
  return (
    <nav className="mb-6 md:mb-12">
      <div className="flex min-w-20 items-center gap-2">
        <h1 className="min-w-20 truncate text-lg font-semibold md:text-2xl">
          Assessment Summary
        </h1>
        <div className="ml-auto">
          <BasicApplicationDrawer />
        </div>
      </div>
    </nav>
  )
}

interface MainProps {
  financialApplicationDetailData: FinancialApplicationDetailData[]
  isLoading?: boolean
  isPdf?: boolean
  companyName: string
}

function Main({ financialApplicationDetailData, isLoading, isPdf }: MainProps) {
  return (
    <main className={cn("flex flex-col gap-4 md:gap-8")}>
      <FinancialProjectionApplicationDetail
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isLoading}
        isPdf={isPdf}
      />
    </main>
  )
}

export function FinancialProjectionApplicationDetail({
  financialApplicationDetailData,
  isPdf,
  isLoading
}: {
  financialApplicationDetailData: FinancialApplicationDetailData[]
  isPdf?: boolean
  isLoading?: boolean
}) {
  return financialApplicationDetailData.map(
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
        financialApplicationFormData={financialApplicationFormData}
        isLoading={isLoading}
        isPdf={isPdf}
        subChildren={subChildren}
        subTitle={subTitle}
        title={title}
      />
    )
  )
}

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div
      className="mt-8 flex flex-1 flex-col overflow-auto bg-gray-50 px-4 pb-4 md:px-8 md:pb-8"
      id="financial-application-detail"
    >
      {children}
    </div>
  )
}

export default FinancialProjectionApplicationDetails
