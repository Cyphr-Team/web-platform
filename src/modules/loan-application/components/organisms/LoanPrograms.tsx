import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { LoanProgramCard } from "../molecules/LoanProgramCard"

export const LoanPrograms = () => {
  return (
    <>
      <section>
        <h2 className="text-4xl font-semibold mb-6">Our Loan Programs</h2>
        <p className="text-lg">
          Our alternative approach to financing allows us to support small
          businesses that other lenders overlook. We lend flexible, patient
          capital and tailor financial solutions to meet entrepreneurs where
          they’re at.
        </p>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-11">
          {ALTCAP_LOAN_PROGRAMS.map((loanProgram) => (
            <LoanProgramCard key={loanProgram.name} loanProgram={loanProgram} />
          ))}
        </div>
      </section>
    </>
  )
}
