import { useTenant } from "@/providers/tenant-provider"
import { LoanProgramCard } from "../molecules/LoanProgramCard"
import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { getSubdomain, isSbb, matchSubdomain } from "@/utils/domain.utils"
import { sanitizeDOM } from "@/utils/file.utils"
import { Institution } from "@/constants/tenant.constants"
import { KCLoanProgramCard } from "../molecules/custom/KCLoanProgramCard"
import { SBBLoanProgramCard } from "../molecules/custom/SBBLoanProgramCard"
import { LoanProgramLongCard } from "../molecules/LoanProgramLongCard"
import { BaseLoanProgramType } from "@/types/loan-program.type"

interface Props {
  loanPrograms: BaseLoanProgramType[]
}

export const LoanPrograms: React.FC<Props> = ({ loanPrograms }) => {
  const { tenantData } = useTenant()
  const institution = getSubdomain()
  const { loanProgramOverview } = tenantData ?? {}
  // Render default loan programs for short card
  const renderShortCardLoanPrograms = (loanProgram: BaseLoanProgramType) => (
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
  )

  // Render loan programs for long card based on tenant
  const getLongCardPrograms = () => {
    const institutionPrograms = {
      [Institution.KCChamber]: KCLoanProgramCard,
      [Institution.SBB]: SBBLoanProgramCard
    }

    for (const [key, program] of Object.entries(institutionPrograms)) {
      if (matchSubdomain(institution, key)) {
        return program
      }
    }
    return LoanProgramLongCard
  }

  const LongProgramCard = getLongCardPrograms()

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
            {loanPrograms?.map((loanProgram) => (
              <LongProgramCard key={loanProgram.id} loanProgram={loanProgram} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-11">
            {loanPrograms?.map((loanProgram) =>
              renderShortCardLoanPrograms(loanProgram)
            )}
          </div>
        )}
      </section>
    </>
  )
}
