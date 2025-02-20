import { TopNav } from "../molecules/TopNav"
import { clsx } from "clsx"
import { type PropsWithChildren, useCallback } from "react"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { useNavigate, useParams } from "react-router-dom"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { APP_PATH } from "@/constants"
import { useCheckLoanReadyPlan } from "@/modules/loan-application/[module]-financial-projection/hooks/loanready/useCheckLoanReadyPlan.ts"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import useBoolean from "@/hooks/useBoolean"

export function ApplicantFinancialProjectionsLayout(
  props: PropsWithChildren
): JSX.Element {
  const navigate = useNavigate()
  const { children } = props
  const { id: loanApplicationId, loanProgramId } = useParams()
  const { isPlusPlan, isLoading } = useCheckLoanReadyPlan({
    applicationId: loanApplicationId
  })
  const isOpen = useBoolean(!isPlusPlan)

  const onSubmit = useCallback(() => {
    navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment, {
      state: {
        loanProgramId: loanProgramId,
        package: LoanReadyPlanEnum.UPGRADE,
        applicationId: loanApplicationId
      }
    })
  }, [navigate, loanProgramId])

  return (
    <div
      className={clsx("bg-[#F9FAFB]", {
        "overflow-scroll": !isEnableLoanReadyV2(),
        "pointer-events-auto blur-none": isEnableLoanReadyV2() && isPlusPlan,
        "pointer-events-none blur-sm": isEnableLoanReadyV2() && !isPlusPlan
      })}
    >
      {!isEnableLoanReadyV2() && (
        <h1 className="text-3xl font-semibold">Financial Projections</h1>
      )}
      <p className="text-sm text-text-primary">
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
      {(isEnableLoanReadyV2() && isPlusPlan) || !isEnableLoanReadyV2() ? (
        <div className="flex-1 bg-gray-50 pt-3xl">{children}</div>
      ) : null}
      {isEnableLoanReadyV2() && !isPlusPlan && !isLoading && (
        <CustomAlertDialog
          cancelText="Cancel"
          confirmText="Get LoanReady+"
          description={
            <span className="break-keep">
              Upgrade to LoanReady+ to view all aspects of your financial health
              in one place.
            </span>
          }
          isOpen={isOpen.value}
          title="Unlock full financial insights"
          onCanceled={isOpen.onFalse}
          onConfirmed={() => onSubmit()}
        />
      )}
    </div>
  )
}
