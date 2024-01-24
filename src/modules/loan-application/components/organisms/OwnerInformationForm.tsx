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
import { Controller, useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLoanApplicationContext } from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/constants"
import {
  OwnerFormValue,
  ownerFormSchema
} from "@/modules/loan-application/constants/form"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import { Mail } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { FileUploadCard } from "../molecules/FileUploadCard"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useSelectCities } from "../../hooks/useSelectCities"
import { useEffect } from "react"
import { AutoCompleteStates } from "../molecules/AutoCompleteStates"
import { AutoCompleteCities } from "../molecules/AutoCompleteCities"

export function OwnerInformationForm() {
  const defaultValues = {
    name: "",
    role: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
    ssn: "",
    ownership: "",
    cooperate: "",
    zipCode: ""
  }

  const form = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues,
    mode: "onBlur"
  })

  const { changeProgress, changeStep } = useLoanApplicationContext()

  const handleSelectFile = (files: FileList) => {
    const currentFiles = form.getValues("governmentFile")

    const mergedFiles =
      files && currentFiles
        ? [...currentFiles, ...Array.from(files)]
        : Array.from(files)

    form.setValue("governmentFile", mergedFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues("governmentFile")
    const newFiles = currentFiles.filter((_, i) => i !== index)
    form.setValue("governmentFile", newFiles)
  }

  const handleSelectDate = (date: Date | undefined) => {
    form.setValue("dob", date?.toISOString() ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

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

  const onSubmit = () => {
    changeProgress(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
    changeStep(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
  }

  return (
    <div className="flex flex-col flex-1 gap-3xl overflow-auto">
      <Form {...form}>
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
          <h5 className="text-lg font-semibold">Owner Information</h5>
          <Separator />

          <form className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: Larry Latte"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Your Role
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Founder and CEO"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextInput
              placeholder="i.e: 456 Bean Ave."
              label="Resident Address Line #1"
              name="addressLine1"
              control={form.control}
              className="col-span-2"
            />{" "}
            <TextInput
              placeholder="i.e: Suite 789"
              label="Resident Address Line #2 (Optional)"
              name="addressLine2"
              control={form.control}
              className="col-span-2"
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
              placeholder="i.e: 98765"
              label="Zip Code"
              name="zipCode"
              control={form.control}
              className="col-span-2"
            />
            <TextInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="i.e: larry@latte.com"
              prefixIcon={<Mail className="h-5 w-5 text-text-tertiary" />}
            />{" "}
            <TextInput
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="i.e: 123-456-7890"
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Date of Birth
                  </FormLabel>
                  <CalendarDatePicker
                    value={field.value}
                    onSelectDate={handleSelectDate}
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextInput
              control={form.control}
              name="ssn"
              label="Social Security Number (SSN)"
              placeholder="i.e: 123-45-6789"
            />
            <FormField
              control={form.control}
              name="ownership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    What percent of the business do you own?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="70"
                      min={0}
                      max={100}
                      className="text-base input-number-remove-arrow"
                      suffixIcon={<span className="text-text-tertiary">%</span>}
                      {...field}
                      onChange={(e) => {
                        if (
                          Number(e.target.value) >= 0 &&
                          Number(e.target.value) <= 100
                        )
                          field.onChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div />
            <Controller
              control={form.control}
              name="cooperate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Other than you, are there any individuals who own 20% or
                    more of the business?
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange({ target: { value } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Please select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">
                          <span>Yes</span>
                        </SelectItem>
                        <SelectItem value="no">
                          <span>No</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Card>

        <Card className="p-4xl gap-2xl flex flex-col">
          <div>
            <h5 className="text-lg font-semibold">Government ID</h5>
            <p className="text-text-tertiary">
              {`Please upload a government-issued identification document. Accepted
            documents include a passport, driver’s license, state identification
            card, and national ID card.`}
            </p>
          </div>

          <FormField
            control={form.control}
            name="governmentFile"
            render={() => (
              <FormItem>
                <DragDropFileInput onFileSelect={handleSelectFile} />
                {form.getValues("governmentFile") &&
                  form.getValues("governmentFile").length > 0 &&
                  Array.from(form.getValues("governmentFile")).map(
                    (file: File, index: number) => (
                      <FileUploadCard
                        key={index}
                        file={file}
                        index={index}
                        handleRemoveFile={handleRemoveFile}
                      />
                    )
                  )}
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <div className="flex justify-end">
          <Button
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
