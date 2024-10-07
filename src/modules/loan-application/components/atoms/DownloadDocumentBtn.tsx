import { ButtonLoading } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { DownloadFinancialDocumentProps } from "@/modules/loan-application/hooks/useQueryDownloadFinancialDocument"
import { ErrorResponse } from "@/types/common.type"
import { UseQueryResult } from "@tanstack/react-query"
import { FileDown } from "lucide-react"
import { useState } from "react"

interface DownloadDocumentButtonProps {
  useDownloadFile: (
    _: DownloadFinancialDocumentProps
  ) => UseQueryResult<string, ErrorResponse>
}
export const DownloadDocumentBtn = ({
  setupId,
  documentId,
  fileName,
  useDownloadFile
}: DownloadFinancialDocumentProps & DownloadDocumentButtonProps) => {
  const [preventCacheCount, setPreventCacheCount] = useState(0)

  const downloadFile = useDownloadFile({
    setupId,
    documentId,
    preventCacheCount,
    fileName
  })

  const handleDownloadDocument = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setPreventCacheCount(() => new Date().valueOf())
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
            <FileDown className="w-5" />
          </ButtonLoading>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Download document</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
