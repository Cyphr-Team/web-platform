import usePermissions from "@/hooks/usePermissions.ts"
import { ExportFPOption } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import {
  BalanceSheetTemplate,
  getBalanceSheetData
} from "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage.tsx"
import {
  FpCashFlowTemplate,
  getCashFlowData
} from "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage.tsx"
import {
  getIncomeStatementData,
  IncomeStatementTemplate
} from "@/modules/loan-application/[module]-financial-projection/components/pages/FpIncomeStatementPage.tsx"
import { ApplicationReviewPdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/ApplicationReviewPdf.tsx"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { LoanReadinessPagePdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/LoanReadinessPagePdf.tsx"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast.ts"
import {
  ForecastPeriod,
  ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast.ts"
import { useQueryGetKybForm } from "@/modules/loan-application/hooks/useQuery/useQueryKybForm.ts"
import { get } from "lodash"
import { FC, MutableRefObject, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useParams } from "react-router-dom"

export const PDFPageOrder = [
  "DISCLAIMER_NOTE",
  "CASH_FLOW_FORECAST",
  "BALANCE_SHEET_FORECAST",
  "INCOME_SHEET_FORECAST",
  "LOAN_READY_SECTION",
  "CASH_FLOW",
  "BALANCE_SHEET",
  "INCOME_SHEET",
  "CHARTS",
  "APPLICATION_SUMMARY"
]

interface FinancialProjectionPdfProps {
  itemsRef: MutableRefObject<Partial<Record<string, HTMLDivElement | null>>>
}

export const FinancialProjectionPdf: FC<FinancialProjectionPdfProps> = ({
  itemsRef
}) => {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  const forms = useFormContext()
  const { getValues } = forms

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
    [key in ExportFPOption]: (total: number, current: number) => JSX.Element
  } = {
    /* Cash Flow Section */
    [ExportFPOption.CASH_FLOW_FORECAST]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.CASH_FLOW_FORECAST)}
      >
        <FpCashFlowTemplate
          data={getCashFlowData(forecastResults, ForecastPeriod.ANNUALLY)}
          layout="default"
          period={ForecastPeriod.ANNUALLY}
          headerProps={{
            title: "Cash Flow",
            data: annuallyTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),

    /* Balance Sheet Section */
    [ExportFPOption.BALANCE_SHEET_FORECAST]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.BALANCE_SHEET_FORECAST)}
      >
        <BalanceSheetTemplate
          layout="default"
          data={getBalanceSheetData(forecastResults, ForecastPeriod.ANNUALLY)}
          period={ForecastPeriod.ANNUALLY}
          headerProps={{
            title: "Balance Sheet",
            data: annuallyTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),

    /* Income Statement Section */
    [ExportFPOption.INCOME_SHEET_FORECAST]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.INCOME_SHEET_FORECAST)}
      >
        <IncomeStatementTemplate
          layout="default"
          data={getIncomeStatementData(
            forecastResults,
            ForecastPeriod.ANNUALLY
          )}
          period={ForecastPeriod.ANNUALLY}
          headerProps={{
            title: "Income Statement",
            data: annuallyTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.LOAN_READY_SECTION]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.LOAN_READY_SECTION)}
      >
        <LoanReadinessPagePdf />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.CASH_FLOW]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.CASH_FLOW)}
      >
        <FpCashFlowTemplate
          title="Cash Flow Financial Statement"
          data={getCashFlowData(forecastResults, ForecastPeriod.CURRENT)}
          layout="current"
          period={ForecastPeriod.CURRENT}
          headerProps={{
            title: "Cash Flow",
            data: currentTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.BALANCE_SHEET]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.BALANCE_SHEET)}
      >
        <BalanceSheetTemplate
          title="Balance Sheet Financial Statement"
          data={getBalanceSheetData(forecastResults, ForecastPeriod.CURRENT)}
          layout="current"
          period={ForecastPeriod.CURRENT}
          headerProps={{
            title: "Balance Sheet",
            data: currentTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.INCOME_SHEET]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.INCOME_SHEET)}
      >
        <IncomeStatementTemplate
          title="Income Financial Statement"
          data={getIncomeStatementData(forecastResults, ForecastPeriod.CURRENT)}
          layout="current"
          period={ForecastPeriod.CURRENT}
          headerProps={{
            title: "Income Statement",
            data: currentTimeStamp
          }}
        />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.APPLICATION_SUMMARY]: (total, current) => (
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.APPLICATION_SUMMARY)}
      >
        <ApplicationReviewPdf />
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.CHARTS]: (total, current) => (
      <div className="flex items-start" ref={provideRef(ExportFPOption.CHARTS)}>
        Coming Soon
        <div className="hidden">
          <FinancialForecastFooter totalPage={total} currentPage={current} />
        </div>
      </div>
    ),
    [ExportFPOption.DISCLAIMER_NOTE]: () => <></>
  }

  const calculatedValue = Object.entries(getValues())
    .filter(([, enable]) => enable)
    .map((value) => value[0] as ExportFPOption)

  return (
    <div className="flex flex-col">
      <div
        className="flex items-start"
        ref={provideRef(ExportFPOption.DISCLAIMER_NOTE)}
      >
        <DisclaimerNote companyName={kybData?.businessLegalName ?? "N/A"} />
      </div>

      {calculatedValue.map((key, index) =>
        mapper[key](calculatedValue.length, index + 1)
      )}
    </div>
  )
}

const FinancialForecastFooter: FC<{
  totalPage: number
  currentPage: number
}> = (props) => {
  const { totalPage, currentPage } = props
  return (
    <div className="flex items-center justify-between border-t-2 px-4 py-2 footer">
      <p>Financial Forecast</p>
      <p>
        Page {currentPage} of {totalPage}
      </p>
    </div>
  )
}
