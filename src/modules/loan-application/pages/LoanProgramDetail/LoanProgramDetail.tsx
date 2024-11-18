import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { TopBarDetail } from "@/modules/loan-application/components/layouts/TopBarDetail"
import { LoanProgramDetailApply } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailFAQ } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailFAQ"
import { LoanProgramDetailUnderConstruction } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailUnderConstruction"
import { LoanProgramDetailWelcomeLine } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { Image } from "@/shared/atoms/Image"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { getImageURL } from "@/utils/aws.utils"
import { buildCustomLabel, buildIds, CustomLabelKey } from "@/utils/crumb.utils"
import { isSbb } from "@/utils/domain.utils"

export function LoanProgramDetail() {
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
    <div className="flex flex-1 flex-col overflow-auto">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <div className={cn("col-span-10", "md:col-span-8")}>
          <TopBarDetail
            leftFooter={
              <div className="hidden md:block">
                <Breadcrumbs breads={crumbs} />
              </div>
            }
            rightFooter={
              loanProgramInfo?.isUnderConstruction ? (
                <LoanProgramDetailUnderConstruction />
              ) : (
                <LoanProgramDetailApply
                  btnText={loanProgramInfo?.startBtn}
                  className={cn(
                    isSbb() && "bg-lime-400 text-black hover:bg-lime-300"
                  )}
                />
              )
            }
          />
        </div>

        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="align-center flex h-36 w-screen items-center md:h-60 md:w-[calc(100vw-15rem)] lg:max-h-64" />
          ) : (
            <div className="flex h-80 items-center border-b">
              <Image
                alt="Cover Photo for Loan Program"
                className="mx-auto max-h-72"
                height={359}
                placeholderClassName="mx-auto max-h-64 max-w-full bg-slate-600"
                src={getImageURL(loanProgramDetails?.coverPhotoUrl)}
              />
            </div>
          )}
        </section>

        <section
          className={cn(
            "col-span-10 p-6 pt-8",
            "md:col-span-6 md:col-start-2 md:px-0"
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
