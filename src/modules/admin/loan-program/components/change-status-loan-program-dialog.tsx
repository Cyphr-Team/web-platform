import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useState } from "react"
import { LoanProgram, ProgramStatus } from "@/types/loan-program.type"
import { useUpdateStatusLoanProgram } from "../hooks/useUpdateStatusLoanProgram"

export const ButtonChangeStatusLoanProgram = ({
  loanProgram
}: {
  loanProgram: LoanProgram
}) => {
  const { mutate, isPending } = useUpdateStatusLoanProgram()
  const [isOpen, setIsOpen] = useState(false)

  const handleUpdateStatusLoanProgram = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      loanProgramId: loanProgram.id,
      programStatus: nextProgramStatus(loanProgram.status)
    })
    setIsOpen(false)
  }

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

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={handleUpdateStatusLoanProgram}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title={`Change status loan program`}
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          {`Change status of this loan program from ${
            loanProgram.status
          } to ${nextProgramStatus(loanProgram.status)}?`}
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <ButtonLoading
        isLoading={isPending}
        variant="ghost"
        className="w-full cursor-pointer text-center hover:bg-gray-100"
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        Update status
      </ButtonLoading>
    </CustomAlertDialog>
  )
}
