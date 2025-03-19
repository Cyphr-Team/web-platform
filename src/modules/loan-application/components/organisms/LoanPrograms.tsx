import { useTenant } from "@/providers/tenant-provider"
import { LoanProgramCard } from "../molecules/LoanProgramCard"
import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { getSubdomain, isSbb, matchSubdomain } from "@/utils/domain.utils"
import { sanitizeDOM } from "@/utils/file.utils"
import { Institution } from "@/constants/tenant.constants"
import { KCLoanProgramCard } from "../molecules/custom/KCLoanProgramCard"
import { SBBLoanProgramCard } from "../molecules/custom/SBBLoanProgramCard"
import { LoanProgramLongCard } from "../molecules/LoanProgramLongCard"
import { type BaseLoanProgramType } from "@/types/loan-program.type"

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
      additionalInfo={
        ALTCAP_LOAN_PROGRAMS[0].meta
          ? [
              ALTCAP_LOAN_PROGRAMS[0].meta.collateralRequired,
              ALTCAP_LOAN_PROGRAMS[0].meta.minimumCreditScore,
              ALTCAP_LOAN_PROGRAMS[0].meta.decisionTime
            ]
          : undefined
      }
      loanProgram={loanProgram}
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
        <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
          {isSbb() ? "Our Programs" : "Our Loan Programs"}
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramOverview) }}
          className="whitespace-pre-wrap text-justify text-lg"
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
          <div className="grid grid-cols-1 gap-6 md:gap-y-11 xl:grid-cols-2">
            {loanPrograms?.map((loanProgram) =>
              renderShortCardLoanPrograms(loanProgram)
            )}
          </div>
        )}
      </section>
    </>
  )
}
