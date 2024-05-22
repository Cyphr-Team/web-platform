import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useLoanApplicationFormContext } from "../../providers"
import { useLocation, useNavigate } from "react-router-dom"

export const CloseWithoutSave = () => {
  const { isSubmitting } = useLoanApplicationFormContext()
  const { state } = useLocation()
  const navigate = useNavigate()
  const onConfirmed = () => {
    if (state?.backUrl) {
      navigate(state.backUrl)
    } else {
      navigate("/")
    }
  }

  const description = `Are you sure you want to close this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      onConfirmed={onConfirmed}
      title="Close without saving"
      cancelText="Cancel"
      confirmText="Yes, Close"
      description={description}
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Button
        disabled={isSubmitting}
        className="bg-error hover:opacity-90 hover:bg-error"
      >
        Close without saving
      </Button>
    </CustomAlertDialog>
  )
}
