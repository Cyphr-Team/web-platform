import { ButtonLoading, type buttonVariants } from "@/components/ui/button"
import { useIsFetching } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { QUERY_KEY as APPLICATION_MANAGEMENT_QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { ExportFPOption } from "@/modules/loan-application/capital-collab/constants"
import { useExportToPDF } from "@/modules/loan-application/capital-collab/hooks/useExportToPDF"
import { ApplicationExportPdf } from "@/modules/loan-application/capital-collab/components/pages/ApplicationExportPdf"
import { type VariantProps } from "class-variance-authority"

export interface ApplicationDownloadButtonProps {
  className?: string
  variant?: VariantProps<typeof buttonVariants>
  children: React.ReactNode
}

export function ApplicationDownloadButton({
  className,
  variant,
  children
}: ApplicationDownloadButtonProps) {
  const methods = useForm<Record<ExportFPOption, boolean>>()

  const { elementToExportRef, exportToPdf, isExporting } = useExportToPDF()

  const onExportToPdf = methods.handleSubmit(async (markedElement) => {
    await exportToPdf({
      ...markedElement,
      [ExportFPOption.APPLICATION_SUMMARY]: true
    })
  })

  const isFetchingLoanSummary = useIsFetching({
    queryKey: [APPLICATION_MANAGEMENT_QUERY_KEY.GET_LOAN_SUMMARY]
  })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetchingPDFData =
    isFetchingLoanSummary > 0 || isFetchingBankAccounts > 0

  return (
    <div className="ml-2 text-center">
      <div className="hidden">
        <ApplicationExportPdf itemsRef={elementToExportRef} />
      </div>
      <ButtonLoading
        className={className}
        disabled={isFetchingPDFData}
        isLoading={isExporting.value}
        type="button"
        variant={variant?.variant}
        onClick={onExportToPdf}
      >
        {children}
      </ButtonLoading>
    </div>
  )
}
