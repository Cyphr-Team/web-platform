import { useBoolean } from "@/hooks"
import {
  ExportFPOption,
  PDFPageOrder
} from "@/modules/loan-application/capital-collab/constants"
import {
  EXPORT_CLASS,
  generatePDF
} from "@/modules/loan-application/services/pdf-v2.service"
import { toastError } from "@/utils"
import { useRef } from "react"

type ElementRef = Partial<Record<ExportFPOption, HTMLDivElement>>

export const useExportToPDF = () => {
  const isExporting = useBoolean(false)

  const elementToExportRef = useRef<ElementRef>({})

  const sortAndFilterElements = (
    elements: ElementRef,
    markedElement: Record<ExportFPOption, boolean>
  ): HTMLDivElement[] => {
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
      .map(([, element]) => element)
  }

  const getFinancialElements = (): HTMLDivElement[] =>
    [
      ...document.getElementsByClassName(EXPORT_CLASS.FINANCIAL)
    ] as HTMLDivElement[]

  const exportToPdf = async (
    markedElement: Record<ExportFPOption, boolean>
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
      const financialElements = markedElement[
        ExportFPOption.APPLICATION_SUMMARY
      ]
        ? getFinancialElements()
        : []

      const allElements = [...filteredElements, ...financialElements]

      const { pdf } = await generatePDF({
        elements: allElements.map((el) => ({
          htmlElement: el
        }))
      })

      pdf.save(`CapitalCollab_${Date.now()}.pdf`)
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
