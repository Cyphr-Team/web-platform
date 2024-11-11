import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { RHFLoanSlider } from "@/modules/conference-demo/applicant/components/molecules"
import { RHFSelectInput } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  type ILoanRequestFormValue,
  loanRequestFormSchema
} from "@/modules/loan-application/constants/form.ts"
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
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import { loanReadyLoanRequestFormSchema } from "@/modules/loan-application/constants/form[v2]"
import { type MicroLoanProgramType } from "@/types/loan-program.type"

interface LoanReadyLoanRequestFormProps {
  wrapperClassName?: string
}

function getOrDefault(
  loanRequestV2: ILoanRequestFormValue,
  loanProgramDetails?: MicroLoanProgramType
) {
  return {
    id: loanRequestV2?.id ?? "",
    applicationId: loanRequestV2?.applicationId ?? "",
    loanAmount: loanRequestV2?.loanAmount ?? 0,
    // Form V2 does not need this field, put it here to make it aligned with form V1
    loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 2,
    proposeUseOfLoan: loanRequestV2?.proposeUseOfLoan ?? ""
  }
}

export function LoanReadyLoanRequestForm({
  wrapperClassName
}: LoanReadyLoanRequestFormProps) {
  const { loanProgramDetails, loanProgramInfo } = useLoanProgramDetailContext()
  const { finishCurrentStep, completeSpecificStep, step } =
    useLoanApplicationProgressContext()
  const { loanRequest, loanRequestV2, dispatchFormAction } =
    useLoanApplicationFormContext()
  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const form = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    mode: "onBlur",
    values: {
      id: loanRequest?.id ?? "",
      applicationId: loanRequest?.id ?? "",
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
        id: loanRequest.applicationId ?? "",
        loanAmount: form.getValues("loanAmount"),
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan: form.getValues("proposeUseOfLoan")
      }
    })

    // Change step status to next step
    finishCurrentStep()
  })

  /**
   * Loan Request V2
   */
  const isEnabledFormV2 = isEnableFormV2()
  const formV2 = useForm({
    resolver: zodResolver(loanReadyLoanRequestFormSchema),
    mode: "onBlur",
    values: getOrDefault(loanRequestV2, loanProgramDetails)
  })

  const formV2HandleSubmit = formV2.handleSubmit(() => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2,
      state: {
        id: formV2.getValues("id") ?? "",
        applicationId: loanRequestV2?.applicationId ?? "",
        loanAmount: formV2.getValues("loanAmount") ?? 0,
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan: formV2.getValues("proposeUseOfLoan") ?? ""
      }
    })

    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
      state: {
        id: loanRequestV2.applicationId ?? "",
        loanAmount: form.getValues("loanAmount") ?? 0,
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan: form.getValues("proposeUseOfLoan")
      }
    })
    completeSpecificStep(LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2)

    finishCurrentStep()
  })

  const formToUse = isEnabledFormV2 ? formV2 : form
  const handleSubmitHandlerToUse = isEnabledFormV2
    ? formV2HandleSubmit
    : handleSubmit

  useAutoCompleteStepEffect(formToUse, LOAN_APPLICATION_STEPS.LOAN_REQUEST)
  useAutoCompleteStepEffect(formToUse, LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2)

  return (
    <FormLayout cardClassName={wrapperClassName} title="Loan Request">
      <CardHeader className="text-center p:0 md:p-0">
        <CardTitle className="text-lg">Loan Request</CardTitle>
        <CardDescription className="text-secondary-400">
          Please specify the loan amount and how you intend to use the funds
          below.
        </CardDescription>
      </CardHeader>

      <RHFProvider methods={formToUse} onSubmit={handleSubmitHandlerToUse}>
        <CardContent className="px:0 md:px-0">
          <div>
            <div className="flex">
              <div className="flex-1">
                <RHFLoanSlider
                  label="Loan amount"
                  max={maxLoanAmount}
                  min={minLoanAmount}
                  name="loanAmount"
                />

                <RHFSelectInput
                  label="Proposed use of loan"
                  name="proposeUseOfLoan"
                  options={loanProgramInfo?.loanPurposes ?? []}
                  placeholder="Please select..."
                  selectContentProps={{
                    side: "top"
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>

        {!isReviewApplicationStep(step) && (
          <CardFooter className="p:0 md:p-0">
            <Button
              className="w-full"
              disabled={!formToUse.formState.isValid}
              type="submit"
            >
              Next
            </Button>
          </CardFooter>
        )}
      </RHFProvider>
    </FormLayout>
  )
}
