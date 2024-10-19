import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "../../../../../constants"

export function CloseWithoutSave() {
  const navigate = useNavigate()
  const onConfirmed = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
  }

  const description = `Are you sure you want to close this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      actionClassName="text-white finovate"
      cancelText="Cancel"
      confirmText="Yes, Close"
      description={description}
      title="Close without saving"
      onConfirmed={onConfirmed}
    >
      <Button className="hover:opacity-90" variant="outline">
        Close without saving
      </Button>
    </CustomAlertDialog>
  )
}
