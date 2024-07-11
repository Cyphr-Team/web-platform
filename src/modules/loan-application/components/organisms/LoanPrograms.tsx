import { useTenant } from "@/providers/tenant-provider"
import { useQueryGetLoanPrograms } from "../../hooks/useQuery/useQueryLoanPrograms"
import { LoanProgramCard } from "../molecules/LoanProgramCard"
import { LoanProgramLongCard } from "../molecules/LoanProgramLongCard"
import { ALTCAP_LOAN_PROGRAMS } from "../../constants/loan-program.constants"
import { isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"
import { KCLoanProgramCard } from "../molecules/custom/KCLoanProgramCard"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { sanitizeDOM } from "@/utils/file.utils"
import { SBBLoanProgramCard } from "../molecules/custom/SBBLoanProgramCard"

export const LoanPrograms = () => {
  const { tenantData } = useTenant()
  const { loanProgramOverview } = tenantData ?? {}

  const loanPrograms = useQueryGetLoanPrograms()
  const navigate = useNavigate()

  // ONLY FOR LAUNCH KC
  useEffect(() => {
    const loanProgramsData = loanPrograms.data?.data
    if (
      isLaunchKC() &&
      loanProgramsData?.length &&
      loanProgramsData?.length > 0
    ) {
      navigate(
        APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
          loanPrograms.data?.data[0].id ?? ""
        )
      )
    }
  }, [loanPrograms.data?.data, navigate])

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
            {loanPrograms.data?.data?.map((loanProgram) =>
              (() => {
                if (isKccBank()) {
                  return (
                    <KCLoanProgramCard
                      key={loanProgram.id}
                      loanProgram={loanProgram}
                    />
                  )
                } else if (isSbb()) {
                  return (
                    <SBBLoanProgramCard
                      key={loanProgram.id}
                      loanProgram={loanProgram}
                    />
                  )
                } else {
                  return (
                    <LoanProgramLongCard
                      key={loanProgram.id}
                      loanProgram={loanProgram}
                      loanType="Loan Readiness"
                    />
                  )
                }
              })()
            )}
          </div>
        ) : (
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
        )}
      </section>
    </>
  )
}
