import { Card } from "@/components/ui/card.tsx"
import { TextInput } from "@/shared/organisms/form/TextInput.tsx"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { DeleteCurrentLoanButton } from "../../../atoms/DeleteCurrentLoanButton.tsx"
import { DELETE_CURRENT_LOAN_PREFIX } from "../../../../constants"
import { type CurrentLoanInformationResponse } from "@/modules/loan-application/constants/type.ts"
import { useMemo } from "react"
import {
  calculateTotalPayment,
  parseAndValidateNumber,
  toCurrency
} from "@/utils"

export function KansasCityCurrentLoanFormDetails({
  index,
  onRemove,
  formData
}: {
  index: number
  onRemove: (arg: number) => void
  formData: CurrentLoanInformationResponse
}) {
  const form = useFormContext()

  const monthlyPayment = useMemo(() => {
    return calculateTotalPayment(
      formData.annualInterestRate,
      formData.loanTermRemainingInMonths,
      formData.outstandingLoanBalance
    )
  }, [
    formData.outstandingLoanBalance,
    formData.loanTermRemainingInMonths,
    formData.annualInterestRate
  ])

  const numberInputOnWheelPreventChange = (
    e: React.WheelEvent<HTMLInputElement>
  ) => {
    // Prevent the input value change
    e.currentTarget.blur()

    // Prevent the page/container from scrolling
    e.stopPropagation()
  }

  return (
    <Card className="p-5xl rounded-lg space-y-2 gap-x-4xl grid grid-cols-12 gap-y-2xl shadow-none">
      <div className="flex flex-row items-center justify-between col-span-12">
        <h5 className="text-md font-semibold">LOAN #{index + 1}</h5>
        {form
          .getValues()
          .currentLoans.filter(
            (item: { id: string }) =>
              !item.id.startsWith(DELETE_CURRENT_LOAN_PREFIX)
          ).length > 1 && (
          <DeleteCurrentLoanButton index={index} onRemove={onRemove} />
        )}
      </div>

      <TextInput
        isRowDirection
        className="space-y-2 col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-x-2xl flex-auto xl:h-8 "
        control={form.control}
        formMessageClassName="text-sm text-destructive font-medium col-span-6 xl:col-span-2"
        inputClassName="h-10 max-w-64 pl-font-light text-sm"
        label="Who is the lender/financial institution that issued the loan?"
        labelClassName="col-span-6 xl:col-span-3 font-medium leading-normal"
        name={`currentLoans[${index}].lenderName`}
        placeholder="Type here"
        style={{ marginTop: -1 }}
        wrapperClassName="col-span-6 xl:col-span-2"
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].originalLoanAmount`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary col-span-6 xl:col-span-3">
              <p className="text-sm font-medium mt-2">
                What was the original loan amount?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                min={0}
                placeholder="Type here"
                type={`currentLoans[${index}].originalLoanAmount`}
                value={toCurrency(field.value, 0)}
                wrapperClassName="col-span-6 xl:col-span-2"
                onBlur={(e) => {
                  field.onBlur()
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  )

                  if (isNaN(value) || value.toString().length > 18) return

                  return field.onChange(value)
                }}
                onChange={(e) => {
                  field.onBlur()
                  const value = parseAndValidateNumber(e.target.value, 18)

                  field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].outstandingLoanBalance`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary col-span-6 xl:col-span-3">
              <p className="text-sm font-medium mt-2">
                What is the remaining loan balance?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                min={0}
                placeholder="Type here"
                type={`currentLoans[${index}].outstandingLoanBalance`}
                value={toCurrency(field.value, 0)}
                wrapperClassName="col-span-6 xl:col-span-2"
                onBlur={(e) => {
                  field.onBlur()
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  )

                  if (isNaN(value) || value.toString().length > 18) return

                  return field.onChange(value)
                }}
                onChange={(e) => {
                  field.onBlur()
                  const value = parseAndValidateNumber(e.target.value, 18)

                  field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].monthlyPaymentAmount`}
        render={() => (
          <FormItem className="col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary col-span-6 xl:col-span-3">
              <p className="text-sm font-medium mt-2">
                What is the monthly payment for the loan?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                readOnly
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                max={100}
                min={0}
                type={`currentLoans[${index}].monthlyPaymentAmount`}
                value={toCurrency(monthlyPayment, 0)}
                wrapperClassName="col-span-6 xl:col-span-2"
              />
            </FormControl>
            <FormMessage
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].loanTermRemainingInMonths`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary col-span-6 xl:col-span-3">
              <p className="text-sm font-medium mt-2">
                How many months are left on the loan?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                max={100000}
                min={0}
                placeholder="Type here"
                suffixIcon={
                  <span className="text-text-tertiary -mt-2">Months</span>
                }
                type={`currentLoans[${index}].loanTermRemainingInMonths`}
                wrapperClassName="col-span-6 xl:col-span-2 divide-x"
                {...field}
                onChange={(e) => {
                  field.onBlur()
                  field.onChange(Number(e.target.value))
                }}
              />
            </FormControl>
            <FormMessage
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <TextInput
        isRowDirection
        className="space-y-2 col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-x-2xl flex-auto xl:h-8 "
        control={form.control}
        formMessageClassName="text-sm text-destructive font-medium col-span-6 xl:col-span-2"
        inputClassName="h-10 max-w-64 pl-font-light text-sm"
        label="What is the term of the loan?"
        labelClassName="col-span-6 xl:col-span-3 font-medium leading-normal lg:mt-1"
        name={`currentLoans[${index}].loanType`}
        placeholder="Type here"
        style={{ marginTop: -1 }}
        wrapperClassName="col-span-6 xl:col-span-2"
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].annualInterestRate`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary col-span-6 xl:col-span-3">
              <p className="text-sm font-medium mt-2">
                What is the yearly interest rate?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                max={100}
                placeholder="Type here"
                suffixIcon={<span className="text-text-tertiary -mt-2">%</span>}
                type="number"
                wrapperClassName="col-span-6 xl:col-span-2"
                onWheel={numberInputOnWheelPreventChange}
                {...field}
                onChange={(e) => {
                  field.onBlur()
                  const value = e.target.value

                  // Ensure the value is not negative
                  if (Number(value) >= 0) {
                    // Convert the value to a float with two decimal places
                    const floatValue = parseFloat(parseFloat(value).toFixed(2))

                    field.onChange(floatValue)
                  }
                }}
              />
            </FormControl>
            <FormMessage
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
    </Card>
  )
}
