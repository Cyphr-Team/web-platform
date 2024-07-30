import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useTenant } from "@/providers/tenant-provider"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  getConfirmationTexts,
  launchKcConfirmationTexts
} from "../../../../constants"
import {
  confirmationFormSchema,
  ConfirmationFormValue
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

export const ConfirmationForm = () => {
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
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
    >
      <Form {...form}>
        {CONFIRMATION_TEXTS.map((text, index) => (
          <p key={index} className="text-sm text-text-secondary">
            <strong>{text.title}</strong>
            <p
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(text.content)
              }}
            />
          </p>
        ))}

        <form className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
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
                    placeholder="Your signature"
                    className="text-3xl island-moments-regular"
                    {...field}
                    disabled={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <TextInput
            label="Print name"
            control={form.control}
            name="printName"
            required
            className="col-span-1"
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
                  <Input className="text-base" {...field} disabled={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <Button
          type="submit"
          disabled={!form.formState.isValid || !isPreviousStepsCompleted}
          className="w-full flex items-center gap-1"
          onClick={form.handleSubmit(onSubmit)}
        >
          <span>Submit application</span>
          <ArrowRight className="w-5" />
        </Button>
      </Form>
    </Card>
  )
}
