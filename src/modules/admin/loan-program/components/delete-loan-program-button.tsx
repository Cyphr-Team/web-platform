import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useDeleteLoanProgram } from "../hooks/useDeleteLoanProgram"
import { useState } from "react"

export function ButtonDeleteLoanProgram({
  loanProgramId
}: {
  loanProgramId: string
}) {
  const { mutate, isPending } = useDeleteLoanProgram()
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteLoanProgram = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({ loanProgramId: loanProgramId })
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          <strong>Delete this loan program?</strong> This action is permanent.
        </span>
      }
      isOpen={isOpen}
      title="Delete loan program?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={handleDeleteLoanProgram}
    >
      <ButtonLoading
        className="w-full cursor-pointer text-center text-destructive hover:bg-gray-100"
        isLoading={isPending}
        type="button"
        variant="ghost"
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
