import { ASSETS } from "@/assets"
import { Separator } from "@/components/ui/separator"
import { LoanProgramDetailProvider } from "../../providers/LoanProgramDetailProvider"
import { useLoanProgramDetailContext } from "../../providers"
import { LoanProgramDetailWelcomeLine } from "../organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { LoanProgramDetailFAQ } from "../organisms/loan-program-detail/LoanProgramDetailFAQ"
import { TopBarDetail } from "./TopBarDetail"
import { LoanProgramDetailApply } from "../organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailUnderConstruction } from "../organisms/loan-program-detail/LoanProgramDetailUnderConstruction"
import { Skeleton } from "@/components/ui/skeleton"

export const ComponentWithProvider = () => {
  const { loanProgramInfo, isLoading } = useLoanProgramDetailContext()

  const heroImage = loanProgramInfo?.heroImage ?? ASSETS.altCapLoanProgramLarge

  return (
    <div className="overflow-auto flex flex-col items-center flex-1">
      <div>
        <TopBarDetail
          breads={[
            {
              to: "#",
              label: loanProgramInfo?.name || ""
            }
          ]}
          rightFooter={
            loanProgramInfo?.isUnderConstruction ? (
              <LoanProgramDetailUnderConstruction />
            ) : (
              <LoanProgramDetailApply />
            )
          }
        />

        <section className="w-full">
          {isLoading ? (
            <Skeleton className="w-screen md:w-[calc(100vw-15rem)] max-w-[1200px] h-[140px] md:h-[250px] lg:h-[359px] items-center align-center flex" />
          ) : (
            <img
              className="w-[1200px] mx-auto"
              src={heroImage}
              alt="Loan program detail"
              height={359}
              width={1200}
            />
          )}
        </section>

        <section className="p-6 md:px-0 md:w-4/5 xl:w-3/4 mx-auto">
          <LoanProgramDetailWelcomeLine />

          <Separator className="my-6" />

          <LoanProgramDetailFAQ />
        </section>
      </div>
    </div>
  )
}

export const Component = () => {
  return (
    <LoanProgramDetailProvider>
      <ComponentWithProvider />
    </LoanProgramDetailProvider>
  )
}

Component.displayName = "loanProgramInfo"
