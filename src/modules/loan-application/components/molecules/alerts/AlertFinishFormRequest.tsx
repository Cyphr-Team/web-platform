import { useLoanApplicationContext } from "@/modules/loan-application/providers"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"

export const AlertFinishFormBeforeLeave: React.FC = () => {
  const { alertDialog, changeStep, closeAlertDialog } =
    useLoanApplicationContext()

  const onConfirmed = () => {
    if (alertDialog) {
      changeStep(alertDialog, true)
    }
  }

  return (
    <CustomAlertDialog
      isOpen={!!alertDialog}
      onConfirmed={onConfirmed}
      onCanceled={closeAlertDialog}
      title="Discard changes?"
      cancelText="Cancel"
      confirmText="Discard change & leave"
      description={`You have unsaved changes. Are you sure you want to leave?`}
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    />
  )
}
