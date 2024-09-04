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

  const isStepComplete = (step: LOAN_APPLICATION_STEPS) =>
    progress.find((val) => val.step === step)?.status ===
    LOAN_APPLICATION_STEP_STATUS.COMPLETE

  /**
   * Because SBB have two business information form, we need to check if both forms are complete before save and close
   * or else they need to go back to the first form
   *
   * If they have done any of the form, they can save and close the application
   */

  const isAbleToSubmitSbbKybForm = () => {
    const isCompletePartOne = isStepComplete(
      LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
    )

    const isCompletePartTwo = isStepComplete(
      LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO
    )

    const isCompletePrivacyPolicy = isStepComplete(
      LOAN_APPLICATION_STEPS.PRIVACY_POLICY
    )

    const isCompletePatriotAct = isStepComplete(
      LOAN_APPLICATION_STEPS.PATRIOT_ACT
    )

    const uncompletedStep = !isCompletePatriotAct
      ? LOAN_APPLICATION_STEPS.PATRIOT_ACT
      : !isCompletePrivacyPolicy
        ? LOAN_APPLICATION_STEPS.PRIVACY_POLICY
        : !isCompletePartOne
          ? LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
          : !isCompletePartTwo
            ? LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO
            : undefined
    /**
     * If all the forms are complete, they can save and close the application
     * else they need to go back to the uncompleted form
     *
     */
    const isAbleToSubmit =
      // Complete both kyb form or none
      isCompletePartOne === isCompletePartTwo &&
      isCompletePrivacyPolicy &&
      isCompletePatriotAct
    return {
      status: isAbleToSubmit,
      uncompletedStep
    }
  }

  const loanRequestStep =
    progress.find((val) => val.step === LOAN_APPLICATION_STEPS.LOAN_REQUEST) ||
    progress[0] // Default to first step if not found loan request step

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
    loanRequest?.applicationId || // If they are editing the application
    (isSbbTenant
      ? isAbleToSubmitSbbKybForm().status
      : isLoanRequestStepComplete)

  const confirmDescription = isSbbTenant
    ? "Please finish all the required forms before save and close."
    : `Please finish "Loan Request" form before save and close.`

  const uncompletedStep = isSbbTenant
    ? isAbleToSubmitSbbKybForm().uncompletedStep ?? progress[0].step
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
