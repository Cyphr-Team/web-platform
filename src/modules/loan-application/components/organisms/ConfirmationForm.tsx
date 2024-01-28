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
import { useLoanApplicationContext } from "../../providers"
import { CONFIRMATION_TEXTS, LOAN_APPLICATION_STEPS } from "../../constants"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { useCreateLoanApplication } from "../../hooks/useCreateLoanApplication"

export const ConfirmationForm = () => {
  const navigate = useNavigate()

  const { changeProgress, changeStep } = useLoanApplicationContext()
  const { mutate, isPending } = useCreateLoanApplication()

  const form = useForm<ConfirmationFormValue>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      signature: "",
      name: "",
      signatureDate: new Date().toLocaleDateString()
    },
    mode: "onChange"
  })

  const onSubmit = (data: ConfirmationFormValue) => {
    mutate(data, {
      onSuccess() {
        changeProgress(LOAN_APPLICATION_STEPS.CONFIRMATION)
        changeStep(LOAN_APPLICATION_STEPS.CONFIRMATION)
        navigate(
          `${APP_PATH.LOAN_APPLICATION.INDEX}/${APP_PATH.LOAN_APPLICATION.SUBMISSION}`
        )
      }
    })
  }

  return (
    <div className="flex flex-col flex-1 gap-3xl">
      <Form {...form}>
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
          {CONFIRMATION_TEXTS.map((text, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <strong>{text.title}</strong> {text.content}
            </p>
          ))}

          <form className="grid grid-cols-2 gap-y-2xl gap-x-4xl ">
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-text-secondary">
                    Signature of Authorized Individual
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" className="text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Print Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Larry Latte"
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
        </Card>
        <div className="flex justify-end">
          <ButtonLoading
            isLoading={isPending}
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </ButtonLoading>
        </div>
      </Form>
    </div>
  )
}
