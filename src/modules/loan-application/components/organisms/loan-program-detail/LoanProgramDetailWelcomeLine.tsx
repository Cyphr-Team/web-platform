import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"

export const LoanProgramDetailWelcomeLine = () => {
  const { loanProgramInfo } = useLoanProgramDetailContext()

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        {loanProgramInfo?.name}
      </h2>
      <p className="text-xl whitespace-pre-wrap">
        {loanProgramInfo?.description}
      </p>
    </section>
  )
}
