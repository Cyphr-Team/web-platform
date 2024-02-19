import { ASSETS } from "@/assets"
import { Separator } from "@/components/ui/separator"
import { LoanProgramDetailProvider } from "../../providers/LoanProgramDetailProvider"
import { useLoanProgramDetailContext } from "../../providers"
import { LoanProgramDetailWelcomeLine } from "../organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { LoanProgramDetailFAQ } from "../organisms/loan-program-detail/LoanProgramDetailFAQ"
import { TopBarDetail } from "./TopBarDetail"
import { LoanProgramDetailApply } from "../organisms/loan-program-detail/LoanProgramDetailApply"

export const ComponentWithProvider = () => {
  const { loanProgramDetail } = useLoanProgramDetailContext()

  const heroImage =
    loanProgramDetail?.heroImage ?? ASSETS.altCapLoanProgramLarge

  return (
    <div className="overflow-auto my-0 md:-my-8 -mx-8 flex flex-col items-center flex-1">
      <TopBarDetail
        breads={[
          {
            to: "#",
            label: loanProgramDetail?.name || ""
          }
        ]}
        rightFooter={<LoanProgramDetailApply />}
      />

      <div>
        <section className="w-full">
          <img
            className="w-full max-h-[292px]"
            src={heroImage}
            alt="hero image"
            height={292}
          />
        </section>

        <section className="p-6 md:px-0 md:w-4/5 xl:w-3/4 m-auto">
          <div>
            <LoanProgramDetailWelcomeLine />
          </div>

          <Separator className="my-6" />

          <div>
            <LoanProgramDetailFAQ />
          </div>
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

Component.displayName = "LoanProgramDetail"
