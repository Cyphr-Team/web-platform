import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useLoanApplicationFormContext } from "../../providers"
import { useLocation, useNavigate } from "react-router-dom"

export function CloseWithoutSave() {
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
      actionClassName="text-white"
      cancelText="Cancel"
      confirmText="Yes, Close"
      description={description}
      title="Close without saving"
      onConfirmed={onConfirmed}
    >
      <Button
        className="hover:opacity-90"
        disabled={isSubmitting}
        variant="outline"
      >
        Close without saving
      </Button>
    </CustomAlertDialog>
  )
}
