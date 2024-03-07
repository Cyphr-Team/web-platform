import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LoanProgram } from "@/types/loan-program.type"
import { MoreVertical } from "lucide-react"
import { ButtonDeleteLoanProgram } from "../components/delete-loan-program-button"

export const DropdownAction = ({
  loanProgram
}: {
  loanProgram: LoanProgram
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <ButtonDeleteLoanProgram loanProgramId={loanProgram.id} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
