import { ButtonLoading } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useQueryDownloadChatbotDocument } from "@/modules/admin/user/hooks/useQuery/useQueryDownloadChatbotDocument"
import { FileDown } from "lucide-react"
import { useState } from "react"

interface IDownloadDocumentButtonProps {
  documentId: string
  fileName?: string
  text?: string
  disabled?: boolean
  className?: string
}

export function DownloadChatbotDocumentButton({
  documentId,
  fileName,
  text,
  disabled,
  className
}: IDownloadDocumentButtonProps) {
  // Use timestamp to prevent cache when downloading the file
  // Set initial value to 0 as we don't want the download to be triggered immediately at first render
  const [timestamp, setTimestamp] = useState(0)
  const downloadFile = useQueryDownloadChatbotDocument({
    documentId,
    fileName,
    timestamp
  })

  const handleDownloadDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setTimestamp(() => Date.now())
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
