import { FieldValues, useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
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

export interface LoanRequest {
  loanAmount: number
  proposeUseOfLoan: string
}

const loanRequestFormSchema = z.object({
  loanAmount: z.number().optional(),
  proposeUseOfLoan: z.string().optional()
})

const LoanRequestForm = () => {
  const minLoanAmount = 0
  const maxLoanAmount = 50_000

  const isReviewApplicationStep = useIsReviewApplicationStep()
  const { goToStep, finishStep } = useProgress.use.action()

  const data = useFormData.use["Loan Request"]()

  const method = useForm<FieldValues>({
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
    <Card
      className={cn(
        "rounded-xl mx-6 col-span-8",
        "md:col-span-4 md:col-start-3 md:mx-auto",
        "max-w-screen-sm"
      )}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Cyphr Bank Program</CardTitle>
        <CardDescription>
          Thank you for your interest in working with us.
          <span className="block">
            What is the loan amount you are requesting?
          </span>
          <span className="block mt-1 italic">
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
                  name="loanAmount"
                  label="Loan amount"
                  min={minLoanAmount}
                  max={maxLoanAmount}
                />

                <RHFTextInput
                  name="proposeUseOfLoan"
                  placeholder="i.e. Equipment loan "
                  label="Proposed use of loan"
                  className="mt-6 space-y-2"
                />
              </div>
            </div>
          </div>

          {!isReviewApplicationStep && (
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={!method.formState.isValid}
            >
              Next
            </Button>
          )}
        </CardContent>
      </RHFProvider>
    </Card>
  )
}

export default memo(LoanRequestForm)
