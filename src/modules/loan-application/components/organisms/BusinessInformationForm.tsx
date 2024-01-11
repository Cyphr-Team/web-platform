import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { BusinessFormValue, businessFormSchema } from "../../constants/form"

export const BusinessInformationForm = () => {
  const defaultValues = {
    name: "Larry’s Latte LLC",
    address: "123 Coffee Lane, Seattle, WA 98765",
    website: "https://www.larryslatte.com"
  }

  const form = useForm<BusinessFormValue>({
    resolver: zodResolver(businessFormSchema),
    defaultValues
  })

  const { changeProgress, changeStep } = useLoanApplicationContext()

  const handleSubmit = () => {
    changeProgress(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
    changeStep(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
  }

  return (
    <div className="flex flex-col flex-1 gap-3xl">
      <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
        <h5 className="text-lg font-semibold">Business Information</h5>
        <Separator />
        <Form {...form}>
          <form className="flex flex-col gap-2xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Business Legal Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: Larry’s Latte LLC"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Business Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: 123 Coffee Lane, Seattle, WA 98765"
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Business Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: Larry’s Latte LLC"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
      <div className="flex justify-end">
        <Button disabled={!form.formState.isValid} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}
