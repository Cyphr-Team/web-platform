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
import { type CurrentLoanInformationResponse } from "@/modules/loan-application/constants/type.ts"
import { useMemo } from "react"
import {
  calculateTotalPayment,
  parseAndValidateNumber,
  toCurrency
} from "@/utils"

export function SbbCurrentLoanFormDetails({
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
    <Card className="grid grid-cols-12 gap-x-4xl gap-y-2xl space-y-2 rounded-lg p-5xl shadow-none">
      <div className="col-span-12 flex flex-row items-center justify-between">
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
        className="col-span-12 grid flex-auto grid-cols-1 gap-x-2xl space-y-2 xl:h-8 xl:grid-cols-5 "
        control={form.control}
        formMessageClassName="text-sm text-destructive font-medium col-span-6 xl:col-span-2"
        inputClassName="h-10 max-w-64 pl-font-light text-sm"
        label="Who is the lender that issued the loan?"
        labelClassName="col-span-6 xl:col-span-3 font-medium lg:mt-1"
        name={`currentLoans[${index}].lenderName`}
        placeholder="Type here"
        style={{ marginTop: -1 }}
        wrapperClassName="col-span-6 xl:col-span-2"
      />
      <OptionInput
        hasOtherOption
        className="col-span-12"
        control={form.control}
        label="What type of loan is it?"
        name={`currentLoans[${index}].loanType`}
        options={LOAN_TYPE_OPTIONS}
        otherText="Other"
      />

      <FormField
        control={form.control}
        name={`currentLoans[${index}].outstandingLoanBalance`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid flex-auto grid-cols-1 gap-x-2xl gap-y-1 xl:h-10 xl:grid-cols-5 xl:gap-y-0">
            <FormLabel className="col-span-6 text-text-secondary xl:col-span-3">
              <p className="mt-2 text-sm font-medium">
                What is the remaining loan balance?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                required
                className="input-number-remove-arrow pl:font-light -mt-2 text-base xl:ml-auto xl:max-w-80"
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
              className="col-span-6 font-medium lg:mt-1 xl:col-span-3"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].monthlyPaymentAmount`}
        render={() => (
          <FormItem className="col-span-12 grid flex-auto grid-cols-1 gap-x-2xl gap-y-1 xl:h-10 xl:grid-cols-5 xl:gap-y-0">
            <FormLabel className="col-span-6 text-text-secondary xl:col-span-3">
              <p className="mt-2 text-sm font-medium">
                What is the monthly payment for the loan?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                readOnly
                required
                className="input-number-remove-arrow pl:font-light -mt-2 text-base xl:ml-auto xl:max-w-80"
                max={100}
                min={0}
                type={`currentLoans[${index}].monthlyPaymentAmount`}
                value={toCurrency(monthlyPayment, 0)}
                wrapperClassName="col-span-6 xl:col-span-2"
              />
            </FormControl>
            <FormMessage
              className="col-span-6 font-medium lg:mt-1 xl:col-span-3"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].loanTermRemainingInMonths`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid flex-auto grid-cols-1 gap-x-2xl gap-y-1 xl:h-10 xl:grid-cols-5 xl:gap-y-0">
            <FormLabel className="col-span-6 text-text-secondary xl:col-span-3">
              <p className="mt-2 text-sm font-medium">
                How many months are left on the loan?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                required
                className="input-number-remove-arrow pl:font-light -mt-2 text-base xl:ml-auto xl:max-w-80"
                max={100000}
                min={0}
                placeholder="Type here"
                suffixIcon={
                  <span className="-mt-2 text-text-tertiary">Months</span>
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
              className="col-span-6 font-medium lg:mt-1 xl:col-span-3"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].annualInterestRate`}
        render={({ field }) => (
          <FormItem className="col-span-12 grid flex-auto grid-cols-1 gap-x-2xl gap-y-1 xl:h-10 xl:grid-cols-5 xl:gap-y-0">
            <FormLabel className="col-span-6 text-text-secondary xl:col-span-3">
              <p className="mt-2 text-sm font-medium">
                What is the yearly interest rate?
              </p>
            </FormLabel>
            <FormControl>
              <Input
                required
                className="input-number-remove-arrow pl:font-light -mt-2 text-base xl:ml-auto xl:max-w-80"
                max={100}
                placeholder="Type here"
                suffixIcon={<span className="-mt-2 text-text-tertiary">%</span>}
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
              className="col-span-6 font-medium lg:mt-1 xl:col-span-3"
              style={{ marginTop: -1 }}
            />
          </FormItem>
        )}
      />
    </Card>
  )
}
