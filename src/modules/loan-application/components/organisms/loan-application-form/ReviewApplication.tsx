import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMemo } from "react"
import { ReviewApplicationStep } from "./ReviewApplicationStep"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  ReviewApplicationValue,
  reviewApplicationSchema
} from "../../../constants/form"
import { useLoanApplicationFormContext } from "../../../providers"
import { FORM_ACTION } from "../../../providers/LoanApplicationFormProvider"

export const ReviewApplication = () => {
  const { progress, step, finishCurrentStep } =
    useLoanApplicationProgressContext()
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const progressFilter = useMemo(() => {
    return progress.filter(
      (prog) =>
        prog.step != step && prog.step != LOAN_APPLICATION_STEPS.CONFIRMATION
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

  const onSubmit = (data: ReviewApplicationValue) => {
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
    <div className="col-span-8 grid grid-cols-8 gap-4 md:gap-6 mx-4 md:mx-8">
      <div className="col-span-2 text-2xl font-semibold">Application</div>
      <div className="col-span-6 flex flex-col gap-6">
        {progressFilter.map((prog) => {
          return <ReviewApplicationStep key={prog.step} stepProgress={prog} />
        })}
        <Form {...form}>
          <Button
            className="mx-3 md:mx-auto max-w-screen-sm w-full"
            disabled={
              !form.formState.isValid ||
              progressCompleteFilter.length !== progressFilter.length
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm Application Materials <ArrowRight className="ml-1 w-4" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
