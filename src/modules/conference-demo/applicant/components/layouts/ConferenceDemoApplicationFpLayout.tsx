import { cn } from "@/lib/utils.ts"
import { type PropsWithChildren, useEffect } from "react"
import { FpTopNav } from "@/modules/conference-demo/applicant/components/molecules/FpTopNav.tsx"
import useRouter from "@/hooks/useRouter.ts"
import { APP_PATH } from "@/constants"
import { useLocation } from "react-router-dom"

function ConferenceDemoApplicationFpLayout({ children }: PropsWithChildren) {
  const location = useLocation()
  const { push } = useRouter()

  useEffect(() => {
    if (
      location.pathname ===
      APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.index
    ) {
      push(APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.overview)
    }
  }, [location, push])

  return (
    <div
      className={cn(
        "p-2xl bg-[#F9FAFB] container",
        "md:px-4xl md:py-4xl",
        "overflow-scroll"
      )}
    >
      <h1 className="text-3xl font-semibold">Financial Projections</h1>
      <p className="mt-1 text-sm text-text-tertiary">
        This page provides two views of your business's financial health.
        Current Financial Statements offer a snapshot of this month’s
        performance, created from your inputs and often required by lenders.
        Projections provide a high-level estimate of future performance, showing
        how revenue and expenses could impact profitability.
      </p>
      <div className="my-4 mt-xl flex flex-col space-y-3xl">
        <FpTopNav />
      </div>
      <div className="flex-1 bg-gray-50 p-4xl pt-3xl">{children}</div>
    </div>
  )
}

export default ConferenceDemoApplicationFpLayout
