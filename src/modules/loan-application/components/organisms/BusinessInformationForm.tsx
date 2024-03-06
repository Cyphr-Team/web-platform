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
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { BusinessFormValue, businessFormSchema } from "../../constants/form"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useSelectCities } from "../../hooks/useSelectCities"
import { useCallback, useEffect } from "react"
import { AutoCompleteStates } from "../molecules/AutoCompleteStates"
import { AutoCompleteCities } from "../molecules/AutoCompleteCities"
import { MaskInput, revertPattern, toPattern } from "@/components/ui/mask-input"

export const BusinessInformationForm = () => {
  const {
    draftForm,
    saveDraftForm,
    changeProgress,
    changeStep,
    setFormIsEdited
  } = useLoanApplicationContext()

  const defaultValues = {
    businessLegalName: draftForm.businessInformation?.businessLegalName ?? "",
    addressLine1: draftForm.businessInformation?.addressLine1 ?? "",
    addressLine2: draftForm.businessInformation?.addressLine2 ?? "",
    state: draftForm.businessInformation?.state ?? "",
    city: draftForm.businessInformation?.city ?? "",
    postalCode: draftForm.businessInformation?.postalCode ?? "",
    businessWebsite: draftForm.businessInformation?.businessWebsite ?? "",
    businessTin: draftForm.businessInformation?.businessTin
      ? toPattern(draftForm.businessInformation?.businessTin)
      : ""
  }

  const form = useForm<BusinessFormValue>({
    resolver: zodResolver(businessFormSchema),
    defaultValues,
    mode: "onBlur"
  })

  useEffect(() => {
    if (form.formState.isDirty && !form.formState.isSubmitted) {
      setFormIsEdited()
    }
  }, [form.formState, setFormIsEdited])

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

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
    if (city) {
      form.setValue("city", city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [state, city, form])

  const onSubmit = (data: BusinessFormValue) => {
    saveDraftForm(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION, {
      ...data,
      businessTin: revertPattern(data.businessTin)
    })
    changeStep(LOAN_APPLICATION_STEPS.OWNER_INFORMATION, true)
    changeProgress(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
  }

  const handleChangeEIN = useCallback(
    (ein: string) => {
      form.setValue("businessTin", ein, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    },
    [form]
  )

  return (
    <div className="flex flex-col flex-1 gap-3xl">
      <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
        <h5 className="text-lg font-semibold">Business Information</h5>
        <Separator />
        <Form {...form}>
          <form className="grid grid-cols-3 gap-y-2xl gap-x-4xl">
            <TextInput
              placeholder="i.e: Larry's Latte"
              label="Business Legal Name"
              control={form.control}
              name="businessLegalName"
              className="col-span-3"
            />
            <TextInput
              placeholder="i.e: 123 Coffee Lane"
              label="Business Street Address Line #1"
              name="addressLine1"
              control={form.control}
              className="col-span-3"
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
              label="Business State"
              emptyText="No results found"
              name="state"
              control={form.control}
              onChange={handleChangeState}
              value={form.getValues("state")}
            />
            <AutoCompleteCities
              options={
                STATE_DATA.find((s) => s.name === form.getValues("state"))
                  ?.cities ?? []
              }
              label="Business City"
              emptyText="No results found"
              name="city"
              control={form.control}
              onChange={handleChangeCity}
              value={form.getValues("city")}
            />
            <TextInput
              placeholder="i.e: 97531"
              label="Business Zip Code"
              name="postalCode"
              control={form.control}
            />
            <FormField
              control={form.control}
              name={"businessTin"}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel className="text-text-secondary">
                    Employer Identification Number (EIN)
                  </FormLabel>
                  <FormControl>
                    <MaskInput
                      placeholder="i.e: 12-3456789"
                      handleChange={handleChangeEIN}
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextInput
              placeholder="www.larryslatte.com"
              label="Business Website"
              name="businessWebsite"
              control={form.control}
              className="col-span-3"
              inputClassName="pl-16"
              prefix="https://"
              prefixIcon={<p className="text-text-secondary">https://</p>}
            />
          </form>
        </Form>
      </Card>
      <div className="flex justify-end">
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
