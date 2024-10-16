import { FolderDownloadIcon } from "@/modules/loan-application/[module]-financial-projection/components/atoms/FolderDownloadIcon.tsx"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import { Separator } from "@/components/ui/separator.tsx"
import { RHFProvider } from "@/modules/form-template/providers"
import { useBoolean } from "@/hooks"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card.tsx"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import ContentTooltip from "@/modules/loan-application/[module]-financial-projection/components/molecules/ContentTooltip.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { getPDF } from "@/modules/loan-application/services/pdf.service.ts"
import { toastError } from "@/utils"
import { useRef } from "react"
import {
  FinancialProjectionPdf,
  PDFPageOrder
} from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/FinancialProjectionPdf.tsx"

export const enum ExportFPOption {
  DISCLAIMER_NOTE = "DISCLAIMER_NOTE",
  CASH_FLOW_FORECAST = "CASH_FLOW_FORECAST",
  BALANCE_SHEET_FORECAST = "BALANCE_SHEET_FORECAST",
  INCOME_SHEET_FORECAST = "INCOME_SHEET_FORECAST",
  LOAN_READY_SECTION = "LOAN_READY_SECTION",
  CASH_FLOW = "CASH_FLOW",
  BALANCE_SHEET = "BALANCE_SHEET",
  INCOME_SHEET = "INCOME_SHEET",
  CHARTS = "CHARTS",
  APPLICATION_SUMMARY = "APPLICATION_SUMMARY"
}

export const Drawer = () => {
  const openDrawer = useBoolean(false)

  const methods = useForm()

  const isExporting = useBoolean(false)

  const elementToExportRef = useRef<Partial<Record<string, HTMLDivElement>>>({})

  const exportToPdf = async () => {
    try {
      openDrawer.onFalse()

      isExporting.onTrue()

      if (elementToExportRef.current) {
        const filteredElement = Object.entries(elementToExportRef.current)
          /**
           * This sort function make sure that the Page is in exactly right order.
           * For example:
           * - Order = [Cash Flow, Balance Sheet, Income Statement]
           * - ElementToSort = [Income Statement, Balance Sheet, Cash Flow]
           *
           * ElementToSort.sort((a, b) => Order.indexOf(a) - Order.indexOf(b))
           * -> [Cash Flow, Balance Sheet, Income Statement]
           *
           * Instead of using priority queue, I'm using index of element as priority
           * */
          .sort(
            (a, b) => PDFPageOrder.indexOf(a[0]) - PDFPageOrder.indexOf(b[0])
          )
          .filter((entry) => entry[1] !== undefined)
          .map((entry) => entry[1]) as HTMLDivElement[]

        const { pdf } = await getPDF(
          filteredElement,
          false,
          filteredElement.map(
            (element) => element.querySelector(".footer") as HTMLDivElement
          )
        )

        pdf.save(`financial_projections_${new Date().valueOf()}.pdf`)
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
    <>
      <div className="text-center">
        <ButtonLoading
          className="text-black shadow-md bg-success-fp hover:bg-[#a1d80b] font-medium rounded-lg text-sm focus:outline-none"
          isLoading={isExporting.value}
          type="button"
          onClick={openDrawer.onToggle}
        >
          <div className="flex gap-2 items-center">
            <FolderDownloadIcon />
            Download reports
          </div>
        </ButtonLoading>
      </div>

      <div
        className={cn(
          "h-screen overflow-y-auto w-96",
          "fixed top-0 right-0 z-40 transition-transform transform bg-white shadow-2xl",
          openDrawer.value ? "translate-x-0" : "translate-x-full"
        )}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
      >
        <div className="h-12 flex items-center justify-between p-8">
          <div className="text-xl font-semibold">Download Reports</div>
          <Button
            type="button"
            onClick={openDrawer.onFalse}
            className="bg-transparent text-black hover:bg-gray-50 rounded-lg text-sm w-8 h-8 cursor-pointer"
          >
            X
          </Button>
        </div>

        <Separator />

        <RHFProvider methods={methods} onSubmit={() => {}}>
          <TooltipProvider delayDuration={500}>
            <div className="p-2 flex flex-col">
              <Card className="p-4 m-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center">
                  <div className="font-semibold">Forecast Reports</div>
                  <ContentTooltip content="5-year projected financial reports based on the data you provided." />
                </div>
                <RHFCheckbox
                  name={ExportFPOption.CASH_FLOW_FORECAST}
                  label="Cash Flow Forecast"
                />
                <RHFCheckbox
                  name={ExportFPOption.BALANCE_SHEET_FORECAST}
                  label="Balance Sheet Forecast"
                />
                <RHFCheckbox
                  name={ExportFPOption.INCOME_SHEET_FORECAST}
                  label="Income Sheet Forecast"
                />
                <RHFCheckbox
                  name={ExportFPOption.LOAN_READY_SECTION}
                  label="Loan Ready"
                />
              </Card>

              <Card className="p-4 m-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center">
                  <div className="font-semibold">Financial Statements</div>
                  <ContentTooltip content="Current month financial statements, generated from your inputs and data." />
                </div>
                <RHFCheckbox
                  name={ExportFPOption.CASH_FLOW}
                  label="Cash Flow"
                />
                <RHFCheckbox
                  name={ExportFPOption.BALANCE_SHEET}
                  label="Balance Sheet"
                />
                <RHFCheckbox
                  name={ExportFPOption.INCOME_SHEET}
                  label="Income Statement"
                />
              </Card>

              {/* HIDE FOR FUTURE USAGE */}
              {/*<Card className="p-4 m-6 flex flex-col gap-y-4">*/}
              {/*  <div className="flex flex-row items-center">*/}
              {/*    <div className="font-semibold">Details</div>*/}
              {/*  </div>*/}
              {/*  <RHFCheckbox name={ExportFPOption.CHARTS} label="Charts" />*/}
              {/*</Card>*/}

              <Card className="p-4 m-6 flex flex-col gap-y-4">
                <div className="flex flex-row items-center">
                  <div className="font-semibold">Application</div>
                </div>
                <RHFCheckbox
                  name={ExportFPOption.APPLICATION_SUMMARY}
                  label="Application Summary"
                />
              </Card>
            </div>
          </TooltipProvider>
          <div className="hidden">
            <FinancialProjectionPdf itemsRef={elementToExportRef} />
          </div>
        </RHFProvider>

        <div className="m-10">
          <Button className="w-full" type="button" onClick={exportToPdf}>
            Download Reports
          </Button>
        </div>
      </div>
    </>
  )
}
