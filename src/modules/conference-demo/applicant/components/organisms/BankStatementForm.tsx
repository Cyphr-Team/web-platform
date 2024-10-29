import { Button } from "@/components/ui/button.tsx"
import { Card } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect.ts"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { documentFormSchema } from "@/modules/conference-demo/applicant/types"
import { RHFDragAndDropFileUpload } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { memo } from "react"
import { useForm } from "react-hook-form"

function BankStatementForm() {
  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep } = useProgress.use.action()
  const data = useFormData.use["Bank Statements"]()

  const methods = useForm({
    resolver: zodResolver(documentFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const {
    formState: { isValid },
    handleSubmit: onFormSubmit
  } = methods

  const handleSubmit = onFormSubmit(() => {
    finishStep(STEP.BANK_STATEMENTS)
    goToStep(STEP.REVIEW_APPLICATION)
  })

  useAutoCompleteStepEffect(methods, STEP.BANK_STATEMENTS)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-md md:w-full"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <RHFProvider methods={methods}>
          <Card className="flex flex-col gap-y-2xl p-4xl shadow-none">
            <h4 className="text-lg font-semibold">Bank Statements</h4>
            <p className="text-sm text-text-secondary font-medium">
              Please upload a copy of your three most recent bank statements
              (business or personal)
            </p>

            <RHFDragAndDropFileUpload id={STEP.BANK_STATEMENTS} name="files" />

            {!isReviewApplicationStep && (
              <Button disabled={!isValid} onClick={handleSubmit}>
                Next
              </Button>
            )}
          </Card>
        </RHFProvider>
      </div>
    </div>
  )
}

export default memo(BankStatementForm)
