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
import { toCurrency } from "@/utils"
import { DeleteCurrentLoanButton } from "../atoms/DeleteCurrentLoanButton"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"

export const CurrentLoansFormItem = ({
  index,
  onRemove
}: {
  index: number
  onRemove: (arg: number) => void
}) => {
  const form = useFormContext()

  return (
    <Card className="grid grid-cols-6 gap-2xl p-4xl rounded-lg h-fit">
      <div className="flex flex-row items-center justify-between col-span-6">
        <h5 className="text-md font-semibold">LOAN #{index + 1}</h5>
        <DeleteCurrentLoanButton index={index} onRemove={onRemove} />
      </div>

      <TextInput
        placeholder="i.e: Bank of America"
        label="Lender name"
        subtitle="The financial institution providing the loan"
        name={`loans[${index}].lenderName`}
        control={form.control}
        className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-x-2xl flex-auto lg:h-10"
        isRowDirection
        required
      />
      <TextInput
        placeholder="i.e: Term Loan"
        label="Loan type"
        subtitle="i.e: a term loan, revolving credit, etc."
        name={`loans[${index}].loanType`}
        control={form.control}
        className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-x-2xl flex-auto lg:h-10"
        isRowDirection
        required
      />
      <FormField
        control={form.control}
        name={`loans[${index}].loanBalance`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-y-1 lg:gap-y-0 gap-x-2xl flex-auto lg:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-medium">
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
                type={`loans[${index}].loanBalance`}
                placeholder="i.e: 55,000"
                min={0}
                className="text-base input-number-remove-arrow -mt-2"
                value={toCurrency(field.value, 0)}
                required
                onChange={(e) => {
                  const value =
                    parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0
                  if (isNaN(value)) return
                  field.onChange(value)
                }}
                onBlur={(e) => {
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  )
                  if (isNaN(value)) return
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
        name={`loans[${index}].monthlyPayment`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-y-1 lg:gap-y-0 gap-x-2xl flex-auto lg:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-medium">
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
                type={`loans[${index}].monthlyPayment`}
                placeholder="i.e: 5,000"
                min={0}
                className="text-base input-number-remove-arrow -mt-2"
                value={toCurrency(field.value, 0)}
                required
                onChange={(e) => {
                  const value =
                    parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0
                  if (isNaN(value)) return
                  field.onChange(value)
                }}
                onBlur={(e) => {
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  )
                  if (isNaN(value)) return
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
        name={`loans[${index}].remainingDuration`}
        render={({ field }) => (
          <FormItem className="col-span-6 grid grid-cols-1 gap-y-1 lg:gap-y-0 lg:grid-cols-2 gap-x-2xl flex-auto lg:h-10">
            <FormLabel className="text-text-secondary">
              <p className="text-sm text-text-secondary font-medium">
                Loan term remaining (in months)
                <RequiredSymbol />
              </p>
              <p className="text-sm text-text-tertiary font-medium">
                Remaining duration of the loan
              </p>
            </FormLabel>
            <FormControl>
              <Input
                type={`loans[${index}].remainingDuration`}
                placeholder="i.e: 11"
                min={0}
                className="text-base input-number-remove-arrow -mt-2"
                suffixIcon={
                  <span className="text-text-tertiary -mt-2">months</span>
                }
                required
                {...field}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0) field.onChange(e)
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
