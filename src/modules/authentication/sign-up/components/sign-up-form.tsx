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
  GetStartUserFormValue,
  getStartFormSchema,
  useGetStart
} from "../../hooks/useGetStart"
import { useSearchParams } from "react-router-dom"
import { isEnableTermAgreementsCheckbox } from "@/utils/feature-flag.utils"

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
        <form onSubmit={formSubmit} className="space-y-6 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="text-base"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEnableTermAgreementsCheckbox() && (
            <div className="text-xs text-muted-foreground">
              By clicking "Create account" or "Continue with Google", you
              acknowledge that you understand and agree to the{" "}
              <a
                href="https://www.cyphrai.com/terms"
                className="underline"
                rel="noopener noreferrer"
                target="terms"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://www.cyphrai.com/privacy"
                className="underline"
                rel="noopener noreferrer"
                target="privacy"
              >
                Privacy Policy
              </a>
              .
            </div>
          )}

          <ButtonLoading
            isLoading={isPending}
            disabled={!form.formState.isValid}
            className="ml-auto w-full text-base"
            type="submit"
          >
            Create account
          </ButtonLoading>
        </form>
      </Form>
    </div>
  )
}
