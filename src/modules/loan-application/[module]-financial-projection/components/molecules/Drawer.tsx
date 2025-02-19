import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { Card } from "@/components/ui/card.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils.ts"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { FinancialProjectionPdf } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/FinancialProjectionPdf.tsx"
import { ExportFPOption } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useExportToPDF } from "@/modules/loan-application/[module]-financial-projection/hooks/useExportToPDF"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { QUERY_KEY as FINANCIAL_QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key.ts"
import { QUERY_KEY as APPLICATION_MANAGEMENT_QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { useIsFetching } from "@tanstack/react-query"
import { FolderDown, X } from "lucide-react"
import { type ReactNode, useMemo } from "react"
import { useForm } from "react-hook-form"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { isEnableHistoricalFinancialsEnrichment } from "@/utils/feature-flag.utils.ts"
import { HISTORICAL_FINANCIALS_QUERY_KEY } from "@/modules/loan-application/[module]-data-enrichment/constants/query-key.ts"
import { useApplicantFinancialProjectionApplicationDetails } from "../../hooks/details/applicant/useApplicantFinancialProjectionApplicationDetails"
import { useDownloadESignDocument } from "@/modules/loan-application/hooks/form-esign/useDownloadESignDocument"
import { useGetESignDocument } from "@/modules/loan-application/hooks/form-esign/useGetESignDocument"

interface DrawerCheckBoxProps {
  name: ExportFPOption
  label: string
}

interface CardSectionProps {
  title: string
  tooltipContent?: string
  children: ReactNode
}

interface CheckboxOption {
  name: ExportFPOption
  label: string
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
}

function DrawerCheckBox({ name, label }: DrawerCheckBoxProps) {
  return (
    <RHFCheckbox
      className="space-x-0"
      label={label}
      name={name}
      styleProps={{
        checkboxClassName:
          "border-[#D0D5DD] rounded-[3px] size-5 data-[state=checked]:bg-[#4F6161] data-[state=checked]:border-[#4F6161] [&_span_svg]:stroke-[4px]"
      }}
    />
  )
}

function CardSection({ title, tooltipContent, children }: CardSectionProps) {
  return (
    <Card className="m-6 flex flex-col gap-y-4 p-4 shadow-none">
      <div className="flex flex-row items-center">
        <div className="font-semibold">{title}</div>
        {tooltipContent ? <ContentTooltip content={tooltipContent} /> : null}
      </div>
      {children}
    </Card>
  )
}

function CheckboxGroup({ options }: CheckboxGroupProps) {
  return (
    <>
      {options.map((option) => (
        <DrawerCheckBox
          key={option.name}
          label={option.label}
          name={option.name}
        />
      ))}
    </>
  )
}

function DrawerContent() {
  return (
    <div className="flex flex-col p-2">
      <CardSection title="Assessment">
        <CheckboxGroup
          options={[
            {
              name: ExportFPOption.APPLICATION_SUMMARY,
              label: "Assessment Summary"
            }
          ]}
        />
      </CardSection>

      <CardSection title="LoanReady">
        <CheckboxGroup
          options={[
            { name: ExportFPOption.LOAN_READY_SECTION, label: "LoanReady" }
          ]}
        />
      </CardSection>

      <CardSection
        title="Forecast Reports"
        tooltipContent="5-year projected financial reports based on the data you provided."
      >
        <CheckboxGroup
          options={[
            {
              name: ExportFPOption.CASH_FLOW_FORECAST,
              label: "Cash Flow Forecast"
            },
            {
              name: ExportFPOption.BALANCE_SHEET_FORECAST,
              label: "Balance Sheet Forecast"
            },
            {
              name: ExportFPOption.INCOME_SHEET_FORECAST,
              label: "Income Sheet Forecast"
            }
          ]}
        />
      </CardSection>

      <CardSection
        title="Financial Statements"
        tooltipContent="Current month financial statements, generated from your inputs and data."
      >
        <CheckboxGroup
          options={[
            { name: ExportFPOption.CASH_FLOW, label: "Cash Flow" },
            { name: ExportFPOption.BALANCE_SHEET, label: "Balance Sheet" },
            { name: ExportFPOption.INCOME_SHEET, label: "Income Statement" }
          ]}
        />
      </CardSection>

      {isEnableHistoricalFinancialsEnrichment() && (
        <CardSection
          title="Historical Financial Statements"
          tooltipContent="Past financial performance, based on data from your connected Plaid account and the way you've categorized your transactions."
        >
          <CheckboxGroup
            options={[
              {
                name: ExportFPOption.HISTORICAL_INCOME_STATEMENT,
                label: "Income Statement"
              }
            ]}
          />
        </CardSection>
      )}
    </div>
  )
}

function BasicApplicationDrawerContent() {
  return (
    <div className="flex flex-col p-2">
      <CardSection title="Assessment">
        <CheckboxGroup
          options={[
            {
              name: ExportFPOption.APPLICATION_SUMMARY,
              label: "Assessment Summary"
            }
          ]}
        />
      </CardSection>

      <CardSection title="LoanReady">
        <CheckboxGroup
          options={[
            { name: ExportFPOption.LOAN_READY_SECTION, label: "LoanReady" }
          ]}
        />
      </CardSection>
    </div>
  )
}

interface DrawerProps {
  applicationPlan?: LoanReadyPlanEnum
}

export function Drawer({ applicationPlan }: DrawerProps) {
  const openDrawer = useBoolean(false)

  const methods = useForm<Record<ExportFPOption, boolean>>()

  const { loanApplicationDetailsQuery } =
    useApplicantFinancialProjectionApplicationDetails()

  const downloadESignMutate = useDownloadESignDocument()
  const { isLoading: isLoadingDocument, data: document } = useGetESignDocument({
    applicationId: loanApplicationDetailsQuery?.data?.id,
    enabled: !!loanApplicationDetailsQuery?.data?.id
  })

  const watchAllFields = methods.watch()

  const isAtLeastOneChecked = useMemo(() => {
    return Object.values(watchAllFields).some((value) => value)
  }, [watchAllFields])

  const { elementToExportRef, exportToPdf, isExporting } = useExportToPDF()

  /**
   * Handles downloading the required files based on the assessment checkbox status.
   *
   * - Since the export contains financial projection data, downloading a PDF with the applicant's signature
   *   (which they never saw) is not appropriate. Additionally, PandaDoc prevents this action.
   * - Workaround:
   *   - Download two files: A report (PDF) & the signature file from PandaDoc.
   *   - If ONLY the assessment checkbox is checked: Download only the signature file from PandaDoc.
   *   - If the assessment checkbox is not checked: Download only the report (PDF).
   *   - If the asssessment checkbox and another types are checked: Download both the report (PDF) and the signature file from PandaDoc.
   * @author Khoa Nguyen
   */
  const onExportToPdf = methods.handleSubmit(async (markedElement) => {
    openDrawer.onToggle()

    const isOnlyApplicationSummaryTrue = Object.entries(markedElement).every(
      ([key, value]) =>
        key === ExportFPOption.APPLICATION_SUMMARY ? value : !value
    )

    const isApplicationSummaryAndAnother =
      markedElement[ExportFPOption.APPLICATION_SUMMARY] &&
      Object.values(markedElement).filter((value) => value).length > 1

    // If ONLY the assessment checkbox is checked: Download only the signature file from PandaDoc.
    if (isOnlyApplicationSummaryTrue) {
      if (document) {
        downloadESignMutate.mutate(document)

        return
      }
    }

    //  If the asssessment checkbox and another types are checked: Download both the report (PDF) and the signature file from PandaDoc.
    if (isApplicationSummaryAndAnother) {
      if (document) {
        downloadESignMutate.mutate(document)
      }
    }

    await exportToPdf(
      markedElement,
      loanApplicationDetailsQuery?.data?.updatedAt
    )
  })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetchingFinancial = useIsFetching({
    queryKey: [FINANCIAL_QUERY_KEY.GET_FORECAST_DATA]
  })

  const isFetchingLoanReadiness = useIsFetching({
    queryKey: [APPLICATION_MANAGEMENT_QUERY_KEY.GET_LOAN_READINESS_ASSESSMENT]
  })

  const isFetchingLoanSummary = useIsFetching({
    queryKey: [APPLICATION_MANAGEMENT_QUERY_KEY.GET_LOAN_SUMMARY]
  })

  const isFetchingHistoricalFinancials = useIsFetching({
    queryKey: [
      HISTORICAL_FINANCIALS_QUERY_KEY.GET_HISTORICAL_FINANCIAL_STATEMENTS
    ]
  })

  /**
   * Note:
   * - Usually the LoanReadiness is the heaviest because its depend on 3rd party.
   * Its mean we can rely on it, its mean all the detail is already fetched before it
   */
  const isFetchingPdfData = !!(
    isFetchingBankAccounts ||
    isFetchingFinancial ||
    isFetchingLoanReadiness ||
    isFetchingLoanSummary ||
    isLoadingDocument ||
    downloadESignMutate.isPending ||
    (isEnableHistoricalFinancialsEnrichment() && isFetchingHistoricalFinancials)
  )

  const drawerContent =
    applicationPlan === LoanReadyPlanEnum.BASIC ? (
      <BasicApplicationDrawerContent />
    ) : (
      <DrawerContent />
    )

  return (
    <>
      <div className="ml-2 text-center">
        <ButtonLoading
          className="rounded-lg bg-success-fp text-sm font-medium text-black shadow-md hover:bg-[#a1d80b] focus:outline-none"
          isLoading={
            isExporting.value ||
            isLoadingDocument ||
            downloadESignMutate.isPending
          }
          type="button"
          onClick={openDrawer.onToggle}
        >
          <div className="flex items-center gap-2">
            <FolderDown className="w-4" />
            Download reports
          </div>
        </ButtonLoading>
      </div>

      <div
        aria-labelledby="drawer-right-label"
        className={cn(
          "h-screen w-96 overflow-y-auto overflow-x-hidden",
          "fixed right-0 top-0 z-40 bg-white shadow-2xl transition-transform",
          openDrawer.value ? "translate-x-0" : "translate-x-full"
        )}
        tabIndex={-1}
      >
        <div className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-white p-8">
          <div className="text-xl font-semibold">Download Reports</div>
          <Button
            className="cursor-pointer rounded-lg bg-transparent text-black hover:bg-gray-50"
            type="button"
            onClick={openDrawer.onFalse}
          >
            <X className="w-5" strokeWidth={2.5} />
          </Button>
        </div>

        <RHFProvider methods={methods}>
          <TooltipProvider delayDuration={200}>{drawerContent}</TooltipProvider>
          <div className="hidden">
            <FinancialProjectionPdf itemsRef={elementToExportRef} />
          </div>
        </RHFProvider>

        <div className="m-10">
          <ButtonLoading
            className="w-full"
            disabled={!isAtLeastOneChecked || isFetchingPdfData}
            isLoading={isExporting.value || isFetchingPdfData}
            type="button"
            onClick={onExportToPdf}
          >
            Download report
          </ButtonLoading>
        </div>
      </div>
    </>
  )
}
