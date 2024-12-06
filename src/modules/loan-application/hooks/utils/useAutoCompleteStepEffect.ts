import { useCallback, useEffect } from "react"
import { type UseFormReturn } from "react-hook-form"
import { type LOAN_APPLICATION_STEPS } from "../../models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../providers"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider.tsx"
import { useClearGeneratedPDF } from "@/modules/loan-application/hooks/utils/useClearGeneratedPDF.tsx"

export const useAutoCompleteStepEffect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>,
  specificStep: LOAN_APPLICATION_STEPS,
  // use logicalValidState  when we need to add more special logic to mark complete
  logicalValidState?: boolean,
  skipReview?: boolean
) => {
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const { completeSpecificStep, removeCompleteSpecificStep } =
    useLoanApplicationProgressContext()
  const clearGeneratedPDF = useClearGeneratedPDF()

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
        clearGeneratedPDF()
      }
    })
  }, [
    clearGeneratedPDF,
    completeSpecificStep,
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
