import { useCallback, useEffect } from "react"
import { type UseFormReturn } from "react-hook-form"
import { LOAN_APPLICATION_STEPS } from "../models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../providers"
import { FORM_ACTION } from "../providers/LoanApplicationFormProvider"

export const useAutoCompleteStepEffect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>,
  specificStep: LOAN_APPLICATION_STEPS,
  // use logicalValidState  when we need to add more special logic to mark complete
  logicalValidState?: boolean,
  skipReview?: boolean
) => {
  const { eSignForm, dispatchFormAction } = useLoanApplicationFormContext()
  const { completeSpecificStep, removeCompleteSpecificStep } =
    useLoanApplicationProgressContext()

  /**
   * Using setTimeout to make sure
   * We will check form.formState.isValid after RHC updated form.formState.isValidating first
   */
  const updateCompleteStatus = useCallback(() => {
    setTimeout(() => {
      const isValid =
        logicalValidState !== undefined
          ? form.formState.isValid && logicalValidState
          : form.formState.isValid

      if (isValid) {
        completeSpecificStep(specificStep)
      } else {
        removeCompleteSpecificStep(specificStep)
      }

      if (!skipReview) {
        removeCompleteSpecificStep(LOAN_APPLICATION_STEPS.REVIEW_APPLICATION)

        // Remove document after the user edit loan application data
        if (eSignForm?.documentId) {
          dispatchFormAction({
            action: FORM_ACTION.SET_DATA,
            state: { documentId: "", sessionId: "" },
            key: LOAN_APPLICATION_STEPS.E_SIGN
          })
        }
      }
    })
  }, [
    completeSpecificStep,
    dispatchFormAction,
    eSignForm?.documentId,
    form.formState.isValid,
    logicalValidState,
    removeCompleteSpecificStep,
    skipReview,
    specificStep
  ])

  useEffect(() => {
    /**
     * We need to check both 'isDirty' | 'isValidating| and 'isValid' because we want to make sure that
     * The client touched the form first
     */
    if (form.formState.isDirty || form.formState.isValidating) {
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: specificStep,
        state: form.getValues()
      })

      updateCompleteStatus()
    }
  }, [
    updateCompleteStatus,
    form.formState.isValid,
    form.formState.isDirty,
    form.formState.isValidating,
    logicalValidState,
    form,
    dispatchFormAction,
    specificStep
  ])

  return updateCompleteStatus
}
