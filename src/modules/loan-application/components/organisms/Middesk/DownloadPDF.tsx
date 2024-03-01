import { ButtonLoading } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export const DownloadPDF = () => {
  return (
    <ButtonLoading
      variant="ghost"
      data-html2canvas-ignore
      className="p-0 px-2 -mx-2"
    >
      Download PDF <FileDown className="ml-1" />
    </ButtonLoading>
  )
}
