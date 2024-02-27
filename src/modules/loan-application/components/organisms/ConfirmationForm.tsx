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
import { CONFIRMATION_TEXTS } from "../../constants"
import { Input } from "@/components/ui/input"
import { useLoanApplicationContext } from "../../providers"

export const ConfirmationForm = () => {
  const { submitForm } = useLoanApplicationContext()
  const form = useForm<ConfirmationFormValue>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      signature: "",
      name: "",
      signatureDate: new Date().toLocaleDateString()
    },
    mode: "onChange"
  })

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
            disabled={!form.formState.isValid}
            onClick={submitForm}
          >
            Submit
          </ButtonLoading>
        </div>
      </Form>
    </div>
  )
}
