import { useCallback, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "../providers"

export const useAutoCompleteStepEffect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>,
  specificStep: LOAN_APPLICATION_STEPS
) => {
  const { completeSpecificStep, removeCompleteSpecificStep } =
    useLoanApplicationProgressContext()

  /**
   * Using setTimeout to make sure
   * We will check form.formState.isValid after RHC updated form.formState.isValidating first
   */
  const updateCompleteStatus = useCallback(() => {
    setTimeout(() => {
      if (form.formState.isValid) {
        completeSpecificStep(specificStep)
        removeCompleteSpecificStep(LOAN_APPLICATION_STEPS.REVIEW_APPLICATION)
      } else {
        removeCompleteSpecificStep(specificStep)
        removeCompleteSpecificStep(LOAN_APPLICATION_STEPS.REVIEW_APPLICATION)
      }
    })
  }, [
    completeSpecificStep,
    form.formState.isValid,
    removeCompleteSpecificStep,
    specificStep
  ])

  useEffect(() => {
    /**
     * We need to check both 'isDirty' | 'isValidating| and 'isValid' because we want to make sure that
     * The client touched the form first
     */
    if (form.formState.isDirty || form.formState.isValidating) {
      updateCompleteStatus()
    }
  }, [
    updateCompleteStatus,
    form.formState.isValid,
    form.formState.isDirty,
    form.formState.isValidating
  ])

  return updateCompleteStatus
}
