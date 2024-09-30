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
import { ArrowRight } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "@/modules/loan-application/providers"
import { loanRequestFormSchema } from "@/modules/loan-application/constants/form.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect.ts"
import { RHFSelectInput } from "@/modules/form-template/components/molecules"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { RHFProvider } from "@/modules/form-template/providers"
import { RHFLoanSlider } from "@/modules/conference-demo/applicant/components/molecules"

export function LoanReadyLoanRequestForm() {
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

  useEffect(() => {
    /**
     * Auto saving, although useAutoCompleteStepEffect did this, but I don't understand
     * why form don't save for me...
     */
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        state: {
          id: data.id,
          loanAmount: data.loanAmount,
          loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 2,
          proposeUseOfLoan: "" // TODO: fk this
        }
      })
    }
  }, [
    form.formState.isValidating,
    form,
    dispatchFormAction,
    loanProgramDetails?.maxTermInMonth
  ])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.LOAN_REQUEST)

  return (
    <Card
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm w-full"
      )}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Loan Request</CardTitle>
        <CardDescription>
          Thank you for your interest in working with us.
          <span className="block">
            What is the loan amount you are requesting?
          </span>
        </CardDescription>
      </CardHeader>

      <RHFProvider methods={form} onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <div className="flex">
              <div className="flex-1">
                <RHFLoanSlider
                  name="loanAmount"
                  min={minLoanAmount}
                  max={maxLoanAmount}
                  label=""
                />

                <RHFSelectInput
                  label="Proposed Use of Loan"
                  name="proposeUseOfLoan"
                  placeholder="Please select..."
                  options={loanProgramInfo?.loanPurposes ?? []}
                />
              </div>
            </div>
          </div>
        </CardContent>

        {!isReviewApplicationStep(step) && (
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          </CardFooter>
        )}
      </RHFProvider>
    </Card>
  )
}
