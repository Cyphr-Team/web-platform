import usePermissions from "@/hooks/usePermissions"
import { useQueryGetLoanSummary } from "@/modules/loan-application-management/hooks/useQuery/useQueryLoanSummary"
import { BalanceSheetTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpBalanceSheetTemplate"
import { FpCashFlowTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpCashFlowTemplate"
import { IncomeStatementTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/FpIncomeStatementTemplate"
import { FinancialProjectionApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/FinancialProjectionApplicationDetails"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { LoanReadinessPagePdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/LoanReadinessPagePdf"
import {
  ExportFPOption,
  getBalanceSheetData,
  getCashFlowData,
  getIncomeStatementData,
  PDFPageOrder
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useAdminFinancialProjectionApplicationDetails } from "@/modules/loan-application/[module]-financial-projection/hooks/details/admin/useAdminFinancialProjectionApplicationDetails"
import { useApplicantFinancialProjectionApplicationDetails } from "@/modules/loan-application/[module]-financial-projection/hooks/details/applicant/useApplicantFinancialProjectionApplicationDetails"
import { useQueryFinancialProjectionForecast } from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryFinancialProjectionForecast"
import {
  ForecastPeriod,
  type ForecastResultsResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-projection-forecast"
import {
  useQueryGetKybForm,
  useQueryGetKybFormV2
} from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import { EXPORT_CONFIG } from "@/modules/loan-application/services/pdf-v2.service"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { getBusinessName } from "@/utils/kyb.utils"
import { get } from "lodash"
import { type FC, type MutableRefObject, useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import {
  isEnableFormV2,
  isEnableHistoricalFinancialsEnrichment
} from "@/utils/feature-flag.utils.ts"
import { useQueryGetApplicationSummary } from "@/modules/loan-application-management/hooks/useQuery/useQueryApplicationSummary.ts"
import { useQueryHistoricalStatement } from "@/modules/loan-application/[module]-data-enrichment/hooks/useQueryHistoricalStatement.ts"
import { type HistoricalIncomeStatementByDate } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { groupDataByProp } from "@/modules/loan-application/[module]-data-enrichment/services/historical-statement.service.ts"
import { type HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"
import { HistoricalIncomeStatementPdfTemplate } from "@/modules/loan-application/[module]-data-enrichment/components/templates/HistoricalIncomeStatementPdfTemplate.tsx"
import { useFormContext } from "react-hook-form"

interface SectionProps {
  forecastResults: ForecastResultsResponse
  historicalIncomeStatementTimeStamp: Record<string, Date[]>
  historicalIncomeStatementDataByYears: Record<
    string,
    HistoricalStatementDataRow
  >
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

function HistoricalIncomeStatementSection({
  historicalIncomeStatementDataByYears,
  historicalIncomeStatementTimeStamp
}: SectionProps): JSX.Element {
  return (
    <div
      className="flex flex-col p-8 gap-8 items-center"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <HistoricalIncomeStatementPdfTemplate
        historicalIncomeStatementDataByYears={
          historicalIncomeStatementDataByYears
        }
        historicalIncomeStatementTimeStamp={historicalIncomeStatementTimeStamp}
      />
    </div>
  )
}

function ApplicantReviewPdf() {
  const { financialApplicationDetailData, isFetching } =
    useApplicantFinancialProjectionApplicationDetails()

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
    useAdminFinancialProjectionApplicationDetails()

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
  const methods = useFormContext<Record<ExportFPOption, boolean>>()

  const markedElements = Object.entries(methods.getValues())
    .filter(([_, value]) => value)
    .map(([key]) => key as ExportFPOption)

  return (
    <div
      ref={provideRef(ExportFPOption.DISCLAIMER_NOTE)}
      className="flex items-start p-8"
      data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
    >
      <DisclaimerNote
        companyName={companyName ?? "N/A"}
        noteKeys={markedElements}
      />
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
  [ExportFPOption.DISCLAIMER_NOTE]: DisclaimerNoteSection,
  [ExportFPOption.HISTORICAL_INCOME_STATEMENT]: HistoricalIncomeStatementSection
}

/**
 * Get the count of historical statement data by year
 *
 * @return Record<number, number>
 * Example return: {
 *    "2021": 2,
 *    ...
 *  }
 *
 * @param data The HistoricalStatement grouped by date
 * Example param:
 * data: [
 *  {
 *    "date": "2021-01-01",
 *    "revenue": 6368,
 *   },
 *   {
 *    "date": "2021-02-01",
 *    "revenue": 6368,
 *   }, ...
 * ]
 */
function getHistoricalStatementYearCount(
  data: HistoricalIncomeStatementByDate[]
) {
  const incomeStatementYearCounts: Record<number, number> = {}

  data.forEach((data: HistoricalIncomeStatementByDate) => {
    const year = new Date(data.date).getFullYear()

    incomeStatementYearCounts[year] = incomeStatementYearCounts[year]
      ? incomeStatementYearCounts[year] + 1
      : 1
  })

  return incomeStatementYearCounts
}

/**
 * Slices the values of each property in a historical statement data row
 * by the count of entries for each year and groups them by year.
 * @param groupedData
 *        Example param:
 *        {
 *          "revenue": [100, 200, 300, 6368],
 *          "costOfGoodsSold": [100, 200, 300, 6368],
 *          ...
 *        }
 * @param entryCountsByYear
 *        Example param:
 *        {
 *          "2021": 1,
 *          "2022: 2,
 *          "2024": 1,
 *          ...
 *        }
 * @return Record<string, HistoricalStatementDataRow>
 *      Example return:
 *      {
 *        "2021": {
 *          "revenue": [100],
 *          "costOfGoodsSold": [100],
 *          ...
 *        },
 *        "2022": {
 *          "revenue": [200, 300],
 *          "costOfGoodsSold": [200, 300],
 *          ...
 *        },
 *        "2024": {
 *          "revenue": [6368],
 *          "costOfGoodsSold": [6368],
 *          ...
 *        },
 *      ...
 *      }
 */
function sliceHistoricalDataByYearCount(
  groupedData: HistoricalStatementDataRow,
  entryCountsByYear: Record<number, number>
): Record<string, HistoricalStatementDataRow> {
  const slicedDataByYear: Record<string, HistoricalStatementDataRow> = {}

  // Iterate through the entry counts by year
  for (const [year, count] of Object.entries(entryCountsByYear)) {
    // Iterate through the grouped data and slice the data array to the specified count for the current year
    Object.entries(groupedData).map(([key, values]) => {
      slicedDataByYear[year] = {
        ...slicedDataByYear[year],
        [key]: values.slice(0, count)
      }
    })
  }

  return slicedDataByYear
}

export function FinancialProjectionPdf({
  itemsRef
}: FinancialProjectionPdfProps): JSX.Element {
  const { id: applicationId } = useParams()
  const { isWorkspaceAdmin } = usePermissions()

  const { data: kybData } = useQueryGetKybForm({
    applicationId: applicationId!,
    enabled: checkIsLoanApplicant() && !isEnableFormV2()
  })

  const { data: kybDataV2 } = useQueryGetKybFormV2({
    applicationId: applicationId!,
    enabled: checkIsLoanApplicant() && isEnableFormV2()
  })

  const loanSummaryQuery = useQueryGetLoanSummary({
    applicationId: applicationId,
    enabled: !checkIsLoanApplicant() && !isEnableFormV2()
  })

  const loanSummaryDataV2 = useQueryGetApplicationSummary({
    applicationId: applicationId,
    enabled: !checkIsLoanApplicant() && isEnableFormV2()
  })

  const getFinalBusinessName = useCallback(() => {
    if (isEnableFormV2()) {
      if (checkIsLoanApplicant()) {
        return get(kybDataV2, "metadata.businessLegalName") as string
      }

      return loanSummaryDataV2?.data?.businessInfo?.businessName?.value
    }

    // If applicant then use Kyb Form data
    if (kybData?.businessLegalName) {
      return kybData?.businessLegalName
    }

    return getBusinessName(loanSummaryQuery.data)
  }, [
    kybData?.businessLegalName,
    kybDataV2,
    loanSummaryDataV2?.data?.businessInfo?.businessName,
    loanSummaryQuery.data
  ])

  const { data } = useQueryFinancialProjectionForecast({
    applicationId: applicationId!,
    enabled: !!applicationId,
    isWorkspaceAdmin
  })

  const { data: historicalStatement } = useQueryHistoricalStatement({
    applicationId: applicationId!,
    enabled: !!applicationId && isEnableHistoricalFinancialsEnrichment()
  })

  const forecastResults = useMemo(
    () => data ?? ({} as ForecastResultsResponse),
    [data]
  )
  const historicalIncomeStatementData = useMemo(
    () => historicalStatement,
    [historicalStatement]
  )

  const groupedIncomeStatementByYear = useMemo(() => {
    // Count the number of entries for each year
    const yearEntryCounts: Record<number, number> =
      getHistoricalStatementYearCount(
        historicalIncomeStatementData?.incomeStatement ?? []
      )

    // Group the income statement data by their property keys
    const groupedIncomeStatementData = groupDataByProp(
      historicalIncomeStatementData?.incomeStatement ?? []
    )

    // Sliced the data by the count of entries for each year
    return sliceHistoricalDataByYearCount(
      groupedIncomeStatementData,
      yearEntryCounts
    )
  }, [historicalIncomeStatementData?.incomeStatement])

  const historicalIncomeStatementDateMappedByYears = useMemo(() => {
    return Object.keys(groupedIncomeStatementByYear)?.reduce<
      Record<string, Date[]>
    >((acc, year) => {
      // Filter items matching the current year
      const filteredDates = historicalIncomeStatementData?.incomeStatement
        ?.filter((item: HistoricalIncomeStatementByDate) => {
          const itemYear = new Date(item.date).getFullYear()

          return itemYear === Number(year)
        })
        // Map only date item
        ?.map((item: HistoricalIncomeStatementByDate) => new Date(item.date))

      // Assign the filtered and mapped dates to the accumulator
      acc[year] = filteredDates ?? []

      return acc
    }, {})
  }, [
    historicalIncomeStatementData?.incomeStatement,
    groupedIncomeStatementByYear
  ])

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
    historicalIncomeStatementTimeStamp:
      historicalIncomeStatementDateMappedByYears,
    historicalIncomeStatementDataByYears: groupedIncomeStatementByYear,
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
