import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "../../../../../constants"

export function DiscardApplication() {
  const navigate = useNavigate()
  const onConfirmed = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
  }

  const description = `Are you sure you want to discard this loan application. Unsaved changes will be lost.`

  return (
    <CustomAlertDialog
      actionClassName="finovate text-white"
      cancelText="Cancel"
      confirmText="Discard"
      description={description}
      title="Discard application"
      onConfirmed={onConfirmed}
    >
      <Button className="hover:opacity-90" variant="outline">
        Discard application
      </Button>
    </CustomAlertDialog>
  )
}
