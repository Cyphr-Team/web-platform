import { BalanceSheetTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpBalanceSheetTemplate"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { LoanReadinessPagePdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/LoanReadinessPagePdf"
import {
  ExportFPOption,
  getBalanceSheetData,
  getCashFlowData,
  getIncomeStatementData,
  PDFPageOrder
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import {
  ForecastPeriod,
  type ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import { EXPORT_CONFIG } from "@/modules/loan-application/services/pdf-v2.service"
import { type FC, type MutableRefObject } from "react"
import { FORECAST_RESULTS } from "@/modules/conference-demo/constants"
import { useFinancialProjectionData } from "@/modules/conference-demo/applicant/stores/useFinancialProjectionData.ts"

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
  /**
   * TODO: update this later in the next PR since it's need more effort
   * */
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
  /**
   * TODO: update this later in the next PR since it's need more effort
   * */
  return <div className="flex items-start p-8">Coming soon</div>
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
  const { annuallyTimeStamp, monthlyTimeStamp } =
    useFinancialProjectionData.use.balanceSheet()

  function provideRef(key: ExportFPOption) {
    return (e: HTMLDivElement) => {
      if (itemsRef.current) itemsRef.current[key] = e
    }
  }

  const sectionProps: SectionProps = {
    forecastResults: FORECAST_RESULTS,
    annuallyTimeStamp,
    currentTimeStamp: [monthlyTimeStamp[0]],
    provideRef,
    companyName: "Cyphrai's Business"
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
