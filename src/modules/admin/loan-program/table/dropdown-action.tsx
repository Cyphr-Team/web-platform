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
import { ButtonChangeStatusLoanProgram } from "../components/change-status-loan-program"
import { FeatureFlagsRenderer } from "@/shared/layouts/FeatureFlagRenderer"
import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"

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
        <FeatureFlagsRenderer
          ffKey={FEATURE_FLAGS.LOAN_PROGRAM_CHANGES_MANAGEMENT}
        >
          <DropdownMenuLabel asChild>
            <ButtonChangeStatusLoanProgram loanProgram={loanProgram} />
          </DropdownMenuLabel>
        </FeatureFlagsRenderer>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
