import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { BusinessFormValue, businessFormSchema } from "../../constants/form"
import { AutoCompleteStates } from "../molecules/AutocompleteStates"
import { AutoCompleteCities } from "../molecules/AutoCompleteCities"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useSelectCities } from "../../hooks/useSelectCities"
import { useEffect } from "react"

export const BusinessInformationForm = () => {
  const defaultValues = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    zipCode: "",
    website: "",
    tin: ""
  }

  const form = useForm<BusinessFormValue>({
    resolver: zodResolver(businessFormSchema),
    defaultValues,
    mode: "onBlur"
  })

  const {
    handleChangeState,
    handleChangeCity,
    STATE_CITIES_DATA,
    STATE_DATA,
    state,
    city
  } = useSelectCities()

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

  const { changeProgress, changeStep } = useLoanApplicationContext()

  const handleSubmit = () => {
    changeProgress(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
    changeStep(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
  }

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
              name="name"
              className="col-span-3"
            />
            <TextInput
              placeholder="i.e: 123 Coffee Lane, Seattle, WA 98765"
              label="Business Street Address Line #1"
              name="addressLine1"
              control={form.control}
              className="col-span-3"
            />{" "}
            <TextInput
              placeholder="i.e: 123 Coffee Lane, Seattle, WA 98765"
              label="Business Street Address Line #2"
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
              options={STATE_CITIES_DATA}
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
              name="zipCode"
              control={form.control}
            />
            <TextInput
              placeholder="i.e: 12-3456789"
              label="Tax Identification Number (TIN)"
              name="tin"
              control={form.control}
              className="col-span-3"
            />
            <TextInput
              placeholder="www.larryslatte.com"
              label="Business Website"
              name="website"
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
        <Button disabled={!form.formState.isValid} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}
