import { Card } from "@/components/ui/card"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { parseAndValidateNumber, toCurrency } from "@/utils"
import { DeleteCurrentLoanButton } from "../atoms/DeleteCurrentLoanButton"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { DELETE_CURRENT_LOAN_PREFIX } from "../../constants"

export const CurrentLoansFormItem = ({
  index,
  onRemove
}: {
  index: number
  onRemove: (arg: number) => void
}) => {
  const form = useFormContext()

  const numberInputOnWheelPreventChange = (
    e: React.WheelEvent<HTMLInputElement>
  ) => {
    // Prevent the input value change
    e.currentTarget.blur()

    // Prevent the page/container from scrolling
    e.stopPropagation()
  }

  return (
    <Card className="grid grid-cols-6 gap-4xl p-5xl rounded-lg h-fit">
      <div className="flex flex-row items-center justify-between col-span-6">
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
        placeholder="i.e: Bank of America"
        label="Lender name"
        subtitle="The financial institution providing the loan"
        name={`currentLoans[${index}].lenderName`}
        control={form.control}
        className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10"
        inputClassName="xl:ml-auto xl:max-w-80"
        isRowDirection
        required
      />
      <TextInput
        placeholder="i.e: Term Loan"
        label="Loan type"
        subtitle="i.e: a term loan, revolving credit, etc."
        name={`currentLoans[${index}].loanType`}
        control={form.control}
        className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10"
        inputClassName="xl:ml-auto xl:max-w-80"
        isRowDirection
        required
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].outstandingLoanBalance`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-semibold">
                Outstanding loan balance
                <RequiredSymbol />
              </p>
              <p className="text-sm text-text-tertiary font-medium">
                Remaining loan account
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type={`currentLoans[${index}].outstandingLoanBalance`}
                placeholder="i.e: 55,000"
                min={0}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
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
            <FormMessage style={{ marginTop: -1 }} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].monthlyPaymentAmount`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-y-1 xl:gap-y-0 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-semibold">
                Monthly payment amount
                <RequiredSymbol />
              </p>
              <p className="text-sm text-text-tertiary font-medium">
                Amount of payment made monthly
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type={`currentLoans[${index}].monthlyPaymentAmount`}
                placeholder="i.e: 5,000"
                min={0}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
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
            <FormMessage style={{ marginTop: -1 }} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].loanTermRemainingInMonths`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 gap-y-1 xl:gap-y-0 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-semibold">
                Loan term remaining (in months)
              </p>
              <p className="text-sm text-text-tertiary font-medium">
                Remaining duration of the loan
              </p>
            </FormLabel>
            <FormControl>
              <Input
                type={`currentLoans[${index}].loanTermRemainingInMonths`}
                placeholder="i.e: 11"
                min={0}
                max={100000}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
                suffixIcon={
                  <span className="text-text-tertiary -mt-2">months</span>
                }
                required
                {...field}
                onChange={(e) => {
                  field.onBlur()
                  if (Number(e.target.value) >= 0 && e.target.value.length < 10)
                    field.onChange(Number(e.target.value))
                }}
              />
            </FormControl>
            <FormMessage style={{ marginTop: -1 }} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`currentLoans[${index}].annualInterestRate`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 gap-y-1 xl:gap-y-0 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-semibold">
                Annual interest rate
                <RequiredSymbol />
              </p>
              <p className="text-sm text-text-tertiary font-medium">
                The interest rate charged yearly
              </p>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="i.e 1.05"
                max={100}
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
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
            <FormMessage style={{ marginTop: -1 }} />
          </FormItem>
        )}
      />
    </Card>
  )
}
