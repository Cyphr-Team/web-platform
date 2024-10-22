import usePermissions from "@/hooks/usePermissions"
import { useQueryGetLoanSummary } from "@/modules/loan-application-management/hooks/useQuery/useQueryLoanSummary"
import { BalanceSheetTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpBalanceSheetTemplate"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import {
  AdminApplicationReviewPdf,
  ApplicationReviewPdf
} from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/ApplicationReviewPdf"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { LoanReadinessPagePdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/LoanReadinessPagePdf"
import {
  ExportFPOption,
  getBalanceSheetData,
  getCashFlowData,
  getIncomeStatementData,
  PDFPageOrder
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast"
import {
  ForecastPeriod,
  type ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import { useQueryGetKybForm } from "@/modules/loan-application/hooks/useQuery/useQueryKybForm"
import { EXPORT_CONFIG } from "@/modules/loan-application/services/pdf-v2.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { getBusinessName } from "@/utils/kyb.utils"
import { get } from "lodash"
import { type FC, type MutableRefObject, useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"

interface SectionProps {
  forecastResults: ForecastResultsResponse
  annuallyTimeStamp: Date[]
  currentTimeStamp: Date[]
  provideRef: (key: ExportFPOption) => (e: HTMLDivElement) => void
  companyName?: string
}

function CashFlowForecastSection({
  forecastResults,
  annuallyTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.CASH_FLOW_FORECAST)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <FpCashFlowTemplate
        data={getCashFlowData(forecastResults, ForecastPeriod.ANNUALLY)}
        headerProps={{ title: "Cash Flow", data: annuallyTimeStamp }}
        layout="default"
        period={ForecastPeriod.ANNUALLY}
      />
    </div>
  )
}

function BalanceSheetForecastSection({
  forecastResults,
  annuallyTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.BALANCE_SHEET_FORECAST)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <BalanceSheetTemplate
        data={getBalanceSheetData(forecastResults, ForecastPeriod.ANNUALLY)}
        headerProps={{ title: "Balance Sheet", data: annuallyTimeStamp }}
        layout="default"
        period={ForecastPeriod.ANNUALLY}
      />
    </div>
  )
}

function IncomeSheetForecastSection({
  forecastResults,
  annuallyTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.INCOME_SHEET_FORECAST)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <IncomeStatementTemplate
        data={getIncomeStatementData(forecastResults, ForecastPeriod.ANNUALLY)}
        headerProps={{ title: "Income Statement", data: annuallyTimeStamp }}
        layout="default"
        period={ForecastPeriod.ANNUALLY}
      />
    </div>
  )
}

function LoanReadinessSection({ provideRef }: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.LOAN_READY_SECTION)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <LoanReadinessPagePdf />
    </div>
  )
}

function CashFlowSection({
  forecastResults,
  currentTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.CASH_FLOW)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <FpCashFlowTemplate
        data={getCashFlowData(forecastResults, ForecastPeriod.CURRENT)}
        headerProps={{ title: "Cash Flow", data: currentTimeStamp }}
        layout="current"
        period={ForecastPeriod.CURRENT}
        title="Cash Flow Financial Statement"
      />
    </div>
  )
}

function BalanceSheetSection({
  forecastResults,
  currentTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.BALANCE_SHEET)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <BalanceSheetTemplate
        data={getBalanceSheetData(forecastResults, ForecastPeriod.CURRENT)}
        headerProps={{ title: "Balance Sheet", data: currentTimeStamp }}
        layout="current"
        period={ForecastPeriod.CURRENT}
        title="Balance Sheet Financial Statement"
      />
    </div>
  )
}

function IncomeSheetSection({
  forecastResults,
  currentTimeStamp,
  provideRef
}: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.INCOME_SHEET)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <IncomeStatementTemplate
        data={getIncomeStatementData(forecastResults, ForecastPeriod.CURRENT)}
        headerProps={{ title: "Income Statement", data: currentTimeStamp }}
        layout="current"
        period={ForecastPeriod.CURRENT}
        title="Income Financial Statement"
      />
    </div>
  )
}

function ApplicationSummarySection(): JSX.Element {
  return (
    <div className="flex items-start p-8">
      {checkIsLoanApplicant() ? (
        <ApplicationReviewPdf />
      ) : (
        <AdminApplicationReviewPdf />
      )}
    </div>
  )
}

function ChartsSection({ provideRef }: SectionProps): JSX.Element {
  return (
    <div
      ref={provideRef(ExportFPOption.CHARTS)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      Coming Soon
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

interface FinancialProjectionPdfProps {
  itemsRef: MutableRefObject<
    Partial<Record<ExportFPOption, HTMLDivElement | null>>
  >
}

const EXPORT_COMPONENTS: { [key in ExportFPOption]: FC<SectionProps> } = {
  [ExportFPOption.CASH_FLOW_FORECAST]: CashFlowForecastSection,
  [ExportFPOption.BALANCE_SHEET_FORECAST]: BalanceSheetForecastSection,
  [ExportFPOption.INCOME_SHEET_FORECAST]: IncomeSheetForecastSection,
  [ExportFPOption.LOAN_READY_SECTION]: LoanReadinessSection,
  [ExportFPOption.CASH_FLOW]: CashFlowSection,
  [ExportFPOption.BALANCE_SHEET]: BalanceSheetSection,
  [ExportFPOption.INCOME_SHEET]: IncomeSheetSection,
  [ExportFPOption.APPLICATION_SUMMARY]: ApplicationSummarySection,
  [ExportFPOption.CHARTS]: ChartsSection,
  [ExportFPOption.DISCLAIMER_NOTE]: DisclaimerNoteSection
}

export function FinancialProjectionPdf({
  itemsRef
}: FinancialProjectionPdfProps): JSX.Element {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  const { data: kybData } = useQueryGetKybForm({
    applicationId: applicationId!,
    enabled: checkIsLoanApplicant()
  })

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: applicationId,
    enabled: !checkIsLoanApplicant()
  })

  const getFinalBusinessName = useCallback(() => {
    // If applicant then use Kyb Form data
    if (kybData?.businessLegalName) {
      return kybData?.businessLegalName
    }

    return getBusinessName(loanSummaryQuery.data)
  }, [kybData?.businessLegalName, loanSummaryQuery.data])

  const { data } = useQueryFinancialProjectionForecast({
    applicationId: applicationId!,
    enabled: !!applicationId,
    isWorkspaceAdmin
  })

  const forecastResults = useMemo(
    () => data ?? ({} as ForecastResultsResponse),
    [data]
  )

  const annuallyTimeStamp = useMemo(
    () =>
      get(
        forecastResults,
        "balanceSheetForecastAnnually[0].forecastData",
        []
      ).map((entry) => new Date(entry.forecastDate)),
    [forecastResults]
  )

  const currentTimeStamp = useMemo(
    () => [
      get(
        forecastResults,
        "balanceSheetForecastAnnually[0].forecastData",
        []
      ).map((entry) => new Date(entry.forecastDate))[0]
    ],
    [forecastResults]
  )

  function provideRef(key: ExportFPOption) {
    return (e: HTMLDivElement) => {
      if (itemsRef.current) itemsRef.current[key] = e
    }
  }

  const sectionProps: SectionProps = {
    forecastResults,
    annuallyTimeStamp,
    currentTimeStamp,
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
