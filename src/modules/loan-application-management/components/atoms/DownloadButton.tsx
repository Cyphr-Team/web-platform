import { ButtonLoading } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { DownloadCloud } from "lucide-react"
import { RefObject, useState } from "react"

export const DownloadButton = ({
  elementToExportRef
}: {
  elementToExportRef: RefObject<HTMLElement>
}) => {
  const [isLoading, setIsLoading] = useState<boolean>()

  const downloadPdf = () => {
    if (!elementToExportRef.current) return
    setIsLoading(true)

    const style = document.createElement("style")
    document.head.appendChild(style)
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block !important; }"
    )

    html2canvas(elementToExportRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg")
        const doc = new jsPDF("p", "mm")

        // Set the desired width of the image in the PDF (in millimeters)
        const imgWidth = 210
        // Define the height of each page in the PDF (in millimeters)
        const pageHeight = 295
        // Calculate the adjusted height of the image to maintain aspect ratio
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        let position = 0 // give some top padding to first page

        // First page
        doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10 // top padding for other pages
          doc.addPage()
          doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        doc.save(`loan_summary_${new Date().valueOf()}.pdf`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <ButtonLoading
      onClick={downloadPdf}
      variant="outline"
      data-html2canvas-ignore
      isLoading={isLoading}
    >
      Download <DownloadCloud className="ml-1" />
    </ButtonLoading>
  )
}
