import { ButtonLoading } from "@/components/ui/button.tsx"
import { Trash } from "lucide-react"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { cn } from "@/lib/utils.ts"
import { useDeleteDocument } from "@/modules/admin/user/hooks/useSubmitDocument"
import useBoolean from "@/hooks/useBoolean"

export const ButtonDeleteDocument = ({
  documentId,
  fileName
}: {
  documentId: string
  fileName: string
}) => {
  const isOpen = useBoolean(false)
  const { mutateAsync, isRemoving } = useDeleteDocument()

  const handleRemoveDocument = () => {
    mutateAsync({ documentId: documentId })
    isOpen.onFalse()
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen.value}
      onConfirmed={handleRemoveDocument}
      onCanceled={isOpen.onFalse}
      title={`Remove "${fileName}"?`}
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>
            This action will remove the document permanently from the
            organization.
          </strong>{" "}
          Are you sure you want to proceed?
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        variant="ghost"
        type="submit"
        id={documentId}
        size="icon"
        isLoading={isRemoving}
        className={cn("h-max cursor-pointer text-red-900 p-2")}
        onClick={isOpen.onTrue}
      >
        <Trash className="w-5 h-5" />
        {!isRemoving}
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
