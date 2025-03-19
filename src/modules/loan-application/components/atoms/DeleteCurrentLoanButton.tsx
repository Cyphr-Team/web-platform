import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { X } from "lucide-react"
import { useState } from "react"

export function DeleteCurrentLoanButton({
  index,
  onRemove
}: {
  index: number
  onRemove: (arg: number) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteCurrentLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(index)
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Delete Loan #{index + 1}? This action is permanent and cannot be
          undone.
        </span>
      }
      isOpen={isOpen}
      title="Delete this current loan?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleDeleteCurrentLoan}
    >
      <Button
        className="cursor-pointer p-0 text-center hover:bg-white"
        name={`btn-delete-current-loan-${index + 1}`}
        type="button"
        variant="ghost"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <X size={20} />
      </Button>
    </CustomAlertDialog>
  )
}
