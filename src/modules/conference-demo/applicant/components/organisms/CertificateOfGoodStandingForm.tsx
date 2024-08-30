import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { ArrowRight } from "lucide-react"
import { RHFProvider } from "@/modules/form-template/providers"
import { Card } from "@/components/ui/card.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFDragAndDropFileUpload } from "@/modules/form-template/components/molecules"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { documentFormSchema } from "@/modules/conference-demo/applicant/types"
import { memo } from "react"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"

const CertificateOfGoodStandingForm = () => {
  const data = useFormData.use["Certificate of Good Standing"]()

  const methods = useForm({
    resolver: zodResolver(documentFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const { goToStep } = useProgress.use.action()

  const {
    formState: { isValid },
    handleSubmit: onFormSubmit
  } = methods

  const handleSubmit = onFormSubmit(() => {
    goToStep(STEP.FICTITIOUS_NAME_CERTIFICATION)
  })

  useAutoCompleteStepEffect(methods, STEP.CERTIFICATE_OF_GOOD_STANDING)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <RHFProvider methods={methods}>
          <Card className="flex flex-col gap-y-2xl p-4xl shadow-none">
            <h4 className="text-lg font-semibold">
              Certificate of Good Standing
            </h4>
            <p className="text-sm text-text-secondary font-medium">
              Please upload your Certificate of Good Standing issued by your
              state's Secretary of State office
            </p>

            <RHFDragAndDropFileUpload name="files" />

            <Button disabled={!isValid} onClick={handleSubmit}>
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          </Card>
        </RHFProvider>
      </div>
    </div>
  )
}

export default memo(CertificateOfGoodStandingForm)
