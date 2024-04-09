import { useTenant } from "@/providers/tenant-provider"
import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { useQueryGetLoanPrograms } from "../../hooks/useQuery/useQueryLoanPrograms"
import { LoanProgramCard } from "../molecules/LoanProgramCard"

export const LoanPrograms = () => {
  const { tenantData } = useTenant()
  const { loanProgramOverview } = tenantData ?? {}

  const loanPrograms = useQueryGetLoanPrograms()

  return (
    <>
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Our Loan Programs
        </h2>
        <p className="text-lg whitespace-pre-wrap">{loanProgramOverview}</p>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-11">
          {loanPrograms.data?.data?.map((loanProgram) => (
            <LoanProgramCard
              key={loanProgram.id}
              loanProgram={loanProgram}
              additionalInfo={
                ALTCAP_LOAN_PROGRAMS[0].meta && [
                  ALTCAP_LOAN_PROGRAMS[0].meta.collateralRequired,
                  ALTCAP_LOAN_PROGRAMS[0].meta.minimumCreditScore,
                  ALTCAP_LOAN_PROGRAMS[0].meta.decisionTime
                ]
              }
            />
          ))}
        </div>
      </section>
    </>
  )
}
