import { type Card } from "@/components/ui/card"

import {
  type BaseLoanProgramType,
  LoanType,
  type MicroLoanProgramType
} from "@/types/loan-program.type"
import { MicroLoanProgramCard } from "../organisms/loan-program-list/MicroLoanProgramCard"

type CardProps = React.ComponentProps<typeof Card> & {
  loanProgram: BaseLoanProgramType
  additionalInfo?: string[]
}

const generateLoanProgramCardByLoanType = (
  loanProgram: BaseLoanProgramType,
  additionalInfo?: string[]
) => {
  switch (loanProgram.type) {
    case LoanType.MICRO:
      return (
        <MicroLoanProgramCard
          additionalInfo={additionalInfo}
          loanProgram={loanProgram as MicroLoanProgramType}
        />
      )
    default:
      null
  }
}

export const LoanProgramCard = ({ loanProgram, additionalInfo }: CardProps) => {
  return generateLoanProgramCardByLoanType(loanProgram, additionalInfo)
}
