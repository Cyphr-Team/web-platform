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
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const ReviewApplicationForm = () => {
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
    <div className="col-span-8 grid grid-cols-8 gap-4 md:gap-6 mx-4 md:mx-8">
      {REVIEW_GROUP.map((reviewGroup) => (
        <ReviewApplicationGroup
          key={reviewGroup.key}
          label={reviewGroup.label}
          parentKey={reviewGroup.key}
        />
      ))}

      <div className="col-start-3 col-span-6 mb-8">
        <Form {...form}>
          <ButtonLoading
            className="mx-3 md:mx-auto max-w-screen-sm w-full"
            disabled={
              !form.formState.isValid ||
              completedSteps.length !== reviewableSteps.length
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm Application Materials <ArrowRight className="ml-1 w-4" />
          </ButtonLoading>
        </Form>
      </div>
    </div>
  )
}

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
  isReviewed: z.boolean()
})

type ReviewApplicationValue = z.infer<typeof reviewApplicationSchema>
