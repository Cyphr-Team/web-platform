import html2canvas from "html2canvas"
import jsPDF from "jspdf"

/**
 * We use a try-catch block when calling the 'addContentToPdf' function because:
 * - Some forms do not need to be included in the Review Application step,
 *   so their canvas height can be 0, leading to an error. In such cases, we will ignore these forms.
 *
 * @see addContentToPdf
 */
const processContent = async (
  doc: jsPDF,
  content: HTMLElement,
  addPage = true
): Promise<number> => {
  let totalPage = 0
  const clonedContent = content.cloneNode(true) as HTMLElement

  try {
    clonedContent.style.width = "1200px"
    document.body.appendChild(clonedContent)
    totalPage = await addContentToPdf(doc, clonedContent)
    // Add a new page for the next image
    if (addPage) doc.addPage()
  } catch (e) {
    console.error("Generate form failed", e)
  } finally {
    // Remove the cloned content
    clonedContent?.remove()
  }

  return totalPage
}

const addContentToPdf = async (
  doc: jsPDF,
  content: HTMLElement
): Promise<number> => {
  const [pageWidth, pageHeight] = [210, 297]
  const canvas = await html2canvas(content)

  if (canvas.height === 0) return 0

  const imgData = canvas.toDataURL("image/jpeg")

  // Set the desired width of the image in the PDF (in millimeters)
  const imgWidth = (pageWidth * 80) / 100 // A4 width

  // Calculate the adjusted height of the image to maintain aspect ratio
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  // Margin left and top
  const marginLeft = (pageWidth * 20) / 200
  let heightLeft = imgHeight
  let position = marginLeft / 2

  doc.addImage(imgData, "JPEG", marginLeft, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  let totalPage = 1

  while (heightLeft >= 0) {
    position += heightLeft - imgHeight
    doc.addPage()
    totalPage += 1
    doc.addImage(imgData, "JPEG", marginLeft, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  return totalPage
}

export const getPDF = async (
  pdfElements: HTMLDivElement[]
): Promise<{ pdf: jsPDF; totalPage: number }> => {
  if (!pdfElements.length) return { pdf: new jsPDF(), totalPage: 0 }

  const style = document.createElement("style")
  document.head.appendChild(style)
  style.sheet?.insertRule(
    "body > div:last-child img { display: inline-block !important; }",
    0
  )

  const doc = new jsPDF("p", "mm")
  let totalPage = 0
  for (let idx = 0; idx < pdfElements.length; ++idx) {
    const content = pdfElements[idx]
    if (!content) continue
    if (idx == pdfElements.length - 1) {
      const processedPage = await processContent(doc, content, false)
      totalPage += processedPage
    } else {
      const processedPage = await processContent(doc, content)
      totalPage += processedPage
    }
  }

  style.sheet?.deleteRule(0)

  return { pdf: doc, totalPage }
}
