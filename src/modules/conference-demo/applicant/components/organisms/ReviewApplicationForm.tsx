import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReviewApplicationGroup } from "@/modules/conference-demo/applicant/components/molecules/ReviewApplicationGroup"
import {
  INPUT_GROUP,
  STEP
} from "@/modules/conference-demo/applicant/constants"
import {
  useProgress,
  useProgressSteps
} from "@/modules/conference-demo/applicant/stores/useProgress"
import { zodResolver } from "@hookform/resolvers/zod"
import { memo, useMemo } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

function ReviewApplicationForm() {
  const steps = useProgressSteps()
  const currentStep = useProgress.use.currentStep()
  const { finishStep, goToStep } = useProgress.use.action()

  const form = useForm<ReviewApplicationValue>({
    resolver: zodResolver(reviewApplicationSchema),
    defaultValues: {
      isReviewed: true
    },
    mode: "onBlur"
  })

  const reviewableSteps = useMemo(() => {
    const disableReviewSteps: string[] = [
      STEP.REVIEW_APPLICATION,
      STEP.REVIEW_AND_SUBMIT
    ]

    return steps.filter(
      ([step]) => step != currentStep && !disableReviewSteps.includes(step)
    )
  }, [currentStep, steps])

  const completedSteps = useMemo(() => {
    return reviewableSteps.filter(([, detail]) => detail.isFinish)
  }, [reviewableSteps])

  const onSubmit = async () => {
    setTimeout(() => {
      finishStep(currentStep)
      goToStep(STEP.REVIEW_AND_SUBMIT)
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
        {REVIEW_GROUP.map((reviewGroup) => (
          <ReviewApplicationGroup
            key={reviewGroup.key}
            parentKey={reviewGroup.key}
          />
        ))}

        <Form {...form}>
          <ButtonLoading
            className="mx-3 w-full md:mx-auto"
            disabled={
              !form.formState.isValid ||
              completedSteps.length !== reviewableSteps.length
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm application
          </ButtonLoading>
        </Form>
      </div>
    </div>
  )
}

export default memo(ReviewApplicationForm)

const REVIEW_GROUP = [
  {
    key: INPUT_GROUP.APPLICATION,
    label: "Application"
  },
  {
    key: INPUT_GROUP.DOCUMENTATION,
    label: "Documentation"
  }
]

const reviewApplicationSchema = z.object({
  isReviewed: z.boolean().optional()
})

type ReviewApplicationValue = z.infer<typeof reviewApplicationSchema>
