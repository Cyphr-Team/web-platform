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
import { OptionInput } from "@/shared/organisms/form/OptionInput.tsx"
import { LOAN_TYPE_OPTIONS } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/const.ts"
import { CurrentLoanInformationResponse } from "@/modules/loan-application/constants/type.ts"
import { useMemo } from "react"
import {
  calculateTotalPayment,
  parseAndValidateNumber,
  toCurrency
} from "@/utils"

export const SbbCurrentLoanFormDetails = ({
  index,
  onRemove,
  formData
}: {
  index: number
  onRemove: (arg: number) => void
  formData: CurrentLoanInformationResponse
}) => {
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
        placeholder="Type here"
        label="Who is the lender that issued the loan?"
        name={`currentLoans[${index}].lenderName`}
        control={form.control}
        className="space-y-2 col-span-12 grid grid-cols-1 xl:grid-cols-5 gap-x-2xl flex-auto xl:h-8 "
        labelClassName="col-span-6 xl:col-span-3 font-medium lg:mt-1"
        inputClassName="h-10 max-w-64 pl-font-light text-sm"
        wrapperClassName="col-span-6 xl:col-span-2"
        formMessageClassName="text-sm text-destructive font-medium col-span-6 xl:col-span-2"
        style={{ marginTop: -1 }}
        isRowDirection
      />
      <OptionInput
        name={`currentLoans[${index}].loanType`}
        label="What type of loan is it?"
        control={form.control}
        className="col-span-12"
        options={LOAN_TYPE_OPTIONS}
        hasOtherOption={true}
        otherText="Other"
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
                type={`currentLoans[${index}].outstandingLoanBalance`}
                placeholder="Type here"
                min={0}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                wrapperClassName="col-span-6 xl:col-span-2"
                value={toCurrency(field.value, 0)}
                required
                onChange={(e) => {
                  field.onBlur()
                  const value = parseAndValidateNumber(e.target.value, 18)
                  field.onChange(value)
                }}
                onBlur={(e) => {
                  field.onBlur()
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  )
                  if (isNaN(value) || value.toString().length > 18) return
                  return field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage
              style={{ marginTop: -1 }}
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
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
                max={100}
                type={`currentLoans[${index}].monthlyPaymentAmount`}
                min={0}
                readOnly
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                wrapperClassName="col-span-6 xl:col-span-2"
                value={toCurrency(monthlyPayment, 0)}
                required
              />
            </FormControl>
            <FormMessage
              style={{ marginTop: -1 }}
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
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
                type={`currentLoans[${index}].loanTermRemainingInMonths`}
                placeholder="Type here"
                min={0}
                max={100000}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                wrapperClassName="col-span-6 xl:col-span-2 divide-x"
                suffixIcon={
                  <span className="text-text-tertiary -mt-2">Months</span>
                }
                required
                {...field}
                onChange={(e) => {
                  field.onBlur()
                  field.onChange(Number(e.target.value))
                }}
              />
            </FormControl>
            <FormMessage
              style={{ marginTop: -1 }}
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
            />
          </FormItem>
        )}
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
                type="number"
                placeholder="Type here"
                max={100}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80 pl:font-light"
                wrapperClassName="col-span-6 xl:col-span-2"
                onWheel={numberInputOnWheelPreventChange}
                suffixIcon={<span className="text-text-tertiary -mt-2">%</span>}
                required
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
              style={{ marginTop: -1 }}
              className="col-span-6 xl:col-span-3 font-medium lg:mt-1"
            />
          </FormItem>
        )}
      />
    </Card>
  )
}
