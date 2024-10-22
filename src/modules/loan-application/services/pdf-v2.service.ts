import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { get } from "lodash"

export const EXPORT_CLASS = {
  PDF: "export-pdf", // Narrow down the changes, affect the exported elements only
  FINANCIAL: "financial-application-detail-pdf",
  EXTEND_FIVE_YEARS_WIDTH: "extend-five-years-width"
} as const

export const EXPORT_CONFIG = {
  END_OF_PAGE: {
    KEY: "pdfEndOfPageType",
    NEW_PAGE: "new-page"
  }
} as const

interface GeneratePDFResult {
  pdf: jsPDF
}

interface PDFGenerationContext {
  pdf: jsPDF
  element: HTMLElement
  currentHeight: number
}

const PDF_CONFIG = {
  MARGIN_PERCENTAGE: 5,
  CONTENT_WIDTH_PERCENTAGE: 90,
  // Fixed the width while responsive
  INITIAL_ELEMENT_WIDTH: 1200
}

/**
 * Converts an HTML element to a canvas image using html2canvas.
 * @param element - The HTML element to convert
 * @returns A promise that resolves to the canvas element
 */
const convertElementToImage = async (
  element: HTMLElement
): Promise<HTMLCanvasElement> => {
  return html2canvas(element, {
    windowHeight: element?.scrollHeight,
    windowWidth: element?.scrollWidth,
    logging: false
  })
}

/**
 * Calculates the dimensions of the image to fit in the PDF while maintaining aspect ratio (scale).
 * @param canvas - The canvas element containing the image
 * @param pageWidth - The width of the PDF page
 * @returns An object containing the calculated width and height
 */
const calculateImageDimensions = (
  canvas: HTMLCanvasElement,
  pageWidth: number
): { width: number; height: number } => {
  const imgWidth = (pageWidth * PDF_CONFIG.CONTENT_WIDTH_PERCENTAGE) / 100
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  return { width: imgWidth, height: imgHeight }
}

/**
 * Adds an image to the PDF, handling page breaks if necessary.
 * @param context - The PDF generation context
 * @param imgData - The image data as a base64 string
 * @param dimensions - The dimensions of the image
 * @returns The new current height after adding the image
 */
const addImageToPDF = (
  context: PDFGenerationContext,
  imgData: string,
  dimensions: { width: number; height: number }
): number => {
  const { pdf, currentHeight } = context

  // A4 dimensions
  const pageHeight = pdf.internal.pageSize.height
  const pageWidth = pdf.internal.pageSize.width

  // Margin
  const marginLeft = (pageWidth * PDF_CONFIG.MARGIN_PERCENTAGE) / 100

  // Took up space
  const newHeight = Math.min(pageHeight, dimensions.height)
  let updatedHeight = currentHeight

  // Check if we need to add a new page
  if (currentHeight + newHeight >= pageHeight) {
    updatedHeight = 0
    pdf.addPage()
  }

  const marginTop = updatedHeight === 0 ? marginLeft : 0

  pdf.addImage(
    imgData,
    "JPEG",
    marginLeft,
    updatedHeight + marginTop,
    dimensions.width,
    dimensions.height
  )

  return updatedHeight + newHeight + marginTop
}

/**
 * Processes a single HTML element, converting it to an image and adding it to the PDF.
 * @param context - The PDF generation context
 * @returns A promise that resolves to the new current height after processing
 */
const processElement = async (
  context: PDFGenerationContext
): Promise<number> => {
  const clonedElement = context.element.cloneNode(true) as HTMLElement

  clonedElement.style.width = `${PDF_CONFIG.INITIAL_ELEMENT_WIDTH}px`
  clonedElement.classList.add(EXPORT_CLASS.PDF)

  try {
    document.body.appendChild(clonedElement)
    const canvas = await convertElementToImage(clonedElement)

    if (canvas.height === 0) return context.currentHeight

    const imgData = canvas.toDataURL("image/jpeg")
    const dimensions = calculateImageDimensions(
      canvas,
      context.pdf.internal.pageSize.width
    )

    return addImageToPDF(context, imgData, dimensions)
  } catch (error) {
    return context.currentHeight
  } finally {
    clonedElement.remove()
  }
}

/**
 * Applies temporary styles to ensure proper rendering of images in the PDF.
 * @returns A function to remove the applied styles
 */
const applyTemporaryStyles = (): (() => void) => {
  const style = document.createElement("style")

  document.head.appendChild(style)
  style.sheet?.insertRule(
    "body > div:last-child img { display: inline-block !important; }",
    0
  )

  // Help avoid scroll-x when exporting financial applications (e.g: "Cash Flow", "Balance sheet")
  style.sheet?.insertRule(
    `.${EXPORT_CLASS.PDF} .${EXPORT_CLASS.EXTEND_FIVE_YEARS_WIDTH} { grid-template-columns: 1.2fr repeat(5,0.7fr); }`
  )

  return () => {
    try {
      style.sheet?.deleteRule(1)
      style.sheet?.deleteRule(0)
      style.remove()
    } catch {
      return new Error("Failed to remove styles")
    }
  }
}

// TODO: Added footer, header, total page
/**
 * Generates a PDF from an array of HTML elements.
 * @param elements - An array of HTML elements to be included in the PDF
 * @returns A promise that resolves to an object containing the generated PDF
 */
export const generatePDF = async (
  elements: HTMLDivElement[]
): Promise<GeneratePDFResult> => {
  if (elements.length === 0) return { pdf: new jsPDF() }

  const removeStyles = applyTemporaryStyles()
  const pdf = new jsPDF("p", "mm")
  let currentHeight = 0

  try {
    for (const [index, element] of elements.entries()) {
      if (!element) continue
      currentHeight = await processElement({ pdf, element, currentHeight })

      if (
        get(element, ["dataset", EXPORT_CONFIG.END_OF_PAGE.KEY], null) ===
          EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE &&
        index !== elements.length - 1
      ) {
        pdf.addPage()
        currentHeight = 0
      }
    }
  } finally {
    removeStyles()
  }

  return { pdf }
}
