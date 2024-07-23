import { useTenant } from "@/providers/tenant-provider"
import { LoanProgramCard } from "../molecules/LoanProgramCard"
import { LoanProgramLongCard } from "../molecules/LoanProgramLongCard"
import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { isKccBank, isSbb } from "@/utils/domain.utils"
import { KCLoanProgramCard } from "../molecules/custom/KCLoanProgramCard"
import { sanitizeDOM } from "@/utils/file.utils"
import { SBBLoanProgramCard } from "../molecules/custom/SBBLoanProgramCard"
import { BaseLoanProgramType } from "@/types/loan-program.type"

interface Props {
  loanPrograms: BaseLoanProgramType[]
}

export const LoanPrograms: React.FC<Props> = ({ loanPrograms }) => {
  const { tenantData } = useTenant()
  const { loanProgramOverview } = tenantData ?? {}

  return (
    <>
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          {isSbb() ? "Our Programs" : "Our Loan Programs"}
        </h2>
        <p
          className="text-lg whitespace-pre-wrap text-justify"
          dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramOverview) }}
        />
      </section>

      <section className="mt-6">
        {tenantData?.customFieldsOnDemand?.showLongCard ? (
          <div className="flex flex-col gap-6">
            {loanPrograms?.map((loanProgram) => {
              let LoanProgramCardComponent
              if (isKccBank()) {
                LoanProgramCardComponent = KCLoanProgramCard
              } else if (isSbb()) {
                LoanProgramCardComponent = SBBLoanProgramCard
              } else {
                LoanProgramCardComponent = LoanProgramLongCard
              }
              return (
                <LoanProgramCardComponent
                  key={loanProgram.id}
                  loanProgram={loanProgram}
                  loanType={"Loan Readiness"}
                />
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-11">
            {loanPrograms?.map((loanProgram) => (
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
        )}
      </section>
    </>
  )
}
