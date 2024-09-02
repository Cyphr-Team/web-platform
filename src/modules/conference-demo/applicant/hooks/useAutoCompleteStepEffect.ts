import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress"
import { useCallback, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

export const useAutoCompleteStepEffect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>,
  specificStep: STEP,
  // use logicalValidState when we need to add more special logic to mark complete
  logicalValidState?: boolean
) => {
  const { finishStep, markStepAsUnfinished } = useProgress.use.action()
  const { setFormData } = useFormData.use.action()

  /**
   * Using setTimeout to make sure
   * We will check form.formState.isValid after RHC updated form.formState.isValidating first
   */
  const updateCompleteStatus = useCallback(() => {
    setTimeout(() => {
      // const isValid =
      //   logicalValidState !== undefined
      //     ? form.formState.isValid && logicalValidState
      //     : form.formState.isValid

      // should valid of all time
      const isValid = true

      if (isValid) {
        finishStep(specificStep)
      } else {
        markStepAsUnfinished(specificStep)
      }
      markStepAsUnfinished(STEP.REVIEW_APPLICATION)
    })
  }, [finishStep, specificStep, markStepAsUnfinished])

  /**
   * This effect saves draft data whenever the user changes the input.
   * It also updates the application progress percentage based on whether the form is finished or unfinished.
   */
  useEffect(() => {
    /**
     * We need to check both 'isDirty' | 'isValidating| and 'isValid' because we want to make sure that
     * The client touched the form first
     */
    if (form.formState.isDirty || form.formState.isValidating) {
      setFormData({ step: specificStep, data: form.getValues() })

      updateCompleteStatus()
    }
  }, [
    updateCompleteStatus,
    form.formState.isValid,
    form.formState.isDirty,
    form.formState.isValidating,
    logicalValidState,
    specificStep,
    setFormData,
    form
  ])

  return updateCompleteStatus
}
