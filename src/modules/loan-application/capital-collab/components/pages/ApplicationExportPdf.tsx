import { useQueryGetLoanSummary } from "@/modules/loan-application-management/hooks/useQuery/useQueryLoanSummary"
import { FinancialProjectionApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/FinancialProjectionApplicationDetails"
import {
  useQueryGetKybForm,
  useQueryGetKybFormV2
} from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import { EXPORT_CONFIG } from "@/modules/loan-application/services/pdf-v2.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { getBusinessName } from "@/utils/kyb.utils"
import { get } from "lodash"
import { type FC, type MutableRefObject, useCallback } from "react"
import { useLocation, useParams } from "react-router-dom"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import {
  ExportFPOption,
  PDFPageOrder
} from "@/modules/loan-application/capital-collab/constants"
import { useGetCapitalCollabApplicantApplicationDetails } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabApplicantApplicationDetails"
import { DisclaimerNote } from "@/modules/loan-application/capital-collab/components/pages/DisclaimerNote"
import { useGetCapitalCollabAdminApplicationDetails } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabAdminApplicationDetails"

interface SectionProps {
  provideRef: (key: ExportFPOption) => (e: HTMLDivElement) => void
  companyName?: string
}

function ApplicantReviewPdf() {
  const { financialApplicationDetailData, isFetching } =
    useGetCapitalCollabApplicantApplicationDetails()

  return (
    <FinancialProjectionApplicationDetail
      isPdf
      financialApplicationDetailData={financialApplicationDetailData}
      isLoading={isFetching}
    />
  )
}

function AdminReviewPdf() {
  const { financialApplicationDetailData, isFetching } =
    useGetCapitalCollabAdminApplicationDetails()

  return (
    <FinancialProjectionApplicationDetail
      isPdf
      financialApplicationDetailData={financialApplicationDetailData}
      isLoading={isFetching}
    />
  )
}

function ApplicationSummarySection(): JSX.Element {
  return (
    <div className="flex items-start p-8">
      <main className="flex w-full flex-col gap-4 md:gap-8">
        {checkIsLoanApplicant() ? <ApplicantReviewPdf /> : <AdminReviewPdf />}
      </main>
    </div>
  )
}

function DisclaimerNoteSection({
  provideRef,
  companyName
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.DISCLAIMER_NOTE)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <DisclaimerNote companyName={companyName ?? "N/A"} />
    </div>
  )
}

const EXPORT_COMPONENTS: { [key in ExportFPOption]: FC<SectionProps> } = {
  [ExportFPOption.APPLICATION_SUMMARY]: ApplicationSummarySection,
  [ExportFPOption.DISCLAIMER_NOTE]: DisclaimerNoteSection
}

interface FinancialProjectionPdfProps {
  itemsRef: MutableRefObject<
    Partial<Record<ExportFPOption, HTMLDivElement | null>>
  >
}

export function ApplicationExportPdf({
  itemsRef
}: FinancialProjectionPdfProps): JSX.Element {
  const { id } = useParams()
  const location = useLocation()
  const applicationId = id ?? location.state?.applicationId

  const { data: kybData } = useQueryGetKybForm({
    applicationId: applicationId,
    enabled: checkIsLoanApplicant()
  })

  const { data: kybDataV2 } = useQueryGetKybFormV2({
    applicationId: applicationId,
    enabled: checkIsLoanApplicant() && isEnableFormV2()
  })

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: applicationId,
    enabled: !checkIsLoanApplicant()
  })

  const getFinalBusinessName = useCallback(() => {
    if (isEnableFormV2() && checkIsLoanApplicant()) {
      return get(kybDataV2, "metadata.businessLegalName") as string
    }

    // If applicant then use Kyb Form data
    if (kybData?.businessLegalName) {
      return kybData?.businessLegalName
    }

    return getBusinessName(loanSummaryQuery.data)
  }, [kybData?.businessLegalName, kybDataV2, loanSummaryQuery.data])

  function provideRef(key: ExportFPOption) {
    return (e: HTMLDivElement) => {
      if (itemsRef.current) itemsRef.current[key] = e
    }
  }

  const sectionProps: SectionProps = {
    provideRef,
    companyName: getFinalBusinessName()
  }

  return (
    <div className="flex flex-col">
      {PDFPageOrder.map((key) => {
        const ExportComponent = EXPORT_COMPONENTS[key]

        return <ExportComponent key={key} {...sectionProps} />
      })}
    </div>
  )
}
