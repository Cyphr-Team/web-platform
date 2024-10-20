import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMemo } from "react"

import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReviewApplicationStep } from "@/modules/loan-application/[module]-financial-projection/components/organisms/review-application/ReviewApplicationStep"
import { isEnableKycReOrder } from "@/utils/feature-flag.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  type ReviewApplicationValue,
  reviewApplicationSchema
} from "../../../../constants/form"
import { useLoanApplicationFormContext } from "../../../../providers"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"

export function FinancialProjectionReviewApplication() {
  const { progress, step, finishCurrentStep } =
    useLoanApplicationProgressContext()

  const { dispatchFormAction } = useLoanApplicationFormContext()

  const progressFilter = useMemo(() => {
    return progress.filter(
      (prog) =>
        prog.step != step &&
        prog.step != LOAN_APPLICATION_STEPS.CONFIRMATION &&
        prog.step != LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE &&
        (isEnableKycReOrder() ||
          prog.step != LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION)
    )
  }, [step, progress])

  const progressCompleteFilter = useMemo(() => {
    return progressFilter.filter(
      (prog) => prog.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
    )
  }, [progressFilter])

  const form = useForm<ReviewApplicationValue>({
    resolver: zodResolver(reviewApplicationSchema),
    defaultValues: {
      isReviewed: true
    },
    mode: "onBlur"
  })

  const onSubmit = async (data: ReviewApplicationValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION,
      state: data
    })

    /**
     * Because [useAutoCompleteStepEffect] is using setTimeout with 0ms,
     * If the onBlur and Click submit button event both trigger at the same time,
     * The final check should be [finishCurrentStep],
     * To ensure that final check we should use setTimeout with 10ms.
     */
    setTimeout(() => {
      finishCurrentStep()
    }, 10)
  }

  return (
    <div className="col-span-8 mx-4 md:mx-8">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8">
        <div>
          <h1 className="text-[2.125rem] font-semibold">Application Summary</h1>
          <p className="text-sm mt-1">
            Please review your application below. If you need to make any
            changes, simply double-click on your answers to edit.
          </p>
        </div>
        <div className="col-span-8 flex flex-col gap-4 md:gap-8">
          {progressFilter.map((prog) => {
            return <ReviewApplicationStep key={prog.step} stepProgress={prog} />
          })}
        </div>
        <div className="text-right">
          <Form {...form}>
            <ButtonLoading
              className="mx-3 md:mx-auto w-full"
              disabled={
                !form.formState.isValid ||
                progressCompleteFilter.length !== progressFilter.length
              }
              onClick={form.handleSubmit(onSubmit)}
            >
              Confirm application
            </ButtonLoading>
          </Form>
        </div>
      </div>
    </div>
  )
}
