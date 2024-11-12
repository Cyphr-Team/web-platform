import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { LoanProgramDetailApply } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailWelcomeLine } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"

export function LoanReadyProgramDetail() {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="align-center flex h-36 w-screen items-center md:h-52 md:w-[calc(100vw-15rem)] lg:max-h-64" />
          ) : (
            <AspectRatio
              className="flex items-center bg-gray-100"
              ratio={1220 / 200}
            >
              <Image
                alt="Cover Photo for Loan Program"
                className="mx-auto"
                placeholderClassName="bg-slate-100 max-h-64 mx-auto max-w-full"
                src={getImageURL(loanProgramDetails?.coverPhotoUrl)}
              />
            </AspectRatio>
          )}
        </section>

        <section
          className={cn(
            "pt-8 p-6 col-span-10 mt-10",
            "md:px-0 md:col-span-6 md:col-start-2"
          )}
        >
          <LoanProgramDetailWelcomeLine />

          <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-solid px-8 py-9">
            <h2 className="mx-auto text-2xl font-medium text-white md:mx-0 md:text-3xl">
              Ready to see your Loan Readiness score?
            </h2>
            <div className="mx-auto md:mx-0">
              <LoanProgramDetailApply
                btnText="Start application"
                className="bg-lime-400 font-bold text-black hover:bg-lime-300"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
