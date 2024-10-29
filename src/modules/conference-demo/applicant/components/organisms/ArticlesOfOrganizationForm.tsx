import { Button } from "@/components/ui/button.tsx"
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
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"

function ArticlesOfOrganizationForm() {
  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep } = useProgress.use.action()
  const data = useFormData.use["Articles of Organization"]()

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
    finishStep(STEP.ARTICLES_OF_ORGANIZATION)
    goToStep(STEP.BANK_STATEMENTS)
  })

  useAutoCompleteStepEffect(methods, STEP.ARTICLES_OF_ORGANIZATION)

  return (
    <ConferenceFormLayout title="Articles of Organization">
      <div className="flex flex-col gap-3xl overflow-auto">
        <RHFProvider methods={methods}>
          <div className="flex flex-col gap-y-2xl  shadow-none">
            <h4 className="text-lg font-semibold">Articles of Organization</h4>
            <p className="text-sm text-text-secondary font-medium">
              Please upload a copy of your company’s Article of Organization
            </p>

            <RHFDragAndDropFileUpload
              id={STEP.ARTICLES_OF_ORGANIZATION}
              name="files"
            />

            {!isReviewApplicationStep && (
              <Button disabled={!isValid} onClick={handleSubmit}>
                Next
              </Button>
            )}
          </div>
        </RHFProvider>
      </div>
    </ConferenceFormLayout>
  )
}

export default memo(ArticlesOfOrganizationForm)
