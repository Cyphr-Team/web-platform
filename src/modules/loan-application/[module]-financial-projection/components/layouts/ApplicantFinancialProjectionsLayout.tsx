import { useQueryGetUserLoanApplications } from "@/modules/loan-application/hooks/useQuery/useQueryUserLoanApplications"
import { TopNav } from "../molecules/TopNav"
import { cn } from "@/lib/utils"
import { EmptyApplications } from "@/modules/loan-application/pages/LoanApplications"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export const ApplicantFinancialProjectionsLayout: React.FC<Props> = ({
  children
}) => {
  // TODO: Endpoint to check if there exists any submitted loan application.
  const { data, isFetching } = useQueryGetUserLoanApplications({
    limit: 1000,
    offset: 0
  })
  const [setupId, setSetupId] = useState("")

  useEffect(() => {
    if (isFetching) return
    const submittedApplication = data?.pages[0]?.data.filter(
      (application) =>
        application.status === LoanApplicationStatus.SUBMITTED.toLowerCase() ||
        application.status === LoanApplicationStatus.APPROVED.toLowerCase() ||
        application.status === LoanApplicationStatus.DENIED.toLowerCase() ||
        application.status ===
          LoanApplicationStatus.READY_FOR_REVIEW.toLowerCase() ||
        application.status === LoanApplicationStatus.IN_REVIEW.toLowerCase()
    )
    // We have 1-1 mapping between submitted application and setup id
    if (submittedApplication && submittedApplication.length > 0) {
      setSetupId(submittedApplication[0].id)
    }
  }, [data?.pages, isFetching, setupId])

  return (
    <div className={cn("px-2xl py-2xl bg-[#F9FAFB]", "md:px-4xl md:py-4xl")}>
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
      <div className={cn("p-4xl pt-3xl flex-1 overflow-auto bg-gray-50")}>
        {children}
      </div>
    </div>
  )
}
