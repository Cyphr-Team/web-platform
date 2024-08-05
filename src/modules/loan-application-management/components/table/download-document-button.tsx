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

interface IDownloadDocumentButtonProps {
  documentId: string
  fileName?: string
  text?: string
  disabled?: boolean
  className?: string
}

export const DownloadDocumentButton = ({
  documentId,
  fileName,
  text,
  disabled,
  className
}: IDownloadDocumentButtonProps) => {
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
            size={text ? "sm" : "icon"}
            onClick={handleDownloadDocument}
            isLoading={downloadFile.isLoading}
            disabled={disabled}
            className={className}
          >
            <div className="flex items-center">
              {text && <span className="mr-1">{text}</span>}
              <FileDown className="w-6 h-6 p-0.5" />
            </div>
          </ButtonLoading>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Download document</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
