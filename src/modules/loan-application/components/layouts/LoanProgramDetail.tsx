import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "../../providers"
import { LoanProgramDetailProvider } from "../../providers/LoanProgramDetailProvider"
import { LoanProgramDetailApply } from "../organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailFAQ } from "../organisms/loan-program-detail/LoanProgramDetailFAQ"
import { LoanProgramDetailUnderConstruction } from "../organisms/loan-program-detail/LoanProgramDetailUnderConstruction"
import { LoanProgramDetailWelcomeLine } from "../organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { TopBarDetail } from "./TopBarDetail"

import { useTenant } from "@/providers/tenant-provider"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { CustomLabelKey, buildCustomLabel, buildIds } from "@/utils/crumb.utils"

export const ComponentWithProvider = () => {
  const { tenantData } = useTenant()
  const { loanProgramOverviewHeroImage } = tenantData ?? {}

  const { loanProgramInfo, isLoading, loanProgramDetails } =
    useLoanProgramDetailContext()

  const crumbs = useBreadcrumb({
    customLabel: buildCustomLabel(
      CustomLabelKey.documentDetail,
      loanProgramDetails?.name ?? ""
    ),
    ids: Object.assign(
      {},
      buildIds(CustomLabelKey.documentDetail, loanProgramDetails?.id)
    )
  })

  return (
    <div className="overflow-auto flex flex-col items-center flex-1">
      <div className="grid grid-cols-8">
        <div className="col-span-8">
          <TopBarDetail
            breads={crumbs}
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
            loanProgramOverviewHeroImage && (
              <img
                className="mx-auto w-full max-h-[359px]"
                src={loanProgramOverviewHeroImage}
                alt="Loan program detail"
                height={359}
              />
            )
          )}
        </section>

        <section className="p-6 md:px-0 col-span-6 col-start-2 mx-auto w-full">
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
