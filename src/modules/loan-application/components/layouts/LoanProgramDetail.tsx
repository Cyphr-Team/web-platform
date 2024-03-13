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
      <div className="grid grid-cols-8">
        <div className="col-span-8">
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
        </div>

        <section className="col-span-8">
          {isLoading ? (
            <Skeleton className="w-screen md:w-[calc(100vw-15rem)] max-w-[1200px] h-[140px] md:h-[250px] lg:h-[359px] items-center align-center flex" />
          ) : (
            <img
              className="mx-auto w-full"
              src={heroImage}
              alt="Loan program detail"
              height={359}
            />
          )}
        </section>

        <section className="p-6 md:px-0 col-span-6 col-start-2 mx-auto">
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
