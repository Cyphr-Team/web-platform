import usePermissions from "@/hooks/usePermissions.ts"
import { BalanceSheetTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpBalanceSheetTemplate"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { ApplicationReviewPdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/ApplicationReviewPdf.tsx"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { LoanReadinessPagePdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/LoanReadinessPagePdf.tsx"
import {
  ExportFPOption,
  getBalanceSheetData,
  getCashFlowData,
  getIncomeStatementData,
  PDFPageOrder
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"
import {
  ForecastPeriod,
  type ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { useQueryGetKybForm } from "@/modules/loan-application/hooks/useQuery/useQueryKybForm.ts"
import { EXPORT_CONFIG } from "@/modules/loan-application/services/pdf-v2.service"
import { get } from "lodash"
import { type FC, type MutableRefObject, useMemo } from "react"
import { useParams } from "react-router-dom"

interface FinancialProjectionPdfProps {
  itemsRef: MutableRefObject<
    Partial<Record<ExportFPOption, HTMLDivElement | null>>
  >
}

export const FinancialProjectionPdf: FC<FinancialProjectionPdfProps> = ({
  itemsRef
}) => {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  const { data: kybData } = useQueryGetKybForm({
    applicationId: applicationId!
  })

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

  const provideRef = (key: ExportFPOption) => (e: HTMLDivElement) => {
    if (itemsRef.current) itemsRef.current[key] = e
  }

  const mapper: {
    [key in ExportFPOption]: (current: number) => JSX.Element
  } = {
    /* Cash Flow Section */
    [ExportFPOption.CASH_FLOW_FORECAST]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.CASH_FLOW_FORECAST)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <FpCashFlowTemplate
          data={getCashFlowData(forecastResults, ForecastPeriod.ANNUALLY)}
          headerProps={{
            title: "Cash Flow",
            data: annuallyTimeStamp
          }}
          layout="default"
          period={ForecastPeriod.ANNUALLY}
        />
      </div>
    ),

    /* Balance Sheet Section */
    [ExportFPOption.BALANCE_SHEET_FORECAST]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.BALANCE_SHEET_FORECAST)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <BalanceSheetTemplate
          data={getBalanceSheetData(forecastResults, ForecastPeriod.ANNUALLY)}
          headerProps={{
            title: "Balance Sheet",
            data: annuallyTimeStamp
          }}
          layout="default"
          period={ForecastPeriod.ANNUALLY}
        />
      </div>
    ),

    /* Income Statement Section */
    [ExportFPOption.INCOME_SHEET_FORECAST]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.INCOME_SHEET_FORECAST)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <IncomeStatementTemplate
          data={getIncomeStatementData(
            forecastResults,
            ForecastPeriod.ANNUALLY
          )}
          headerProps={{
            title: "Income Statement",
            data: annuallyTimeStamp
          }}
          layout="default"
          period={ForecastPeriod.ANNUALLY}
        />
      </div>
    ),
    [ExportFPOption.LOAN_READY_SECTION]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.LOAN_READY_SECTION)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <LoanReadinessPagePdf />
      </div>
    ),
    [ExportFPOption.CASH_FLOW]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.CASH_FLOW)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <FpCashFlowTemplate
          data={getCashFlowData(forecastResults, ForecastPeriod.CURRENT)}
          headerProps={{
            title: "Cash Flow",
            data: currentTimeStamp
          }}
          layout="current"
          period={ForecastPeriod.CURRENT}
          title="Cash Flow Financial Statement"
        />
      </div>
    ),
    [ExportFPOption.BALANCE_SHEET]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.BALANCE_SHEET)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <BalanceSheetTemplate
          data={getBalanceSheetData(forecastResults, ForecastPeriod.CURRENT)}
          headerProps={{
            title: "Balance Sheet",
            data: currentTimeStamp
          }}
          layout="current"
          period={ForecastPeriod.CURRENT}
          title="Balance Sheet Financial Statement"
        />
      </div>
    ),
    [ExportFPOption.INCOME_SHEET]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.INCOME_SHEET)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <IncomeStatementTemplate
          data={getIncomeStatementData(forecastResults, ForecastPeriod.CURRENT)}
          headerProps={{
            title: "Income Statement",
            data: currentTimeStamp
          }}
          layout="current"
          period={ForecastPeriod.CURRENT}
          title="Income Financial Statement"
        />
      </div>
    ),
    [ExportFPOption.APPLICATION_SUMMARY]: (current) => (
      <div key={current} className="flex items-start p-8">
        <ApplicationReviewPdf />
      </div>
    ),
    [ExportFPOption.CHARTS]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.CHARTS)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        Coming Soon
      </div>
    ),
    [ExportFPOption.DISCLAIMER_NOTE]: (current) => (
      <div
        key={current}
        ref={provideRef(ExportFPOption.DISCLAIMER_NOTE)}
        className="flex items-start p-8"
        data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
      >
        <DisclaimerNote
          companyName={kybData?.businessLegalName ?? "N/A"}
          marginClass="mt-[875px]"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {PDFPageOrder.map((key, index) => mapper[key](index + 1))}
    </div>
  )
}
