import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeleteLoanProgram } from "../hooks/useDeleteLoanProgram"
import { useState } from "react"

export const ButtonDeleteLoanProgram = ({
  loanProgramId
}: {
  loanProgramId: string
}) => {
  const { mutate, isPending } = useDeleteLoanProgram()
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteLoanProgram = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ loanProgramId: loanProgramId })
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleDeleteLoanProgram}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Delete loan program?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>Delete this loan program?</strong> This action is permanent.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        isLoading={isPending}
        variant="ghost"
        className="w-full text-destructive cursor-pointer text-center hover:bg-gray-100"
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        Delete
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
