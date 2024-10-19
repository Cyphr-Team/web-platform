import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import {
  useProgress,
  useProgressSteps
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { RHFTextInput } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { memo, useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { APP_PATH } from "../../../../../constants"
import { toastSuccess } from "../../../../../utils"
import { TOAST_MSG } from "../../../../../constants/toastMsg"

function SignAndSubmitForm() {
  const navigate = useNavigate()
  const { finishStep } = useProgress.use.action()

  const steps = useProgressSteps()
  const data = useFormData.use["Sign and Submit"]()

  const method = useForm<SignFormValues>({
    resolver: zodResolver(signFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const onSubmit = useCallback(() => {
    finishStep(STEP.REVIEW_AND_SUBMIT)
    toastSuccess({
      ...TOAST_MSG.loanApplication.createSuccess
    })
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
  }, [finishStep, navigate])

  const isPreviousStepsCompleted =
    steps.filter(
      ([step, stepDetail]) =>
        step !== STEP.REVIEW_AND_SUBMIT && !stepDetail.isFinish
    ).length === 0

  return (
    <Card
      className={cn(
        "rounded-xl mx-6 col-span-8 md:p-2",
        "md:col-span-4 md:col-start-3 md:mx-auto",
        "max-w-screen-sm"
      )}
    >
      <CardHeader className="md:pb-5">
        <p className="text-sm">
          By submitting your information on the Cyphr Bank portal, you
          acknowledge and agree that Cyphr Bank provides recommendations based
          on the data you provide and the tool's analytical capabilities. These
          recommendations are intended to help you assess your loan readiness;
          however, they are not guarantees of loan approval. The final decision
          on loan approval rests with the lending institution, and various
          external factors may influence this decision. Cyphr does not assume
          responsibility for the actions or decisions of any lending
          institution. Additionally, while we strive to offer accurate and
          helpful advice, the recommendations provided may or may not apply to
          every financial institution's specific criteria and requirements. We
          encourage you to consult directly with your chosen financial
          institution for the most accurate and relevant guidance.
        </p>
      </CardHeader>

      <RHFProvider<SignFormValues>
        methods={method}
        onSubmit={method.handleSubmit(onSubmit)}
      >
        <CardContent>
          <div>
            <div>
              <RHFTextInput
                label="Signature of Authorized Individual"
                name={SIGN_FIELD_NAMES.PRINT_NAME}
                placeholder="Your signature"
                styleProps={{
                  inputClassName: "island-moments-regular text-3xl"
                }}
              />
            </div>
            <div className="flex gap-4 justify-between">
              <RHFTextInput
                required
                className="mt-6 space-y-2 flex-1"
                label="Print name"
                name={SIGN_FIELD_NAMES.PRINT_NAME}
                placeholder="i.e: Larry's Latte"
              />
              <RHFTextInput
                disabled
                className="mt-6 space-y-2 flex-1"
                label="Signature Date"
                name={SIGN_FIELD_NAMES.SIGNATURE_DATE}
              />
            </div>
          </div>
          <Button
            className="w-full mt-5"
            disabled={!isPreviousStepsCompleted}
            type="submit"
          >
            Submit application
          </Button>
        </CardContent>
      </RHFProvider>
    </Card>
  )
}

export default memo(SignAndSubmitForm)

const enum SIGN_FIELD_NAMES {
  PRINT_NAME = "printName",
  SIGNATURE_DATE = "signatureDate"
}

const signFormSchema = z.object({
  [SIGN_FIELD_NAMES.PRINT_NAME]: z.string().min(1, "Signature is required"),
  [SIGN_FIELD_NAMES.SIGNATURE_DATE]: z.string()
})

export type SignFormValues = z.infer<typeof signFormSchema>
