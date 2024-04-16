import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "../../providers"
import { LoanProgramDetailProvider } from "../../providers/LoanProgramDetailProvider"
import { LoanProgramDetailApply } from "../organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailFAQ } from "../organisms/loan-program-detail/LoanProgramDetailFAQ"
import { LoanProgramDetailUnderConstruction } from "../organisms/loan-program-detail/LoanProgramDetailUnderConstruction"
import { LoanProgramDetailWelcomeLine } from "../organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { TopBarDetail } from "./TopBarDetail"

import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { CustomLabelKey, buildCustomLabel, buildIds } from "@/utils/crumb.utils"
import { cn } from "@/lib/utils"

export const ComponentWithProvider = () => {
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
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <div className={cn("col-span-10", "md:col-span-8")}>
          <TopBarDetail
            breads={crumbs}
            rightFooter={
              loanProgramInfo?.isUnderConstruction ? (
                <LoanProgramDetailUnderConstruction />
              ) : (
                <LoanProgramDetailApply btnText={loanProgramInfo?.startBtn} />
              )
            }
          />
        </div>

        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="w-screen md:w-[calc(100vw-15rem)] max-w-[1200px] h-[140px] md:h-[250px] lg:h-[264px] items-center align-center flex" />
          ) : (
            <Image
              className="w-[1200px] mx-auto max-h-[292px] object-contain max-w-full border-b"
              src={getImageURL(loanProgramDetails?.coverPhotoUrl)}
              placeholderClassName="w-[1200px] bg-slate-600 max-h-[264px] mx-auto max-w-full"
              alt="Cover Photo for Loan Program"
              height={359}
              width={1200}
            />
          )}
        </section>

        <section
          className={cn(
            "pt-8 mx-auto p-6 col-span-10",
            "md:px-0 md:col-span-6 md:col-start-2"
          )}
        >
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
