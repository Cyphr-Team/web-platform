import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"

const StepMapper: Record<STEP, { next: STEP | null; previous: STEP | null }> = {
  [STEP.LOAN_REQUEST]: {
    next: STEP.BUSINESS_INFORMATION,
    previous: null
  },
  [STEP.BUSINESS_INFORMATION]: {
    previous: STEP.LOAN_REQUEST,
    next: STEP.BUSINESS_PLAN
  },
  [STEP.BUSINESS_PLAN]: {
    previous: STEP.BUSINESS_INFORMATION,
    next: STEP.CASH_FLOW_VERIFICATION
  },
  [STEP.CASH_FLOW_VERIFICATION]: {
    previous: STEP.BUSINESS_PLAN,
    next: STEP.ARTICLES_OF_ORGANIZATION
  },
  [STEP.ARTICLES_OF_ORGANIZATION]: {
    previous: STEP.CASH_FLOW_VERIFICATION,
    next: STEP.BANK_STATEMENTS
  },
  [STEP.BANK_STATEMENTS]: {
    previous: STEP.ARTICLES_OF_ORGANIZATION,
    next: STEP.REVIEW_APPLICATION
  },
  [STEP.REVIEW_APPLICATION]: { previous: null, next: null },
  [STEP.REVIEW_AND_SUBMIT]: { previous: null, next: null }
}

interface FormLayoutProps {
  title?: string
  id?: string
  cardClassName?: string
  wrapperClassName?: string
  hideTopNavigation?: boolean
}

export function ConferenceFormLayout(
  props: PropsWithChildren<FormLayoutProps>
) {
  const {
    title,
    id,
    children,
    cardClassName,
    hideTopNavigation = false,
    wrapperClassName
  } = props

  const { goToStep } = useProgress.use.action()
  const currentStep = useProgress.use.currentStep()

  const isReviewStep =
    currentStep === STEP.REVIEW_AND_SUBMIT ||
    currentStep === STEP.REVIEW_APPLICATION

  const goPreviousStep = useCallback(() => {
    const previousStep = StepMapper[currentStep].previous

    if (previousStep) {
      goToStep(previousStep)
    }
  }, [currentStep, goToStep])

  const goNextStep = useCallback(() => {
    const nextStep = StepMapper[currentStep].next

    if (nextStep) {
      goToStep(nextStep)
    }
  }, [currentStep, goToStep])

  return (
    <div
      className={cn(
        "col-span-8 mx-6 flex h-fit flex-col gap-2xl overflow-auto rounded-lg shadow-none ",
        "md:col-span-6 md:col-start-2 md:mx-0",
        !isReviewStep ? "px-32" : null,
        wrapperClassName
      )}
    >
      {!isReviewStep && !hideTopNavigation ? (
        <div className="flex items-center justify-between">
          <ChevronLeft className="cursor-pointer" onClick={goPreviousStep} />
          <div className="text-2xl font-semibold">{title}</div>
          <ChevronRight className="cursor-pointer" onClick={goNextStep} />
        </div>
      ) : null}

      <Card
        className={cn(
          "flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl",
          cardClassName
        )}
        id={id}
      >
        {children}
      </Card>
    </div>
  )
}
