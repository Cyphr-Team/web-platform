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
import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { isSbb } from "@/utils/domain.utils"

export function SignUpForm() {
  const { isPending, mutate } = useGetStart()
  const [searchParams] = useSearchParams()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showError, setShowError] = useState(false)

  const form = useForm<GetStartUserFormValue>({
    resolver: zodResolver(getStartFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? ""
    }
  })

  const formSubmit = form.handleSubmit((data) => {
    if (isSbb()) {
      if (!agreedToTerms) {
        setShowError(true)
      } else {
        setShowError(false)
        mutate(data)
      }
    } else {
      mutate(data)
    }
  })

  const handleCheckboxChange = (checked: CheckedState) => {
    if (isSbb()) {
      const value = checked.valueOf() as boolean
      setAgreedToTerms(value)
      if (value) {
        setShowError(false)
      }
    }
  }

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

          {isSbb() && (
            <FormItem className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={handleCheckboxChange}
                  className="h-4 w-4"
                />
                <FormLabel
                  htmlFor="terms"
                  className="text-xs text-muted-foreground"
                >
                  I agree to the{" "}
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
                </FormLabel>
              </div>
              {showError && (
                <FormMessage className="flex text-base items-center font-light rounded-md p-2 border-2 border-[#FB9999] bg-[#FEE6E6]">
                  <AlertTriangle size={32} className="text-[#C40000] mr-2" />
                  <span className="text-xs text-[#B42318] font-medium">
                    You must accept the Terms of Service and Privacy Policy to
                    create an account
                  </span>
                </FormMessage>
              )}
            </FormItem>
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
