import { useBoolean } from "@/hooks"
import {
  ExportFPOption,
  generateFooterTitleInPDFFirstPage,
  PDFPageOrder,
  PDFPageOrientation,
  PdfPageOrientationMapper
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-helpers"
import {
  EXPORT_CLASS,
  generatePDF
} from "@/modules/loan-application/services/pdf-v2.service"
import { toastError } from "@/utils"
import { formatPDFDate } from "@/utils/date.utils"
import { useRef } from "react"

type ElementRef = Partial<Record<ExportFPOption, HTMLDivElement>>
type ElementsToExport = {
  htmlElement: HTMLDivElement
  pageOrientation?: PDFPageOrientation
  type?: keyof typeof ExportFPOption
}[]

export const useExportToPDF = () => {
  const isExporting = useBoolean(false)

  const elementToExportRef = useRef<ElementRef>({})

  const sortAndFilterElements = (
    elements: ElementRef,
    markedElement: Record<ExportFPOption, boolean>
  ): ElementsToExport => {
    return Object.entries(elements)
      .sort(
        (a, b) =>
          PDFPageOrder.indexOf(a[0] as ExportFPOption) -
          PDFPageOrder.indexOf(b[0] as ExportFPOption)
      )
      .filter(
        ([key, element]) =>
          element &&
          (markedElement[key as ExportFPOption] ||
            key === ExportFPOption.DISCLAIMER_NOTE)
      )
      .map(([key, element]) => ({
        htmlElement: element,
        pageOrientation:
          PdfPageOrientationMapper[key as ExportFPOption] ??
          PDFPageOrientation.PORTRAIT,
        type: key as keyof typeof ExportFPOption
      }))
  }

  const getElementsExportWithOnlyAssessmentSummaryAndLoanReady = (
    elements: ElementRef,
    financialElements: ElementsToExport
  ) => {
    const allElements = [
      {
        htmlElement: elements[ExportFPOption.DISCLAIMER_NOTE],
        pageOrientation:
          PdfPageOrientationMapper[
            ExportFPOption.DISCLAIMER_NOTE as ExportFPOption
          ] ?? PDFPageOrientation.PORTRAIT,
        type: ExportFPOption.DISCLAIMER_NOTE
      },
      ...financialElements
    ]

    return [
      ...allElements,

      {
        htmlElement: elements[ExportFPOption.LOAN_READY_SECTION],
        pageOrientation:
          PdfPageOrientationMapper[
            ExportFPOption.LOAN_READY_SECTION as ExportFPOption
          ] ?? PDFPageOrientation.PORTRAIT,
        type: ExportFPOption.LOAN_READY_SECTION
      }
    ]
  }

  const getElementsByExportClass = (
    exportClass: EXPORT_CLASS
  ): HTMLDivElement[] =>
    [...document.getElementsByClassName(exportClass)] as HTMLDivElement[]

  const exportToPdf = async (
    markedElement: Record<ExportFPOption, boolean>,
    customDate?: string,
    isReturnBlob?: boolean
  ) => {
    try {
      isExporting.onTrue()

      if (!elementToExportRef.current) {
        throw new Error("Export elements not found")
      }

      const filteredElements = sortAndFilterElements(
        elementToExportRef.current,
        markedElement
      )

      const financialElements: ElementsToExport = (
        markedElement[ExportFPOption.APPLICATION_SUMMARY]
          ? getElementsByExportClass(EXPORT_CLASS.FINANCIAL)
          : []
      ).map((el) => ({
        htmlElement: el,
        pageOrientation:
          PdfPageOrientationMapper[ExportFPOption.APPLICATION_SUMMARY],
        type: ExportFPOption.APPLICATION_SUMMARY
      }))

      const historicalFinancialElements: ElementsToExport = (
        markedElement[ExportFPOption.HISTORICAL_INCOME_STATEMENT]
          ? getElementsByExportClass(EXPORT_CLASS.HISTORICAL_FINANCIALS)
          : []
      ).map((el) => ({
        htmlElement: el,
        pageOrientation:
          PdfPageOrientationMapper[ExportFPOption.HISTORICAL_INCOME_STATEMENT],
        type: ExportFPOption.HISTORICAL_INCOME_STATEMENT
      }))

      const isOnlyApplicationSummaryAndLoanReady = Object.entries(
        markedElement
      ).every(([key, value]) =>
        key === ExportFPOption.APPLICATION_SUMMARY ||
        key === ExportFPOption.LOAN_READY_SECTION
          ? value
          : !value
      )

      const allElements = isOnlyApplicationSummaryAndLoanReady
        ? getElementsExportWithOnlyAssessmentSummaryAndLoanReady(
            elementToExportRef.current,
            financialElements
          )
        : [
            ...filteredElements,
            ...financialElements,
            ...historicalFinancialElements
          ]

      const formatedDate = customDate ? new Date(customDate) : new Date()

      // Format date in footer
      const { pdf } = await generatePDF({
        elements: allElements
          .filter((el) => el.htmlElement !== undefined)
          .map((el) => ({
            htmlElement: el.htmlElement as HTMLElement,
            pageOrientation: el.pageOrientation,
            type: el?.type
          })),
        markedElements: markedElement,
        footerRightTextInFirstPage: formatPDFDate(formatedDate),
        footerLeftTextInFirstPage: generateFooterTitleInPDFFirstPage()
      })

      // Return blob if isReturnBlob is true
      if (isReturnBlob) {
        return pdf.output("blob")
      }

      // Format date in name of file
      pdf.save(`financial_projections_${formatPDFDate(formatedDate)}.pdf`)
    } catch (error) {
      toastError({
        title: "Something went wrong!",
        description: "Download PDF failed, please try again later!"
      })
    } finally {
      isExporting.onFalse()
    }
  }

  return { elementToExportRef, exportToPdf, isExporting }
}
