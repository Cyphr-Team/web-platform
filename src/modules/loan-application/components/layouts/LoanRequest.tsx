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
import {
  type ILoanRequestFormValue,
  loanRequestFormSchema
} from "../../constants/form"
import { useEffect, useMemo } from "react"
import {
  isCapitalCollab,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { UseOfLoan } from "@/types/loan-application.type"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "../../services"
import { useAutoCompleteStepEffect } from "../../hooks/utils/useAutoCompleteStepEffect.ts"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { loanRequestSchemasByInstitution } from "../../constants/form-v2"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import { type MicroLoanProgramType } from "@/types/loan-program.type"
import { RHFSelectInput } from "@/modules/form-template/components/molecules"

interface LoanRequestProps {
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
    proposeUseOfLoan: loanRequestV2?.proposeUseOfLoan ?? UseOfLoan.OTHER,
    // Form V2 does not need below fields, put them here to make them aligned with form V1
    loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 2,
    requestingInstitution: ""
  }
}

export function CardWithForm({ wrapperClassName }: LoanRequestProps) {
  const { loanProgramDetails, loanProgramInfo } = useLoanProgramDetailContext()
  const { finishCurrentStep, completeSpecificStep, step } =
    useLoanApplicationProgressContext()
  const { loanRequest, loanRequestV2, dispatchFormAction } =
    useLoanApplicationFormContext()
  const minLoanAmount = loanProgramDetails?.minLoanAmount ?? 0
  const maxLoanAmount = loanProgramDetails?.maxLoanAmount ?? 0

  const defaultValues = useMemo(() => {
    return {
      id: loanRequest?.id ?? "",
      applicationId: loanRequest?.id ?? "",
      loanAmount: loanRequest?.loanAmount ?? minLoanAmount ?? 0,
      loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
      proposeUseOfLoan: loanRequest?.proposeUseOfLoan ?? UseOfLoan.OTHER,
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
        requestingInstitution: form.getValues("requestingInstitution") ?? ""
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

  /**
   * Loan Request V2
   */

  const formV2 = useForm({
    resolver: zodResolver(loanRequestSchemasByInstitution()),
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
        loanAmount: formV2.getValues("loanAmount"),
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan:
          formV2.getValues("proposeUseOfLoan") ?? UseOfLoan.OTHER
      }
    })

    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
      state: {
        id: loanRequestV2.applicationId ?? "",
        loanAmount: form.getValues("loanAmount"),
        loanTermInMonth: loanProgramDetails?.maxTermInMonth ?? 0,
        proposeUseOfLoan: form.getValues("proposeUseOfLoan"),
        requestingInstitution: form.getValues("requestingInstitution") ?? ""
      }
    })

    completeSpecificStep(LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2)
    finishCurrentStep()
  })

  const isEnabledFormV2 = isEnableFormV2()
  const formToUse = isEnabledFormV2 ? formV2 : form
  const handleSubmitHandlerToUse = isEnabledFormV2
    ? formV2HandleSubmit
    : handleSubmit

  useAutoCompleteStepEffect(formToUse, LOAN_APPLICATION_STEPS.LOAN_REQUEST)
  useAutoCompleteStepEffect(formToUse, LOAN_APPLICATION_STEPS.LOAN_REQUEST_V2)

  const getSubtitle = () => {
    if (isCapitalCollab()) {
      return "What amount will you be requesting?"
    }

    return "What is the loan amount you are requesting?"
  }

  // Enable use of loan component (check institution compatibility)
  const isEnableUseOfLoanV2 = isCapitalCollab()
  const isEnableUseOfLoan =
    !isLoanReady() &&
    !isKccBank() &&
    !isSbb() &&
    !isLaunchKC() &&
    !isEnableUseOfLoanV2
  const isEnableShowOverMaxLoanAmount = isCapitalCollab()

  return (
    <FormLayout title="Loan Request" wrapperClassName={wrapperClassName}>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">
          {isCapitalCollab() ? "Loan Request" : loanProgramDetails?.name}
        </CardTitle>
        <CardDescription>
          Thank you for your interest in working with us.{` `}
          <span className="block">{getSubtitle()}</span>
          {!isCapitalCollab() && (
            <span className="mt-1 block italic">
              (Please note, the actual loan amount you qualify for will be
              communicated by the lender.)
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <Form {...formToUse}>
        <form onSubmit={handleSubmitHandlerToUse}>
          <CardContent>
            <div>
              <div className="flex">
                <div className="flex-1">
                  <FormField
                    control={formToUse.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Loan amount</FormLabel>
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
                      control={formToUse.control}
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
                              {isEnableShowOverMaxLoanAmount ? "+" : null}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {isEnableUseOfLoan ? (
                    <FormField
                      control={formToUse.control}
                      name="proposeUseOfLoan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed use of loan</FormLabel>
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
                              {loanProgramInfo?.loanPurposes?.map((purpose) => (
                                <SelectItem
                                  key={purpose.value}
                                  value={purpose.value}
                                >
                                  {purpose.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}

                  {isEnableUseOfLoanV2 ? (
                    <RHFSelectInput
                      label="Proposed use of loan"
                      name="proposeUseOfLoan"
                      options={loanProgramInfo?.loanPurposes ?? []}
                      placeholder="Please select..."
                      selectContentProps={{
                        side: "top"
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>

          {!isReviewApplicationStep(step) && (
            <CardFooter>
              <Button
                className="w-full"
                disabled={!formToUse.formState.isValid}
                type="submit"
              >
                Next {!isCapitalCollab() && <ArrowRight className="ml-1 w-4" />}
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
