import { Card } from "@/components/ui/card"
import { BaseLoanProgramType, MicroLoanProgramType } from "../../constants/type"
import { LoanType } from "@/types/loan-program.type"
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
          loanProgram={loanProgram as MicroLoanProgramType}
          additionalInfo={additionalInfo}
        />
      )
    default:
      null
  }
}

export const LoanProgramCard = ({ loanProgram, additionalInfo }: CardProps) => {
  return generateLoanProgramCardByLoanType(loanProgram, additionalInfo)
}
