import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const processContent = async (
  doc: jsPDF,
  content: HTMLElement,
  addPage = true
): Promise<number> => {
  const clonedContent = content.cloneNode(true) as HTMLElement
  clonedContent.style.width = "1200px"
  document.body.appendChild(clonedContent)
  const totalPage = await addContentToPdf(doc, clonedContent)
  // Add a new page for the next image
  if (addPage) doc.addPage()
  // Remove the cloned content
  clonedContent.remove()

  return totalPage
}

const addContentToPdf = async (
  doc: jsPDF,
  content: HTMLElement
): Promise<number> => {
  const [pageWidth, pageHeight] = [210, 297]
  const canvas = await html2canvas(content)
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
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
): Promise<{ pdf: jsPDF; totalPage: number }> => {
  if (!itemsRef.current.length) return { pdf: new jsPDF(), totalPage: 0 }

  const style = document.createElement("style")
  document.head.appendChild(style)
  style.sheet?.insertRule(
    "body > div:last-child img { display: inline-block !important; }",
    0
  )

  const doc = new jsPDF("p", "mm")
  let totalPage = 0
  for (let idx = 0; idx < itemsRef.current.length; ++idx) {
    const content = itemsRef.current[idx]
    if (!content) return { pdf: new jsPDF(), totalPage: 0 }
    if (idx == itemsRef.current.length - 1) {
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
