import { ButtonLoading } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { FileDown } from "lucide-react"
import { useState } from "react"
import { useQueryDownloadDocumentForOfficer } from "../../hooks/useQuery/useQueryDownloadDocumentForOfficer"

export const DownloadDocumentButton = ({
  documentId,
  fileName
}: {
  documentId: string
  fileName?: string
}) => {
  const [preventCacheCount, setPreventCacheCount] = useState(0)

  const downloadFile = useQueryDownloadDocumentForOfficer({
    documentId,
    preventCacheCount,
    fileName
  })

  const handleDownloadDocument = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setPreventCacheCount((preState) => preState + 1)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonLoading
            variant="ghost"
            size="icon"
            onClick={handleDownloadDocument}
            isLoading={downloadFile.isLoading}
          >
            <FileDown />
          </ButtonLoading>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Download document</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
