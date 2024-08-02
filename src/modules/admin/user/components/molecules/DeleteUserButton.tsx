import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { X } from "lucide-react"
import { useState } from "react"

export const DeleteUserButton = ({
  userEmail,
  index,
  onRemove
}: {
  userEmail: string
  index: number
  onRemove: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove()
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleDeleteUser}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Remove this user?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Remove <strong>{userEmail}</strong>? This action is permanent and
          cannot be undone.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Button
        variant="ghost"
        className="cursor-pointer text-center p-0 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white"
        type="button"
        name={`btn-delete-user-${index + 1}`}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <X size={15} />
      </Button>
    </CustomAlertDialog>
  )
}
