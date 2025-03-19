import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  DELETE_CURRENT_LOAN_PREFIX,
  NEW_CURRENT_LOAN_PREFIX
} from "@/modules/loan-application/constants"
import {
  currentLoansFormSchema,
  type CurrentLoansFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import _uniqueId from "lodash/uniqueId"
import { Plus } from "lucide-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { CurrentLoansFormItem } from "../../../molecules/CurrentLoansFormItem"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function CurrentLoansForm() {
  const { dispatchFormAction, currentLoansForm } =
    useLoanApplicationFormContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const defaultValues = useMemo(() => {
    return {
      hasOutstandingLoans:
        currentLoansForm?.hasOutstandingLoans.toString() ?? "",
      currentLoans: currentLoansForm?.currentLoans ?? []
    }
  }, [currentLoansForm?.hasOutstandingLoans, currentLoansForm?.currentLoans])

  const form = useForm<CurrentLoansFormValue>({
    resolver: zodResolver(currentLoansFormSchema),
    values: defaultValues,
    mode: "onBlur"
  })

  const currentLoansWatch = form.watch("currentLoans")
  const hasOutstandingLoansWatch = form.watch("hasOutstandingLoans")

  const handleAddLoan = () => {
    const currentLoans = form.getValues().currentLoans
    const newLength = currentLoans.push({
      id: _uniqueId(NEW_CURRENT_LOAN_PREFIX),
      lenderName: "",
      loanType: "",
      outstandingLoanBalance: 0,
      monthlyPaymentAmount: 0,
      loanTermRemainingInMonths: 0,
      annualInterestRate: 0
    })

    form.setValue("currentLoans", currentLoans, { shouldValidate: true })
    // Defer validation error when a new form is added
    form.trigger("currentLoans").then(() => {
      form.clearErrors(`currentLoans.${newLength - 1}`)
    })
  }

  const handleRemoveLoan = (index: number) => {
    const currentLoans = form.getValues().currentLoans

    // Must delete in DB
    if (
      !currentLoans[index].id.startsWith(NEW_CURRENT_LOAN_PREFIX) &&
      !currentLoans[index].id.startsWith(DELETE_CURRENT_LOAN_PREFIX)
    ) {
      currentLoans[index].id =
        DELETE_CURRENT_LOAN_PREFIX + currentLoans[index].id
      form.setValue("currentLoans", currentLoans)
      form.reset(
        {
          hasOutstandingLoans: "true",
          currentLoans
        },
        { keepValues: true }
      )
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        state: { ...form.getValues(), currentLoans }
      })
    } else {
      // Delete in FE only
      const updatedLoans = currentLoans.filter((_, i) => i !== index)

      form.setValue("currentLoans", updatedLoans, {
        shouldValidate: true
      })
    }
  }

  const onSubmit = (data: CurrentLoansFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.CURRENT_LOANS)

  return (
    <FormLayout title="Current Loans">
      <Form {...form}>
        <h5 className="text-lg font-semibold">Current Loans</h5>
        <Separator />
        <form>
          <Controller
            control={form.control}
            name="hasOutstandingLoans"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 gap-x-2xl">
                <FormLabel className="col-span-6 text-text-secondary xl:col-span-4">
                  <p className="text-sm font-medium text-text-secondary">
                    Does your business currently have outstanding loans?
                  </p>
                  <p className="text-sm font-medium text-text-tertiary">
                    (ex: term loans, revolving credit, equipment financing,
                    etc.)
                  </p>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (value == "false") {
                        // Delete new records only - so that if user turns back to YES, the fetched data persists
                        const updatedLoans = currentLoansWatch.filter(
                          (item) => !item.id.startsWith(NEW_CURRENT_LOAN_PREFIX)
                        )

                        form.setValue("currentLoans", updatedLoans)
                      } else {
                        const isFirstLoan = currentLoansWatch.length == 0

                        if (isFirstLoan) {
                          // Add default loan form when user chooses YES
                          handleAddLoan()
                        }
                      }
                      field.onBlur()
                      field.onChange(value.toString())
                    }}
                  >
                    <SelectTrigger className="col-span-6 text-base xl:col-span-2 xl:col-end-7 xl:ml-auto xl:max-w-40">
                      <SelectValue placeholder="Please select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">
                        <span>Yes</span>
                      </SelectItem>
                      <SelectItem value="false">
                        <span>No</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        {!!hasOutstandingLoansWatch && hasOutstandingLoansWatch != "false" && (
          <div className="mt-6 flex flex-col gap-3xl">
            {currentLoansWatch.map((item, index: number) => {
              if (item.id.startsWith(DELETE_CURRENT_LOAN_PREFIX)) {
                return <React.Fragment key={item.id} />
              }

              return (
                <CurrentLoansFormItem
                  key={item.id}
                  index={index}
                  onRemove={handleRemoveLoan}
                />
              )
            })}
            <Button
              className="col-span-1 ml-auto mr-0 mt-4 max-w-36"
              type="button"
              variant="outline"
              onClick={handleAddLoan}
            >
              <Plus className="mr-1 w-4" /> Add Loan
            </Button>
          </div>
        )}

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}
