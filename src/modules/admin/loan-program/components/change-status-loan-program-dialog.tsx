import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useState } from "react"
import { type LoanProgram, ProgramStatus } from "@/types/loan-program.type"
import { useUpdateStatusLoanProgram } from "../hooks/useUpdateStatusLoanProgram"

/**
 * This function is used to get the next status of the program
 * Status: DRAFT -> ACTIVATED -> DEACTIVATED -> ACTIVATED
 *
 * @param status
 * @returns
 */
const nextProgramStatus = (status: ProgramStatus): ProgramStatus => {
  switch (status) {
    case ProgramStatus.DRAFT:
      return ProgramStatus.ACTIVATED
    case ProgramStatus.ACTIVATED:
      return ProgramStatus.DEACTIVATED
    case ProgramStatus.DEACTIVATED:
      return ProgramStatus.ACTIVATED
    default:
      return ProgramStatus.DRAFT
  }
}

export function ButtonChangeStatusLoanProgram({
  loanProgram
}: {
  loanProgram: LoanProgram
}) {
  const { mutate, isPending } = useUpdateStatusLoanProgram()
  const [isOpen, setIsOpen] = useState(false)

  const handleUpdateStatusLoanProgram = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      loanProgramId: loanProgram.id,
      programStatus: nextProgramStatus(loanProgram.status)
    })
    setIsOpen(false)
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
  }

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          {`Change status of this loan program from ${
            loanProgram.status
          } to ${nextProgramStatus(loanProgram.status)}?`}
        </span>
      }
      isOpen={isOpen}
      title="Change status loan program"
      onCanceled={handleCancel}
      onConfirmed={handleUpdateStatusLoanProgram}
    >
      <ButtonLoading
        className="w-full cursor-pointer text-center hover:bg-gray-100"
        isLoading={isPending}
        type="button"
        variant="ghost"
        onClick={handleOpen}
      >
        Update status
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
