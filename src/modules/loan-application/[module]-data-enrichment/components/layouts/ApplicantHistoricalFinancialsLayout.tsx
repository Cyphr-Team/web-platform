import { clsx } from "clsx"
import React, { type PropsWithChildren, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { APP_PATH } from "@/constants"
import { useCheckLoanReadyPlan } from "@/modules/loan-application/[module]-financial-projection/hooks/loanready/useCheckLoanReadyPlan.ts"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import useBoolean from "@/hooks/useBoolean"

export function ApplicantHistoricalFinancialsLayout(
  props: PropsWithChildren
): React.JSX.Element {
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
        package: LoanReadyPlanEnum.PLUS
      }
    })
  }, [navigate, loanProgramId])

  return (
    <div
      className={clsx("container bg-[#F9FAFB] p-2xl", {
        "md:p-4xl": !isEnableLoanReadyV2(),
        "md:p-xl pointer-events-auto blur-none":
          isEnableLoanReadyV2() && isPlusPlan,
        "md:p-xl pointer-events-none blur-sm":
          isEnableLoanReadyV2() && !isPlusPlan
      })}
    >
      <p className="mb-2 text-sm text-text-primary">
        This section offers a summary of your past financial performance, based
        on data from your connected Plaid account and the way you've categorized
        your transactions.
      </p>

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
