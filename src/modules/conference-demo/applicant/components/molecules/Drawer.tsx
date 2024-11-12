import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { Card } from "@/components/ui/card.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { useBoolean } from "@/hooks"
import { cn } from "@/lib/utils.ts"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { ExportFPOption } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import { useExportToPDF } from "@/modules/loan-application/[module]-financial-projection/hooks/useExportToPDF"
import { FolderDown, X } from "lucide-react"
import { type ReactNode, useMemo } from "react"
import { useForm } from "react-hook-form"
import { FinancialProjectionPdf } from "@/modules/conference-demo/applicant/components/pages/FinancialProjectionPdf.tsx"

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
          "border-gray-600 rounded-[3px] w-5 h-5 data-[state=checked]:bg-gray-600 [&_span_svg]:stroke-[4px]"
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
            },
            { name: ExportFPOption.LOAN_READY_SECTION, label: "Loan Ready" }
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

      <CardSection title="Application">
        <CheckboxGroup
          options={[
            {
              name: ExportFPOption.APPLICATION_SUMMARY,
              label: "Application Summary"
            }
          ]}
        />
      </CardSection>
    </div>
  )
}

export function Drawer() {
  const openDrawer = useBoolean(false)

  const methods = useForm<Record<ExportFPOption, boolean>>({
    defaultValues: {
      [ExportFPOption.DISCLAIMER_NOTE]: true,
      [ExportFPOption.CASH_FLOW_FORECAST]: true,
      [ExportFPOption.BALANCE_SHEET_FORECAST]: true,
      [ExportFPOption.INCOME_SHEET_FORECAST]: true,
      [ExportFPOption.LOAN_READY_SECTION]: true,
      [ExportFPOption.CASH_FLOW]: true,
      [ExportFPOption.BALANCE_SHEET]: true,
      [ExportFPOption.INCOME_SHEET]: true,
      [ExportFPOption.APPLICATION_SUMMARY]: true
    }
  })

  const watchAllFields = methods.watch()

  const isAtLeastOneChecked = useMemo(() => {
    return Object.values(watchAllFields).some((value) => value)
  }, [watchAllFields])

  const { elementToExportRef, exportToPdf, isExporting } = useExportToPDF()

  const onExportToPdf = methods.handleSubmit(async (markedElement) => {
    openDrawer.onToggle()
    await exportToPdf(markedElement)
  })

  return (
    <>
      <div className="ml-2 text-center">
        <ButtonLoading
          className="rounded-lg bg-success-fp text-sm font-medium text-black shadow-md hover:bg-[#a1d80b] focus:outline-none"
          isLoading={isExporting.value}
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
          "h-screen overflow-y-auto w-96 overflow-x-hidden",
          "fixed top-0 right-0 z-40 transition-transform transform bg-white shadow-2xl",
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
          <TooltipProvider delayDuration={200}>
            <DrawerContent />
          </TooltipProvider>
          <div className="hidden">
            <FinancialProjectionPdf itemsRef={elementToExportRef} />
          </div>
        </RHFProvider>

        <div className="m-10">
          <ButtonLoading
            className="w-full"
            disabled={!isAtLeastOneChecked}
            isLoading={isExporting.value}
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
