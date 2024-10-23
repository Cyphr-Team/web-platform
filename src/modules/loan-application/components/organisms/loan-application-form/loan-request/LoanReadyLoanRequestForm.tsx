import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { RHFLoanSlider } from "@/modules/conference-demo/applicant/components/molecules"
import { RHFSelectInput } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { loanRequestFormSchema } from "@/modules/loan-application/constants/form.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"

interface LoanReadyLoanRequestFormProps {
  wrapperClassName?: string
}

export function LoanReadyLoanRequestForm({
  wrapperClassName
}: LoanReadyLoanRequestFormProps) {
  const { loanProgramDetails, loanProgramInfo } = useLoanProgramDetailContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { loanRequest, dispatchFormAction } = useLoanApplicationFormContext()
  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const form = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    mode: "onBlur",
    values: {
      id: loanRequest?.id ?? "",
      loanAmount: loanRequest?.loanAmount ?? 0,
      loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 2,
      proposeUseOfLoan: loanRequest?.proposeUseOfLoan
    }
  })

  const handleSubmit = form.handleSubmit(() => {
    if (!loanProgramDetails) return

    // Set data to form context
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
      state: {
        id: form.getValues("id") ?? "",
        loanAmount: form.getValues("loanAmount"),
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan: form.getValues("proposeUseOfLoan")
      }
    })
    // Change step status to next step
    finishCurrentStep()
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.LOAN_REQUEST)

  return (
    <Card
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm w-full",
        wrapperClassName
      )}
    >
      <CardHeader className="text-center pb:0 md:pb-0">
        <CardTitle className="text-lg">Loan Request</CardTitle>
        <CardDescription className="text-secondary-400">
          Please specify the loan amount and how you intend to use the funds
          below.
        </CardDescription>
      </CardHeader>

      <RHFProvider methods={form} onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <div className="flex">
              <div className="flex-1">
                <RHFLoanSlider
                  label="Loan Amount"
                  max={maxLoanAmount}
                  min={minLoanAmount}
                  name="loanAmount"
                />

                <RHFSelectInput
                  label="Proposed Use of Loan"
                  name="proposeUseOfLoan"
                  options={loanProgramInfo?.loanPurposes ?? []}
                  placeholder="Please select..."
                />
              </div>
            </div>
          </div>
        </CardContent>

        {!isReviewApplicationStep(step) && (
          <CardFooter>
            <Button
              className="w-full"
              disabled={!form.formState.isValid}
              type="submit"
            >
              Next
            </Button>
          </CardFooter>
        )}
      </RHFProvider>
    </Card>
  )
}
