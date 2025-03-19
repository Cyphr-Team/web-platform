import { useForm } from "react-hook-form"

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFProvider } from "@/modules/form-template/providers"
import { RHFLoanSlider } from "@/modules/conference-demo/applicant/components/molecules"
import { RHFTextInput } from "@/modules/form-template/components/molecules"
import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button.tsx"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect"
import useMagic from "@/modules/conference-demo/applicant/hooks/useMagic.ts"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"

export interface LoanRequest {
  loanAmount: number
  proposeUseOfLoan: string
}

const loanRequestFormSchema = z.object({
  loanAmount: z.number().optional(),
  proposeUseOfLoan: z.string().optional()
})

interface LoanRequestFormProps {
  wrapperClassName?: string
}

function LoanRequestForm({ wrapperClassName }: LoanRequestFormProps) {
  const minLoanAmount = 0
  const maxLoanAmount = 50_000

  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep } = useProgress.use.action()

  const data = useFormData.use["Loan Request"]()

  const method = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const onSubmit = useCallback(() => {
    finishStep(STEP.LOAN_REQUEST)
    goToStep(STEP.BUSINESS_INFORMATION)
  }, [finishStep, goToStep])

  const autofillData = {
    proposeUseOfLoan: "Expand production capacity and increase workforce"
  }

  useMagic(method, autofillData, 15)

  useAutoCompleteStepEffect(method, STEP.LOAN_REQUEST)

  return (
    <ConferenceFormLayout
      cardClassName="py-0"
      title="Loan Request"
      wrapperClassName={wrapperClassName}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Cyphr Bank Program</CardTitle>
        <CardDescription>
          Thank you for your interest in working with us.
          <span className="block">
            What is the loan amount you are requesting?
          </span>
          <span className="mt-1 block italic">
            (Please note, the actual loan amount you qualify for will be
            communicated by the lender.)
          </span>
        </CardDescription>
      </CardHeader>

      <RHFProvider methods={method} onSubmit={method.handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <div className="flex">
              <div className="flex-1">
                <RHFLoanSlider
                  label="Loan amount"
                  max={maxLoanAmount}
                  min={minLoanAmount}
                  name="loanAmount"
                />

                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="Proposed use of loan"
                  name="proposeUseOfLoan"
                  placeholder="i.e. Equipment loan "
                />
              </div>
            </div>
          </div>

          {!isReviewApplicationStep && (
            <Button
              className="mt-5 w-full"
              disabled={!method.formState.isValid}
              type="submit"
            >
              Next
            </Button>
          )}
        </CardContent>
      </RHFProvider>
    </ConferenceFormLayout>
  )
}

export default memo(LoanRequestForm)
