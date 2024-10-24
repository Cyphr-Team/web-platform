import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useLoanApplicationFormContext } from "../../providers"
import { useLocation, useNavigate } from "react-router-dom"

export function DiscardApplication() {
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

  const description = `Are you sure you want to discard this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      actionClassName="text-white"
      cancelText="Cancel"
      confirmText="Discard"
      description={<span className="break-keep">{description}</span>}
      title="Discard application"
      onConfirmed={onConfirmed}
    >
      <Button
        className="hover:opacity-90"
        disabled={isSubmitting}
        variant="outline"
      >
        Discard application
      </Button>
    </CustomAlertDialog>
  )
}
