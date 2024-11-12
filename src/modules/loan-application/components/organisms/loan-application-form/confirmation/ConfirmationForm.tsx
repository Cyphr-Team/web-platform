import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTenant } from "@/providers/tenant-provider"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  getConfirmationTexts,
  launchKcConfirmationTexts
} from "../../../../constants"
import {
  confirmationFormSchema,
  type ConfirmationFormValue
} from "../../../../constants/form"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../../../../models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../providers"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { sanitizeDOM } from "@/utils/file.utils"
import { isLaunchKC } from "@/utils/domain.utils"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function ConfirmationForm() {
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const { progress, finishCurrentStep } = useLoanApplicationProgressContext()

  const form = useForm<ConfirmationFormValue>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      printName: "",
      signatureDate: new Date().toLocaleDateString()
    },
    mode: "onChange"
  })

  const onSubmit = (data: ConfirmationFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      state: data,
      key: LOAN_APPLICATION_STEPS.CONFIRMATION
    })
    finishCurrentStep()
  }

  //check other progress completed
  const isPreviousStepsCompleted =
    progress.filter(
      (val) =>
        val.step !== LOAN_APPLICATION_STEPS.CONFIRMATION &&
        val.status !== LOAN_APPLICATION_STEP_STATUS.COMPLETE
    ).length === 0

  const tenant = useTenant()

  const CONFIRMATION_TEXTS = isLaunchKC()
    ? launchKcConfirmationTexts
    : getConfirmationTexts(tenant?.tenantData?.name ?? "")

  return (
    <FormLayout hideTopNavigation>
      <Form {...form}>
        {CONFIRMATION_TEXTS.map((text) => (
          <p
            key={text.title + text.content}
            className="text-sm text-text-secondary"
          >
            <strong>{text.title}</strong>
            <p
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(text.content)
              }}
              className="whitespace-pre-wrap"
            />
          </p>
        ))}

        <form className="grid grid-cols-2 gap-x-4xl gap-y-2xl">
          <FormField
            control={form.control}
            name="printName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-text-secondary">
                  Signature of Authorized Individual
                </FormLabel>
                <FormControl>
                  <Input
                    className="island-moments-regular text-3xl"
                    placeholder="Your signature"
                    {...field}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <TextInput
            required
            className="col-span-1"
            control={form.control}
            label="Print name"
            name="printName"
            placeholder="i.e: Larry's Latte"
          />
          <FormField
            control={form.control}
            name="signatureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text-secondary">
                  Signature Date
                </FormLabel>
                <FormControl>
                  <Input className="text-base" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <Button
          className="flex w-full items-center gap-1"
          disabled={!form.formState.isValid || !isPreviousStepsCompleted}
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          <span>Submit application</span>
        </Button>
      </Form>
    </FormLayout>
  )
}
