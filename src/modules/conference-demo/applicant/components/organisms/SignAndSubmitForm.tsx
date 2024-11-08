import { Button } from "@/components/ui/button.tsx"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import {
  useProgress,
  useProgressSteps
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { RHFTextInput } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { memo, useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { APP_PATH } from "@/constants"
import { toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"
import useMagic from "@/modules/conference-demo/applicant/hooks/useMagic.ts"

function SignAndSubmitForm() {
  const navigate = useNavigate()
  const { finishStep } = useProgress.use.action()

  const steps = useProgressSteps()
  const data = useFormData.use["Sign and Submit"]()

  const method = useForm<SignFormValues>({
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

  useMagic(
    method,
    {
      printName: "Larry's Latte"
    },
    128
  )

  return (
    <ConferenceFormLayout wrapperClassName="px-[8rem]">
      <p className="text-sm">
        By submitting your information on the Cyphr Bank portal, you acknowledge
        and agree that Cyphr Bank provides recommendations based on the data you
        provide and the tool's analytical capabilities. These recommendations
        are intended to help you assess your loan readiness; however, they are
        not guarantees of loan approval. The final decision on loan approval
        rests with the lending institution, and various external factors may
        influence this decision. Cyphr does not assume responsibility for the
        actions or decisions of any lending institution. Additionally, while we
        strive to offer accurate and helpful advice, the recommendations
        provided may or may not apply to every financial institution's specific
        criteria and requirements. We encourage you to consult directly with
        your chosen financial institution for the most accurate and relevant
        guidance.
      </p>

      <RHFProvider methods={method} onSubmit={method.handleSubmit(onSubmit)}>
        <div>
          <div>
            <RHFTextInput
              label="Signature of Authorized Individual"
              name={SignFieldName.PrintName}
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
              name={SignFieldName.PrintName}
              placeholder="i.e: Larry's Latte"
            />
            <RHFTextInput
              disabled
              className="mt-6 space-y-2 flex-1"
              label="Signature Date"
              name={SignFieldName.SignatureDate}
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
      </RHFProvider>
    </ConferenceFormLayout>
  )
}

export default memo(SignAndSubmitForm)

const enum SignFieldName {
  PrintName = "printName",
  SignatureDate = "signatureDate"
}

const signFormSchema = z.object({
  [SignFieldName.PrintName]: z.string().min(1, "Signature is required"),
  [SignFieldName.SignatureDate]: z.string()
})

export type SignFormValues = z.infer<typeof signFormSchema>
