import { Card } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  ConfirmationFormValue,
  confirmationFormSchema
} from "../../constants/form"
import { ButtonLoading } from "@/components/ui/button"
import {
  CONFIRMATION_TEXTS,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS
} from "../../constants"
import { Input } from "@/components/ui/input"
import { useLoanApplicationContext } from "../../providers"
import { ArrowRight } from "lucide-react"

export const ConfirmationForm = () => {
  const { saveDraftForm, isSubmitting, progress } = useLoanApplicationContext()

  const form = useForm<ConfirmationFormValue>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      printName: "",
      signatureDate: new Date().toLocaleDateString()
    },
    mode: "onChange"
  })

  const onSubmit = (data: ConfirmationFormValue) => {
    saveDraftForm(LOAN_APPLICATION_STEPS.CONFIRMATION, data)
  }

  //check other progress completed
  const isPreviousStepsCompleted =
    progress.filter(
      (val) =>
        val.step !== LOAN_APPLICATION_STEPS.CONFIRMATION &&
        val.status !== LOAN_APPLICATION_STEP_STATUS.COMPLETE
    ).length === 0

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-6 col-start-2">
      <Form {...form}>
        {CONFIRMATION_TEXTS.map((text, index) => (
          <p key={index} className="text-sm text-text-secondary">
            <strong>{text.title}</strong> {text.content}
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
                    placeholder=""
                    className="text-3xl island-moments-regular"
                    {...field}
                    disabled={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="printName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text-secondary">
                  Print Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="i.e: Larry Latte"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
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

        <ButtonLoading
          type="submit"
          isLoading={isSubmitting}
          disabled={!form.formState.isValid || !isPreviousStepsCompleted}
          className="w-full flex items-center gap-1"
          onClick={form.handleSubmit(onSubmit)}
        >
          <span>Submit application</span>
          <ArrowRight className="w-5" />
        </ButtonLoading>
      </Form>
    </Card>
  )
}
