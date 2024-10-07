import { useQueryGetUserLoanApplications } from "@/modules/loan-application/hooks/useQuery/useQueryUserLoanApplications"
import { TopNav } from "../molecules/TopNav"
import { cn } from "@/lib/utils"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import useRouter from "@/hooks/useRouter.ts"
import { APP_PATH } from "@/constants"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"

export const ApplicantFinancialProjectionsLayout: FC<PropsWithChildren> = (
  props
) => {
  const { children } = props
  const { push } = useRouter()

  // TODO: Endpoint to check if there exists any submitted loan application.
  const { data, isFetching } = useQueryGetUserLoanApplications({
    limit: 1000,
    offset: 0
  })

  const [setupId, setSetupId] = useState("")

  useEffect(() => {
    if (isFetching || !data?.pages) return

    const statusSet = new Set(
      [
        LoanApplicationStatus.SUBMITTED,
        LoanApplicationStatus.APPROVED,
        LoanApplicationStatus.DENIED,
        LoanApplicationStatus.READY_FOR_REVIEW,
        LoanApplicationStatus.IN_REVIEW
      ].map((status) => status.toLowerCase())
    )

    const submittedApplication = data.pages[0]?.data.find((application) =>
      statusSet.has(application.status.toLowerCase())
    )

    if (submittedApplication) {
      setSetupId(submittedApplication.id)
      push(
        `${APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW}#${submittedApplication.id}`
      )
    }
  }, [data?.pages, isFetching, push, setupId])

  return (
    <div
      className={cn(
        "p-2xl bg-[#F9FAFB] container",
        "md:px-4xl md:py-4xl",
        "overflow-scroll"
      )}
    >
      <h1 className="text-3xl font-semibold">Financial Projections</h1>
      <p className="text-text-tertiary mt-1 text-sm">
        This page provides two views of your business's financial health.
        Current Financial Statements offer a snapshot of this month’s
        performance, created from your inputs and often required by lenders.
        Projections provide a high-level estimate of future performance, showing
        how revenue and expenses could impact profitability.{" "}
      </p>
      <div className="my-4 flex flex-col space-y-3xl mt-xl">
        {!isFetching && setupId == "" ? (
          <EmptyApplications />
        ) : (
          <TopNav id={setupId} />
        )}
      </div>
      <div className="p-4xl pt-3xl flex-1 bg-gray-50">{children}</div>
    </div>
  )
}
