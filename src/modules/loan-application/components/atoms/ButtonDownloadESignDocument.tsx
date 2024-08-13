import { ButtonLoading } from "@/components/ui/button"
import { useDownloadESignDocument } from "../../hooks/useESign/useDownloadESignDocument"

interface IButtonDownloadESignDocumentProps {
  documentId: string
  className?: string
  documentName?: string
}

export const ButtonDownloadESignDocument = ({
  documentId,
  className,
  documentName,
  children
}: React.PropsWithChildren<IButtonDownloadESignDocumentProps>) => {
  const downloadMutate = useDownloadESignDocument()
  const handleDownloadESignDocument = async () => {
    if (documentId) {
      await downloadMutate.mutateAsync({
        documentId: documentId,
        documentName: documentName
      })
    }
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
