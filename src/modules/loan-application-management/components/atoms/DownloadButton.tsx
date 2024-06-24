import { ButtonLoading } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { isEnableDownloadCSVAndJSONSummary } from "@/utils/feature-flag.utils"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { DownloadCloud } from "lucide-react"
import { RefObject, useState } from "react"
import { useParams } from "react-router-dom"
import { LoanSummaryDownloadType } from "../../constants/type"
import { useQueryDownloadLoanSummary } from "../../hooks/useQuery/useQueryDownloadLoanSummary"

export const DownloadButton = ({
  elementToExportRef,
  disabled
}: {
  elementToExportRef: RefObject<HTMLElement>[]
  disabled?: boolean
}) => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [downloadType, setDownloadType] = useState<LoanSummaryDownloadType>()
  const [preventCacheCount, setPreventCacheCount] = useState(0)
  const { id: loanApplicationId } = useParams()

  const adjustFontSize = (clonedContent: HTMLElement) => {
    const elementsWith2XlText = clonedContent.querySelectorAll(".text-2xl")
    elementsWith2XlText.forEach((el) => {
      el.classList.remove("text-2xl")
      el.classList.add("text-3xl")
    })

    const elementsWith1XlText = clonedContent.querySelectorAll(".text-xl")
    elementsWith1XlText.forEach((el) => {
      el.classList.remove("text-xl")
      el.classList.add("text-2xl")
    })

    const elementsWithLgText = clonedContent.querySelectorAll(".text-lg")
    elementsWithLgText.forEach((el) => {
      el.classList.remove("text-lg")
      el.classList.add("text-2xl")
    })

    const elementsWithBaseText = clonedContent.querySelectorAll(".text-base")
    elementsWithBaseText.forEach((el) => {
      el.classList.remove("text-base")
      el.classList.add("text-xl")
    })

    const elementsWithSmText = clonedContent.querySelectorAll(".text-sm")
    elementsWithSmText.forEach((el) => {
      el.classList.remove("text-sm")
      el.classList.add("text-xl")
    })
    const elementsWithXsText = clonedContent.querySelectorAll(".text-xs")
    elementsWithXsText.forEach((el) => {
      el.classList.remove("text-xs")
      el.classList.add("text-xl")
    })

    const elementsWithCardGlance = clonedContent.querySelectorAll(".h-32")
    elementsWithCardGlance.forEach((el) => {
      el.classList.remove("h-32")
      el.classList.add("h-54")
    })
  }

  const addContentToPdf = async (doc: jsPDF, content: HTMLElement) => {
    const [pageWidth, pageHeight] = [210, 297]
    const canvas = await html2canvas(content)
    const imgData = canvas.toDataURL("image/jpeg", {
      scale: 10
    })

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

    while (heightLeft >= 0) {
      position += heightLeft - imgHeight
      doc.addPage()
      doc.addImage(imgData, "JPEG", marginLeft, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
  }

  const processContent = async (
    doc: jsPDF,
    content: HTMLElement,
    addPage = true
  ) => {
    const clonedContent = content.cloneNode(true) as HTMLElement
    clonedContent.style.width = "1200px"
    document.body.appendChild(clonedContent)
    adjustFontSize(clonedContent)
    await addContentToPdf(doc, clonedContent)
    // Add a new page for the next image
    if (addPage) doc.addPage()
    // Remove the cloned content
    clonedContent.remove()
  }

  const downloadPdf = async () => {
    if (!elementToExportRef[0].current) return
    setIsLoading(true)

    const style = document.createElement("style")
    document.head.appendChild(style)
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block !important; }",
      0
    )

    const doc = new jsPDF("p", "mm")

    for (const ref of elementToExportRef) {
      if (!ref.current) return
      const content = ref.current
      if (content.id === "loan-application") {
        const MAX_LOANS_PER_PAGE = 5

        const currentLoanItems =
          content.querySelector("#current-loans")?.children ?? []

        for (let i = 0; i < currentLoanItems.length; i += MAX_LOANS_PER_PAGE) {
          const clonedContent = document.createElement("div")
          clonedContent.style.width = "1200px"
          const pageSection = document.createElement("div")
          pageSection.classList.add("loan-application-item")

          for (
            let j = i;
            j < i + MAX_LOANS_PER_PAGE && j < currentLoanItems.length;
            j++
          ) {
            const sectionElement = currentLoanItems[j] as HTMLElement
            sectionElement.style.marginBottom = "30px" // Add padding between sections
            pageSection.appendChild(currentLoanItems[j].cloneNode(true))
          }
          clonedContent.appendChild(pageSection)
          document.body.appendChild(clonedContent)
          adjustFontSize(clonedContent)
          await addContentToPdf(doc, clonedContent)
          clonedContent.remove()
          doc.addPage()
        }
      } else if (elementToExportRef[elementToExportRef.length - 1] == ref) {
        await processContent(doc, content, false)
      } else {
        await processContent(doc, content)
      }
    }
    style.sheet?.deleteRule(0)

    setIsLoading(false)
    doc.save(`loan_summary_${new Date().valueOf()}.pdf`)
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonLoading
          variant="outline"
          data-html2canvas-ignore
          isLoading={isLoading || downloadFile.isLoading}
          disabled={disabled}
        >
          Download <DownloadCloud className="ml-1" />
        </ButtonLoading>
      </DropdownMenuTrigger>
      <DropdownMenuContent itemProp="className" className="cursor-pointer">
        <DropdownMenuItem onClick={downloadPdf}>PDF</DropdownMenuItem>
        {/* MVP-1385: hide because its not ready */}
        {isEnableDownloadCSVAndJSONSummary() && (
          <>
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
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
