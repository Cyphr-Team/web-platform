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
    <div className="overflow-auto flex flex-col flex-1">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="w-screen md:w-[calc(100vw-15rem)] h-36 md:h-52 lg:max-h-64 items-center align-center flex" />
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

          <div className="mt-10 px-8 py-9 bg-primary-solid rounded-2xl flex justify-between flex-wrap gap-4 items-center w-full">
            <h2 className="text-white text-2xl md:text-3xl font-medium mx-auto md:mx-0">
              Ready to see your Loan Readiness score?
            </h2>
            <div className="mx-auto md:mx-0">
              <LoanProgramDetailApply
                btnText="Start application"
                className="bg-lime-400 text-black hover:bg-lime-300 font-bold"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
