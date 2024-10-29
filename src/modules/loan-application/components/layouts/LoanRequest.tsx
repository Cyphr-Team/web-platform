import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { toCurrency } from "@/utils"
import { useForm } from "react-hook-form"

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "../../providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { loanRequestFormSchema } from "../../constants/form"
import { useEffect, useMemo } from "react"
import {
  isKansasCity,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { UseOfLoan } from "@/types/loan-application.type"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "../../services"
import { useAutoCompleteStepEffect } from "../../hooks/useAutoCompleteStepEffect"
import { RHFTextInput } from "../../../form-template/components/molecules"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

interface LoanRequestProps {
  wrapperClassName?: string
}

export function CardWithForm({ wrapperClassName }: LoanRequestProps) {
  const { loanProgramDetails, loanProgramInfo } = useLoanProgramDetailContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { loanRequest, dispatchFormAction } = useLoanApplicationFormContext()
  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const defaultValues = useMemo(() => {
    return {
      id: loanRequest?.id ?? "",
      loanAmount: loanRequest?.loanAmount ?? minLoanAmount ?? 0,
      loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
      proposeUseOfLoan:
        loanRequest?.proposeUseOfLoan ??
        (isKansasCity() ? "" : UseOfLoan.OTHER),
      requestingInstitution: loanRequest?.requestingInstitution ?? ""
    }
  }, [
    loanProgramDetails?.maxTermInMonth,
    loanRequest?.id,
    loanRequest?.loanAmount,
    loanRequest?.proposeUseOfLoan,
    loanRequest?.requestingInstitution,
    minLoanAmount
  ])

  const form = useForm({
    resolver: zodResolver(loanRequestFormSchema),
    defaultValues: defaultValues,
    mode: "all"
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

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
        proposeUseOfLoan: form.getValues("proposeUseOfLoan"),
        requestingInstitution: form.getValues("requestingInstitution")
      }
    })
    // Change step status to next step
    finishCurrentStep()
  })

  useEffect(() => {
    /**
     * Auto saving
     */
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        state: {
          id: data.id ?? "",
          loanAmount: data.loanAmount,
          loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
          proposeUseOfLoan: data.proposeUseOfLoan
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
    <FormLayout title="Loan Request" wrapperClassName={wrapperClassName}>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{loanProgramDetails?.name}</CardTitle>
        <CardDescription>
          Thank you for your interest in working with us.{` `}
          <span className="block">
            What is the loan amount you are requesting?
          </span>
          <span className="block mt-1 italic">
            (Please note, the actual loan amount you qualify for will be
            communicated by the lender.)
          </span>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div>
              <div className="flex">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-base"
                            placeholder="Raise your loan amount"
                            type="text"
                            value={toCurrency(field.value, 0)}
                            onBlur={(event) => {
                              const value = parseFloat(
                                event.target.value.replace(/[^0-9.]/g, "")
                              )

                              if (isNaN(value)) return
                              if (value < minLoanAmount)
                                return field.onChange(minLoanAmount)
                              if (value > maxLoanAmount)
                                return field.onChange(maxLoanAmount)

                              return field.onChange(value)
                            }}
                            onChange={(event) => {
                              const value =
                                parseFloat(
                                  event.target.value.replace(/[^0-9.]/g, "")
                                ) || 0

                              if (isNaN(value)) return
                              if (value > maxLoanAmount)
                                return field.onChange(maxLoanAmount)
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!isLoanReady() && (
                    <FormField
                      control={form.control}
                      name="loanAmount"
                      render={({ field }) => (
                        <FormItem className="mb-6 mt-4">
                          <FormControl>
                            <Slider
                              {...field}
                              defaultValue={[field.value]}
                              max={maxLoanAmount}
                              min={minLoanAmount}
                              step={500}
                              value={[field.value]}
                              onValueChange={(vals) => {
                                field.onChange(vals[0])
                              }}
                            />
                          </FormControl>
                          <div className="flex justify-between pt-2 text-sm">
                            <div>{toCurrency(minLoanAmount, 0)}</div>

                            <div className="text-right">
                              {toCurrency(maxLoanAmount, 0)}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {!isLoanReady() &&
                    !isKccBank() &&
                    !isSbb() &&
                    !isLaunchKC() &&
                    !isKansasCity() && (
                      <FormField
                        control={form.control}
                        name="proposeUseOfLoan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proposed Use of Loan</FormLabel>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Please select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {loanProgramInfo?.loanPurposes?.map(
                                  (purpose) => (
                                    <SelectItem
                                      key={purpose.value}
                                      value={purpose.value}
                                    >
                                      {purpose.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                  {isKansasCity() && (
                    <RHFTextInput
                      className="mt-6 space-y-2"
                      label="Proposed use of loan"
                      name="proposeUseOfLoan"
                      placeholder="i.e. Equipment loan "
                    />
                  )}

                  {isKansasCity() && (
                    <RHFTextInput
                      className="mt-6 space-y-2"
                      label="Which bank or financial institution are you requesting or planning to request a loan from?"
                      name="requestingInstitution"
                      placeholder="Enter bank or financial institution"
                    />
                  )}
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
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </FormLayout>
  )
}

export function LoanRequest(props: LoanRequestProps) {
  return <CardWithForm {...props} />
}
