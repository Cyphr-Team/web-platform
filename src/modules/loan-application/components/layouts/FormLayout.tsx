import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { LoanProgressAction } from "@/modules/loan-application/providers/LoanProgressProvider.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"

interface FormLayoutProps {
  title?: string
  wrapperClassName?: string
  cardClassName?: string
  id?: string
  hideTopNavigation?: boolean
}

export function FormLayout(props: PropsWithChildren<FormLayoutProps>) {
  const {
    title,
    id,
    cardClassName,
    wrapperClassName,
    hideTopNavigation = false,
    children
  } = props

  const { dispatchProgress, step } = useLoanApplicationProgressContext()

  const handleNextStep = useCallback(() => {
    dispatchProgress({ type: LoanProgressAction.GoNextStep })
  }, [dispatchProgress])

  const handlePreviousStep = useCallback(() => {
    dispatchProgress({ type: LoanProgressAction.GoPreviousStep })
  }, [dispatchProgress])

  return (
    <div
      className={cn(
        "flex flex-col gap-2xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-0",
        wrapperClassName
      )}
    >
      {!hideTopNavigation && !isReviewApplicationStep(step) ? (
        <div className="flex items-center justify-between">
          <ChevronLeft
            className="cursor-pointer"
            onClick={handlePreviousStep}
          />
          <div className="text-2xl font-semibold">{title}</div>
          <ChevronRight className="cursor-pointer" onClick={handleNextStep} />
        </div>
      ) : null}

      <Card
        className={cn(
          "flex flex-col overflow-auto gap-2xl p-4xl rounded-lg h-fit",
          cardClassName
        )}
        id={id}
      >
        {children}
      </Card>
    </div>
  )
}
