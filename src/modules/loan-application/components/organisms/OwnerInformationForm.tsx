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
import { useLoanApplicationContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { OwnerFormValue, ownerFormSchema } from "../../constants/form"
import { DragDropFileInput } from "@/shared/molecules/DragFileInput"
import { File, Mail } from "lucide-react"
import { convertFileSizeToMB } from "@/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"

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
    cooperate: ""
  }

  const form = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues,
    mode: "onBlur"
  })

  const { changeProgress, changeStep } = useLoanApplicationContext()

  const handleSelectFile = (file: File) => {
    form.setValue("governmentFile", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleSelectDate = (date: Date | undefined) => {
    form.setValue("dob", date?.toISOString() ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onSubmit = () => {
    changeProgress(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
    changeStep(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
  }
  return (
    <div className="flex flex-col flex-1 gap-3xl">
      <Form {...form}>
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
          <h5 className="text-lg font-semibold">Owner Information</h5>
          <Separator />

          <form className="grid grid-cols-2 gap-y-2xl gap-x-4xl ">
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-text-secondary">
                    Home Address{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: 321 Coffee Lane, Seattle, WA 98765"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="i.e: larry@latte.com"
                      className="text-base"
                      prefixIcon={
                        <Mail className="h-5 w-5 text-text-tertiary" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="i.e: 123-456-7890"
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
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-secondary">
                    Social Security Number (SSN)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: 123-45-6789"
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
                {form.getValues("governmentFile") && (
                  <Card className="p-xl gap-2xl flex">
                    <File className="h-10 w-8" />
                    <div className="flex flex-col">
                      <p className="text-sm">
                        {form.getValues("governmentFile").name}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        {`${convertFileSizeToMB(
                          form.getValues("governmentFile").size
                        )} MB`}
                      </p>
                    </div>
                  </Card>
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
