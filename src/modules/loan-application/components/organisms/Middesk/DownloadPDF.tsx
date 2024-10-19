import { ButtonLoading } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export function DownloadPDF() {
  return (
    <ButtonLoading
      data-html2canvas-ignore
      className="p-0 px-2 -mx-2"
      variant="ghost"
    >
      Download PDF <FileDown className="ml-1" />
    </ButtonLoading>
  )
}
