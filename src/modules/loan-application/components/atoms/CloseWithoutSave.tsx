import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useLoanApplicationFormContext } from "../../providers"

export const CloseWithoutSave = () => {
  const { isSubmitting } = useLoanApplicationFormContext()

  const onConfirmed = () => {
    // Back to home page
    window.location.href = "/"
  }

  const description = `Are you sure you want to close this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      onConfirmed={onConfirmed}
      title="Close without save"
      cancelText="Cancel"
      confirmText="Yes, Close"
      description={description}
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Button
        disabled={isSubmitting}
        className="bg-error hover:opacity-90 hover:bg-error"
      >
        Close without save
      </Button>
    </CustomAlertDialog>
  )
}
