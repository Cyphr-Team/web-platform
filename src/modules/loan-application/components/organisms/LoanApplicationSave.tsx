import { ButtonLoading } from "@/components/ui/button"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../providers"
import { LOAN_PROGRESS_ACTION } from "../../providers/LoanProgressProvider"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../../models/LoanApplicationStep/type"
import { isSbb } from "@/utils/domain.utils"

export const LoanApplicationSave = () => {
  const { submitLoanForm, isSubmitting, loanRequest } =
    useLoanApplicationFormContext()
  const { progress, dispatchProgress } = useLoanApplicationProgressContext()

  const isSbbTenant = isSbb()
  /**
   * Because SBB have two business information form, we need to check if both forms are complete before save and close
   * or else they need to go back to the first form
   *
   * If they have done any of the form, they can save and close the application
   */

  const isAbleToSubmitSbbKybForm = () => {
    const partOne = progress.find(
      (step) =>
        step.step === LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
    )

    const partTwo = progress.find(
      (step) =>
        step.step === LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO
    )

    return {
      status: partOne?.status === partTwo?.status, // if both form are complete or both are incomplete then they can save and close
      uncompletedStep:
        partOne?.status === LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
          ? partOne
          : partTwo
    }
  }

  const loanRequestStep = progress.find(
    (val) => val.step === LOAN_APPLICATION_STEPS.LOAN_REQUEST
  )

  const isLoanRequestStepComplete =
    loanRequestStep?.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE

  /**
   * If the loan request form is complete, they can save and close the application
   * else they need to go back to the loan request form
   *
   * If they are editing the application (already have applicationId), they can save and close the application
   * because they have already completed the loan request form
   */

  const isAbleToSaveApplication =
    loanRequest?.applicationId ?? isSbbTenant
      ? isAbleToSubmitSbbKybForm().status
      : isLoanRequestStepComplete

  const confirmDescription = isSbbTenant
    ? "Please finish all the Business Information forms before save and close."
    : `Please finish "Loan Request" form before save and close.`

  const uncompletedStep = isSbbTenant
    ? isAbleToSubmitSbbKybForm().uncompletedStep?.step ?? progress[0].step
    : progress[0].step

  const onConfirmed = () => {
    if (!isAbleToSaveApplication) {
      dispatchProgress({
        type: LOAN_PROGRESS_ACTION.CHANGE_STEP,
        step: uncompletedStep
      })
    } else {
      submitLoanForm()
    }
  }

  const confirmText = isAbleToSaveApplication ? "Save & Close" : "Go to form"
  const description = isAbleToSaveApplication
    ? `Are you sure you want to save and close this application?`
    : confirmDescription

  return (
    <CustomAlertDialog
      onConfirmed={onConfirmed}
      title="Save & Close?"
      cancelText="Cancel"
      confirmText={confirmText}
      description={description}
    >
      <ButtonLoading isLoading={isSubmitting}>Save & Close</ButtonLoading>
    </CustomAlertDialog>
  )
}
