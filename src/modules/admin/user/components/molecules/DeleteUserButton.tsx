import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { X } from "lucide-react"
import { useState } from "react"

export function DeleteUserButton({
  userEmail,
  index,
  onRemove
}: {
  userEmail: string
  index: number
  onRemove: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove()
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Remove <strong>{userEmail}</strong>? This action is permanent and
          cannot be undone.
        </span>
      }
      isOpen={isOpen}
      title="Remove this user?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleDeleteUser}
    >
      <Button
        className="cursor-pointer p-0 text-center hover:bg-white disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50"
        name={`btn-delete-user-${index + 1}`}
        type="button"
        variant="ghost"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
