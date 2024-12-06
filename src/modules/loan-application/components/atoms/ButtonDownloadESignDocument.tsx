import { ButtonLoading } from "@/components/ui/button"
import { useDownloadESignDocument } from "@/modules/loan-application/hooks/form-esign/useDownloadESignDocument"

interface ButtonDownloadESignDocumentProps {
  documentId?: string
  id?: string
  className?: string
  documentName?: string
  variant?: "outline" | "ghost"
}

export function ButtonDownloadESignDocument({
  documentId,
  className,
  documentName,
  id,
  children,
  variant = "ghost"
}: React.PropsWithChildren<ButtonDownloadESignDocumentProps>) {
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
      variant={variant}
      onClick={handleDownloadESignDocument}
    >
      {children}
    </ButtonLoading>
  )
}
