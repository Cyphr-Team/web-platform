import { TopNav } from "../molecules/TopNav"
import { clsx } from "clsx"
import { useCallback, useMemo, type PropsWithChildren } from "react"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { useNavigate, useParams } from "react-router-dom"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"
import { LoanReadyPlan } from "@/modules/loanready/types/payment"
import { useGetLoanReadySubscriptionByApplicationId } from "@/modules/loanready/hooks/payment/useGetLoanReadySubscriptionByApplicationId"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { APP_PATH } from "@/constants"

export function ApplicantFinancialProjectionsLayout(
  props: PropsWithChildren
): JSX.Element {
  const navigate = useNavigate()
  const { children } = props
  const { id: loanApplicationId, loanProgramId } = useParams()
  const { data: loanReadySubscription, isLoading } =
    useGetLoanReadySubscriptionByApplicationId({
      applicationId: loanApplicationId ?? "",
      enabled: isEnableLoanReadyV2()
    })

  const isPlusPlan = useMemo(
    () =>
      loanReadySubscription?.subscriptions?.some(
        (subscription) => subscription.plan.toUpperCase() === LoanReadyPlan.PLUS
      ),
    [loanReadySubscription]
  )

  const onSubmit = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment, {
      state: {
        loanProgramId: loanProgramId,
        package: LoanReadyPlan.PLUS
      }
    })
  }, [navigate, loanProgramId])

  return (
    <div
      className={clsx("container bg-[#F9FAFB] p-2xl", {
        "md:p-4xl": !isEnableLoanReadyV2(),
        "md:p-xl pointer-events-auto blur-none overflow-scroll":
          isEnableLoanReadyV2() && isPlusPlan,
        "md:p-xl pointer-events-none blur-sm":
          isEnableLoanReadyV2() && !isPlusPlan
      })}
    >
      {!isEnableLoanReadyV2() && (
        <h1 className="text-3xl font-semibold">Financial Projections</h1>
      )}
      <p className="mt-1 text-sm text-text-tertiary">
        {isEnableLoanReadyV2()
          ? "This section provides an overview of your financial projections, including metrics, cash flow, balance sheets, income statements. It estimates future performance and shows how revenue and expenses could affect profitability."
          : "This page provides two views of your business's financial health. Current Financial Statements offer a snapshot of this month`s performance, created from your inputs and often required by lenders. Projections provide a high-level estimate of future performance, showing how revenue and expenses could impact profitability."}
      </p>
      <div className="my-4 mt-xl flex flex-col space-y-3xl">
        {loanApplicationId == "" ? (
          <EmptyApplications />
        ) : (
          <TopNav id={loanApplicationId} loanProgramId={loanProgramId} />
        )}
      </div>
      {isEnableLoanReadyV2() && isPlusPlan ? (
        <div className="flex-1 bg-gray-50 p-4xl pt-3xl">{children}</div>
      ) : null}
      {isEnableLoanReadyV2() && !isPlusPlan && !isLoading && (
        <CustomAlertDialog
          confirmText="Get LoanReady+"
          description={
            <span className="break-keep">
              Upgrade to LoanReady+ to view all aspects of your financial health
              in one place.
            </span>
          }
          isOpen={!isPlusPlan}
          title="Unlock full financial insights"
          onConfirmed={() => onSubmit()}
        />
      )}
    </div>
  )
}
