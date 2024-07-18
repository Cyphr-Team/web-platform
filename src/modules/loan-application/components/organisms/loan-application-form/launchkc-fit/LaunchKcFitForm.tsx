import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  LaunchKCFitFormValue,
  launchKcFitFormSchema
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { questions } from "./constants"

export const LaunchKCFitForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { launchKcFitForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = {
    id: launchKcFitForm?.id ?? "",
    loanApplicationId:
      launchKcFitForm?.loanApplicationId ?? loanRequest.applicationId ?? "",
    referralSource: launchKcFitForm?.referralSource ?? "",
    founderTies: launchKcFitForm?.founderTies ?? "",
    impact: launchKcFitForm?.impact ?? "",
    equityInclusion: launchKcFitForm?.equityInclusion ?? "",
    applied: launchKcFitForm?.applied ?? false,
    progress: launchKcFitForm?.progress ?? ""
  }

  const form = useForm<LaunchKCFitFormValue>({
    resolver: zodResolver(launchKcFitFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = (data: LaunchKCFitFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">LaunchKC Fit</h5>
            <Separator />
            <form className="flex flex-col gap-4xl">
              {questions.map((q) => (
                <TextAreaInput
                  key={q.field}
                  label={q.question}
                  control={form.control}
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
                        onValueChange={(value) => {
                          field.onBlur()
                          field.onChange(value === "yes" ? true : false)
                        }}
                        value={field.value ? "yes" : "no"}
                      >
                        <SelectTrigger className="text-base col-span-6 xl:col-span-2 max-w-40 xl:col-end-7 xl:ml-auto">
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
                label="If yes, what progress have you made since your previous application?"
                control={form.control}
                name="progress"
              />
            </form>
          </Card>

          {!isReviewApplicationStep(step) && (
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          )}
        </Form>
      </div>
    </div>
  )
}
