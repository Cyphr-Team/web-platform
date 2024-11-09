import { TopNav } from "../molecules/TopNav"
import { cn } from "@/lib/utils"
import { type PropsWithChildren } from "react"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { useParams } from "react-router-dom"

export function ApplicantFinancialProjectionsLayout(
  props: PropsWithChildren
): JSX.Element {
  const { children } = props
  const { id: loanApplicationId } = useParams()

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
        {loanApplicationId == "" ? (
          <EmptyApplications />
        ) : (
          <TopNav id={loanApplicationId} />
        )}
      </div>
      <div className="p-4xl pt-3xl flex-1 bg-gray-50">{children}</div>
    </div>
  )
}
