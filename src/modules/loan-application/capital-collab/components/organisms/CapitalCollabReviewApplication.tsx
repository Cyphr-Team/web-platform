import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReviewApplicationStep } from "@/modules/loan-application/[module]-financial-projection/components/organisms/review-application/ReviewApplicationStep"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import {
  reviewApplicationSchema,
  type ReviewApplicationValue
} from "@/modules/loan-application/constants/form"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"

export function CapitalCollabReviewApplication() {
  const { progress, step, finishCurrentStep } =
    useLoanApplicationProgressContext()

  const { dispatchFormAction } = useLoanApplicationFormContext()

  const progressFilter = useMemo(() => {
    return progress.filter(
      (prog) =>
        prog.step != step &&
        prog.step != LOAN_APPLICATION_STEPS.CONFIRMATION &&
        prog.step != LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE
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
      <div className="mx-auto flex max-w-screen-lg flex-col gap-4 md:gap-8">
        <div>
          <h1 className="text-[2.125rem] font-semibold">Application Summary</h1>
          <p className="mt-1 text-sm">
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
              className="mx-3 w-full md:mx-auto"
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
