import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../providers"
import {
  businessFormSchema,
  BusinessFormValue
} from "../../../../constants/form"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useSelectCities } from "../../../../hooks/useSelectCities"
import { useEffect } from "react"
import { AutoCompleteStates } from "../../../molecules/AutoCompleteStates"
import { AutoCompleteCities } from "../../../molecules/AutoCompleteCities"
import { MaskInput, revertPattern, toPattern } from "@/components/ui/mask-input"
import { ArrowRight } from "lucide-react"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { cn } from "@/lib/utils"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { EIN_PATTERN } from "@/constants"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { useUpdateEffect } from "react-use"

export const BusinessInformationForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = {
    id: businessInformation?.id ?? "",
    businessLegalName: businessInformation?.businessLegalName ?? "",
    addressLine1: businessInformation?.addressLine1 ?? "",
    addressLine2: businessInformation?.addressLine2 ?? "",
    state: businessInformation?.state ?? "",
    city: businessInformation?.city ?? "",
    postalCode: businessInformation?.postalCode ?? "",
    businessWebsite: businessInformation?.businessWebsite ?? "",
    businessTin: businessInformation?.businessTin
      ? toPattern(businessInformation?.businessTin)
      : ""
  }

  const form = useForm<BusinessFormValue>({
    resolver: zodResolver(businessFormSchema),
    defaultValues,
    mode: "onBlur"
  })

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = (data: BusinessFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
      state: {
        ...data,
        businessTin: revertPattern(data.businessTin)
      }
    })
    finishCurrentStep()
  }
  // Update form values when businessInformation changes
  useUpdateEffect(() => {
    form.reset(defaultValues)
  }, [businessInformation])

  useEffect(() => {
    if (city) {
      form.setValue("city", city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue("state", state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue("city", "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        state: {
          ...data,
          businessTin: revertPattern(data.businessTin)
        }
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-3 gap-y-2xl gap-x-4xl">
          <TextInput
            placeholder="i.e: Larry's Latte"
            label="Business legal name"
            control={form.control}
            name="businessLegalName"
            className="col-span-3"
            required
          />
          <TextInput
            placeholder="i.e: 123 Coffee Lane"
            label="Business street address line #1"
            name="addressLine1"
            control={form.control}
            className="col-span-3"
            required
          />{" "}
          <TextInput
            placeholder="i.e: Suite 321"
            label="Business Street Address Line #2 (Optional)"
            name="addressLine2"
            control={form.control}
            className="col-span-3"
          />
          <AutoCompleteStates
            options={STATE_DATA}
            label="Business state"
            emptyText="No results found"
            name="state"
            control={form.control}
            onChange={handleChangeState}
            value={form.getValues("state")}
            className="col-span-3 lg:col-span-1"
            required
          />
          <AutoCompleteCities
            options={
              STATE_DATA.find((s) => s.name === form.getValues("state"))
                ?.cities ?? []
            }
            label="Business city"
            emptyText="No results found"
            name="city"
            control={form.control}
            onChange={handleChangeCity}
            value={form.getValues("city")}
            className="col-span-3 lg:col-span-1"
            required
          />
          <TextInput
            placeholder="i.e: 97531"
            label="Business zip code"
            name="postalCode"
            control={form.control}
            className="col-span-3 lg:col-span-1"
            required
          />
          <FormField
            control={form.control}
            name={"businessTin"}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="text-text-secondary">
                  EIN
                  <RequiredSymbol />
                </FormLabel>
                <FormControl>
                  <MaskInput
                    pattern={EIN_PATTERN}
                    placeholder="i.e: 12-3456789"
                    className="text-base"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TextInput
            placeholder="www.larryslatte.com"
            label="Business website"
            name="businessWebsite"
            control={form.control}
            className="col-span-3"
            inputClassName="pl-16"
            prefix="https://"
            prefixIcon={<p className="text-text-secondary">https://</p>}
          />
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ArrowRight className="ml-1 w-4" />
        </Button>
      )}
    </Card>
  )
}
