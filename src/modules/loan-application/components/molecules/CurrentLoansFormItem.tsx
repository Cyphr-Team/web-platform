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

export function CurrentLoansFormItem({
  index,
  onRemove
}: {
  index: number
  onRemove: (arg: number) => void
}) {
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
        isRowDirection
        required
        className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10"
        control={form.control}
        inputClassName="xl:ml-auto xl:max-w-80"
        label="Lender name"
        name={`currentLoans[${index}].lenderName`}
        placeholder="i.e: Bank of America"
        subtitle="The financial institution providing the loan"
      />
      <TextInput
        isRowDirection
        required
        className="col-span-6 grid grid-cols-1 xl:grid-cols-2 gap-x-2xl flex-auto xl:h-10"
        control={form.control}
        inputClassName="xl:ml-auto xl:max-w-80"
        label="Loan type"
        name={`currentLoans[${index}].loanType`}
        placeholder="i.e: Term Loan"
        subtitle="i.e: a term loan, revolving credit, etc."
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
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
                min={0}
                placeholder="i.e: 55,000"
                type={`currentLoans[${index}].outstandingLoanBalance`}
                value={toCurrency(field.value, 0)}
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
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
                min={0}
                placeholder="i.e: 5,000"
                type={`currentLoans[${index}].monthlyPaymentAmount`}
                value={toCurrency(field.value, 0)}
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
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
                max={100000}
                min={0}
                placeholder="i.e: 11"
                suffixIcon={
                  <span className="text-text-tertiary -mt-2">months</span>
                }
                type={`currentLoans[${index}].loanTermRemainingInMonths`}
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
                required
                className="text-base input-number-remove-arrow -mt-2 xl:ml-auto xl:max-w-80"
                max={100}
                placeholder="i.e 1.05"
                suffixIcon={<span className="text-text-tertiary -mt-2">%</span>}
                type="number"
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
            <FormMessage style={{ marginTop: -1 }} />
          </FormItem>
        )}
      />
    </Card>
  )
}
