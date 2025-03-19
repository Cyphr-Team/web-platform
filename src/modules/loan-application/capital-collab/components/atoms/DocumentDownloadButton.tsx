import { ButtonLoading } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useDownloadDocument } from "@/modules/loan-application/capital-collab/hooks/useDownloadDocument"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"
import { FileDown } from "lucide-react"
import { useState } from "react"

interface IDownloadDocumentButtonProps {
  documentId: string
  fileName?: string
  text?: string
  disabled?: boolean
  className?: string
}

export function DocumentDownloadButton({
  documentId,
  fileName,
  text,
  disabled,
  className
}: IDownloadDocumentButtonProps) {
  const [preventCacheCount, setPreventCacheCount] = useState(0)

  const downloadFile = useDownloadDocument({
    documentId,
    preventCacheCount,
    fileName,
    isAdmin: checkIsWorkspaceAdmin()
  })

  const handleDownloadDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setPreventCacheCount((preState) => preState + 1)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonLoading
            className={className}
            disabled={disabled}
            isLoading={downloadFile.isLoading}
            size="sm"
            variant="ghost"
            onClick={handleDownloadDocument}
          >
            <div className="flex items-center">
              {text ? <span className="mr-1">{text}</span> : null}
              <FileDown className="size-6 p-0.5" />
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
