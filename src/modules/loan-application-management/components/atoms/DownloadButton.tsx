import { ButtonLoading } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { DownloadCloud } from "lucide-react"
import { RefObject, useState } from "react"
import { useQueryDownloadLoanSummary } from "../../hooks/useQuery/useQueryDownloadLoanSummary"
import { useParams } from "react-router-dom"
import { LoanSummaryDownloadType } from "../../constants/type"

export const DownloadButton = ({
  elementToExportRef
}: {
  elementToExportRef: RefObject<HTMLElement>
}) => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [downloadType, setDownloadType] = useState<LoanSummaryDownloadType>()
  const [preventCacheCount, setPreventCacheCount] = useState(0)
  const { id: loanApplicationId } = useParams()

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

  const handleClickDownload = (type: LoanSummaryDownloadType) => () => {
    setDownloadType(type)
    setPreventCacheCount((preState) => preState + 1)
  }

  const downloadFile = useQueryDownloadLoanSummary({
    applicationId: loanApplicationId,
    type: downloadType,
    preventCacheCount
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonLoading
            variant="outline"
            data-html2canvas-ignore
            isLoading={isLoading || downloadFile.isLoading}
          >
            Download <DownloadCloud className="ml-1" />
          </ButtonLoading>
        </DropdownMenuTrigger>
        <DropdownMenuContent itemProp="className" className="cursor-pointer">
          <DropdownMenuItem onClick={downloadPdf}>File PDF</DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleClickDownload(LoanSummaryDownloadType.CSV)}
          >
            File CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleClickDownload(LoanSummaryDownloadType.JSON)}
          >
            File JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
