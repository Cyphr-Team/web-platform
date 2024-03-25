import { ButtonLoading } from "@/components/ui/button"
import { useLoanApplicationContext } from "../../providers"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "../../constants"

export const LoanApplicationSave = () => {
  const { saveForm, isSubmitting, isUploading, changeStep, progress } =
    useLoanApplicationContext()

  const isCompleteLoanRequestForm =
    progress[0].status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
  const onConfirmed = () => {
    if (!isCompleteLoanRequestForm) {
      changeStep(LOAN_APPLICATION_STEPS.LOAN_REQUEST)
    } else {
      saveForm()
    }
  }

  const confirmText = isCompleteLoanRequestForm ? "Save & Close" : "Go to form"

  const description = isCompleteLoanRequestForm
    ? `Are you sure you want to save and close this loan application`
    : `Please finish "Loan Request" form before save and close.`

  return (
    <CustomAlertDialog
      onConfirmed={onConfirmed}
      title="Save & Close"
      cancelText="Cancel"
      confirmText={confirmText}
      description={description}
    >
      <ButtonLoading variant="outline" isLoading={isSubmitting || isUploading}>
        Save & Close
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
