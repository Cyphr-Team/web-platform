import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import {
  launchKcFitFormSchema,
  type LaunchKCFitFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { questions } from "./constants"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function LaunchKCFitForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { launchKcFitForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: launchKcFitForm?.id ?? "",
      loanApplicationId:
        launchKcFitForm?.loanApplicationId ?? loanRequest?.applicationId ?? "",
      referralSource: launchKcFitForm?.referralSource ?? "",
      businessLocation: launchKcFitForm?.businessLocation ?? "",
      founderTies: launchKcFitForm?.founderTies ?? "",
      locationChoiceReason: launchKcFitForm?.locationChoiceReason ?? "",
      impact: launchKcFitForm?.impact ?? "",
      equityInclusion: launchKcFitForm?.equityInclusion ?? "",
      applied: launchKcFitForm?.applied ?? false,
      progress: launchKcFitForm?.progress ?? ""
    }),
    [launchKcFitForm, loanRequest]
  )

  const form = useForm<LaunchKCFitFormValue>({
    resolver: zodResolver(launchKcFitFormSchema),
    mode: "onChange",
    values: defaultValues
  })

  const onSubmit = (data: LaunchKCFitFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT,
      state: data
    })
    finishCurrentStep()
  }

  // apply = true => progress must be fill
  // apply = false => don't care
  const isFormValid =
    form.formState.isValid &&
    (form.watch("applied") ? !!form.watch("progress") : true)

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT,
    isFormValid
  )

  return (
    <FormLayout>
      <Form {...form}>
        <h5 className="text-lg font-semibold">LaunchKC Fit</h5>
        <Separator />
        <form className="flex flex-col gap-4xl">
          {questions.map((q) => (
            <TextAreaInput
              key={q.field}
              control={form.control}
              label={q.question}
              name={q.field as keyof LaunchKCFitFormValue}
            />
          ))}
          <Controller
            control={form.control}
            name="applied"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="text-text-secondary">
                  <p className="text-sm text-text-secondary font-medium">
                    Have you applied to LaunchKC previously?
                  </p>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => {
                      field.onBlur()
                      field.onChange(value === "yes")
                    }}
                  >
                    <SelectTrigger className="text-sm col-span-6 xl:col-span-2 max-w-40 xl:col-end-7 xl:ml-auto">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">
                        <span>Yes</span>
                      </SelectItem>
                      <SelectItem value="no">
                        <span>No</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TextAreaInput
            key="progress"
            control={form.control}
            label="If yes, what progress have you made since your previous application?"
            name="progress"
          />
        </form>

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!isFormValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}
