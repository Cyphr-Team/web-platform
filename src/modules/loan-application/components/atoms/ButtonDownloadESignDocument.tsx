import { ButtonLoading } from "@/components/ui/button"
import { useDownloadESignDocument } from "../../hooks/useESign/useDownloadESignDocument"

interface IButtonDownloadESignDocumentProps {
  documentId: string
  className?: string
}

export const ButtonDownloadESignDocument = ({
  documentId,
  children,
  className
}: React.PropsWithChildren<IButtonDownloadESignDocumentProps>) => {
  const downloadMutate = useDownloadESignDocument()
  const handleDownloadESignDocument = async () => {
    await downloadMutate.mutateAsync(documentId)
  }

  return (
    <ButtonLoading
      className={className}
      isLoading={downloadMutate.isPending}
      variant="ghost"
      onClick={handleDownloadESignDocument}
    >
      {children}
    </ButtonLoading>
  )
}
