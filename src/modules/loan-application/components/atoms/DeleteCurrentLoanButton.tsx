import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { X } from "lucide-react"
import { useState } from "react"

export const DeleteCurrentLoanButton = ({
  index,
  onRemove
}: {
  index: number
  onRemove: (arg: number) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteCurrentLoan = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(index)
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleDeleteCurrentLoan}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Remove this current loan?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>Delete Loan #{index + 1}?</strong> This action is permanent.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        variant="ghost"
        className="cursor-pointer text-center"
        type="button"
        name={`btn-delete-current-loan-${index + 1}`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <X size={20} />
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
