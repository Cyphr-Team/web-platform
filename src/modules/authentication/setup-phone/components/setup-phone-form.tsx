import { Button, ButtonLoading } from "@/components/ui/button"
import {
  ErrorMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { useForm, useFormContext } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import { APP_PATH } from "@/constants"
import PhoneInput from "react-phone-number-input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  setupPhoneFormSchema,
  type SetupPhoneFormValue,
  useSetupPhone
} from "../hooks/useSetupPhone"
import { SetupPhoneFormHeader } from "./setup-phone-form-header"
import { getCustomErrorMsgByCode } from "@/utils/custom-error"
import {
  CountrySelect,
  type CountrySelectProps,
  CustomPhoneInput,
  PHONE_COUNTRIES_WHITELIST
} from "@/components/ui/phone-input"

function ResetPhoneForm() {
  const { state } = useLocation()
  const { handleSubmit, control, setValue, formState } =
    useFormContext<SetupPhoneFormValue>()
  const { isPending, mutate, error } = useSetupPhone(state)

  const errorMsg = error?.response?.data.message
  const errorCode = error?.response?.data.code

  return (
    <form
      className="w-full space-y-5"
      onSubmit={handleSubmit((data) =>
        mutate(data, {
          onSuccess() {
            setValue("successMsg", "Redirect message")
          }
        })
      )}
    >
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                countrySelectComponent={(props: CountrySelectProps) =>
                  CountrySelect({
                    ...props,
                    whitelist: PHONE_COUNTRIES_WHITELIST
                  })
                }
                defaultCountry="US"
                inputComponent={CustomPhoneInput}
                placeholder="+1 (555) 000-0000"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {Boolean(errorMsg) && (
        <div>
          <ErrorMessage className="whitespace-pre-wrap">
            {`${errorMsg}. ${getCustomErrorMsgByCode(errorCode!)}`}
          </ErrorMessage>
        </div>
      )}

      <ButtonLoading
        className="ml-auto w-full text-base"
        disabled={!formState.isValid}
        isLoading={isPending}
        type="submit"
      >
        Next
      </ButtonLoading>
    </form>
  )
}

export function SetupPhoneForm() {
  const form = useForm<SetupPhoneFormValue>({
    resolver: zodResolver(setupPhoneFormSchema),
    defaultValues: { phone: "" },
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all"
  })

  return (
    <>
      <Form {...form}>
        <SetupPhoneFormHeader />
        <ResetPhoneForm />
      </Form>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Button asChild className="p-0 text-primary" variant="link">
          <Link to={APP_PATH.LOGIN}>Log in</Link>
        </Button>
      </p>
    </>
  )
}
