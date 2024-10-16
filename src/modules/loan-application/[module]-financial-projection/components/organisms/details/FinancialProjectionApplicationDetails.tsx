import { ButtonLoading } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details"
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { useGetFinancialProjectLoanSummary } from "@/modules/loan-application/hooks/useGetFinancialProjectLoanSummary"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import {
  EXPORT_CLASS,
  generatePDF
} from "@/modules/loan-application/services/pdf-v2.service"
import { toastError } from "@/utils"
import { useIsFetching } from "@tanstack/react-query"
import { FolderDown } from "lucide-react"
import { useRef } from "react"

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
  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = isLoading || isFetchingDetails

  return (
    <Layout>
      <Header isLoading={isFetching || !!isFetchingBankAccounts} />
      <Main
        isPdf
        companyName={kybFormData?.businessLegalName ?? ""}
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetching}
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
  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = isLoading || isFetchingSummary

  return (
    <Layout>
      <Header isLoading={isFetching || !!isFetchingBankAccounts} />
      <Main
        isPdf
        companyName={loanSummary?.kybForm?.businessLegalName ?? ""}
        financialApplicationDetailData={financialApplicationDetailData}
        isLoading={isFetchingSummary || isLoading}
      />
    </Layout>
  )
}

interface HeaderProps {
  isLoading?: boolean
}

const Header = ({ isLoading }: HeaderProps) => {
  const isExporting = useBoolean(false)

  const elementToExportRef = useRef<Partial<Record<string, HTMLDivElement>>>({})

  const exportToPdf = async () => {
    try {
      isExporting.onTrue()

      if (elementToExportRef.current) {
        const filteredElement = [
          ...document.getElementsByClassName(EXPORT_CLASS.FINANCIAL)
        ] as HTMLDivElement[]

        const { pdf } = await generatePDF(filteredElement)

        pdf.save(`financial_application_summary_${new Date().valueOf()}.pdf`)
      }
    } catch (error) {
      toastError({
        title: "Something went wrong!",
        description: "Download PDF failed, please try again later!"
      })
    } finally {
      isExporting.onFalse()
    }
  }

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
          <ButtonLoading
            disabled={isLoading}
            isLoading={isExporting.value}
            variant="success"
            className="font-semibold"
            onClick={exportToPdf}
          >
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
  isPdf?: boolean
  companyName: string
}
const Main = ({
  financialApplicationDetailData,
  isLoading,
  isPdf,
  companyName
}: MainProps) => {
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
        isPdf={isPdf}
        isLoading={isLoading}
        key={id + subId}
        title={title}
        subTitle={subTitle}
        financialApplicationFormData={financialApplicationFormData}
        subChildren={subChildren}
      />
    )
  )

  return (
    <>
      <div className="hidden">
        <div className={cn("flex items-start -mx-20", EXPORT_CLASS.FINANCIAL)}>
          <DisclaimerNote
            companyName={companyName}
            title="Application Summary"
            marginClass="mt-[875px]"
          />
        </div>
      </div>
      <main className={cn("flex flex-col gap-4 md:gap-8")}>{render}</main>
    </>
  )
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
