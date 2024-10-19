import { ButtonLoading } from "@/components/ui/button"
import { useDownloadESignDocument } from "../../hooks/useESign/useDownloadESignDocument"

interface IButtonDownloadESignDocumentProps {
  documentId?: string
  id?: string
  className?: string
  documentName?: string
}

export function ButtonDownloadESignDocument({
  documentId,
  className,
  documentName,
  id,
  children
}: React.PropsWithChildren<IButtonDownloadESignDocumentProps>) {
  const downloadMutate = useDownloadESignDocument()
  const handleDownloadESignDocument = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()

    if (documentId || id) {
      await downloadMutate.mutateAsync({
        id,
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
