import { ButtonLoading } from "@/components/ui/button"
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
import SignUpGoogleButton from "./sign-up-google-button"
import {
  type GetStartUserFormValue,
  getStartFormSchema,
  useGetStart
} from "../../hooks/useGetStart"
import { useSearchParams } from "react-router-dom"

export function SignUpForm() {
  const { isPending, mutate } = useGetStart()
  const [searchParams] = useSearchParams()

  const form = useForm<GetStartUserFormValue>({
    resolver: zodResolver(getStartFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? ""
    }
  })

  const formSubmit = form.handleSubmit((data) => {
    mutate(data)
  })

  return (
    <div className="flex flex-col space-y-6">
      <SignUpGoogleButton />

      <Form {...form}>
        <form className="space-y-6 w-full mt-4" onSubmit={formSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <Input
                    className="text-base"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-muted-foreground">
            By clicking "Create account" or "Continue with Google", you
            acknowledge that you understand and agree to the{" "}
            <a
              className="underline"
              href="https://www.cyphrai.com/terms"
              rel="noopener noreferrer"
              target="terms"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="underline"
              href="https://www.cyphrai.com/privacy"
              rel="noopener noreferrer"
              target="privacy"
            >
              Privacy Policy
            </a>
            .
          </div>

          <ButtonLoading
            className="ml-auto w-full text-base"
            disabled={!form.formState.isValid}
            isLoading={isPending}
            type="submit"
          >
            Create account
          </ButtonLoading>
        </form>
      </Form>
    </div>
  )
}
