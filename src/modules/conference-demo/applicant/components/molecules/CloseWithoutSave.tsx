import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "../../../../../constants"

export const CloseWithoutSave = () => {
  const navigate = useNavigate()
  const onConfirmed = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
  }

  const description = `Are you sure you want to close this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      onConfirmed={onConfirmed}
      title="Close without saving"
      cancelText="Cancel"
      confirmText="Yes, Close"
      description={description}
      actionClassName="text-white finovate"
    >
      <Button variant="outline" className="hover:opacity-90">
        Close without saving
      </Button>
    </CustomAlertDialog>
  )
}
