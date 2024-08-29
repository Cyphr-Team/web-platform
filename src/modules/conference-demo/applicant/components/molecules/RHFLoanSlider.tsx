import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { toCurrency } from "@/utils"
import { useFormContext } from "react-hook-form"
import { memo } from "react"
import { Slider } from "@/components/ui/slider.tsx"

interface LoanSliderProps {
  name: string
  label: string
  min: number
  max: number
  placeHolder?: string
}

const RHFLoanSlider = (props: LoanSliderProps) => {
  const { name, label, placeHolder, min, max } = props
  const { control } = useFormContext()
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder={placeHolder}
                className="text-base"
                value={toCurrency(field.value, 0)}
                onChange={(event) => {
                  const value =
                    parseFloat(event.target.value.replace(/[^0-9.]/g, "")) || 0
                  if (isNaN(value)) return
                  if (value > max) return field.onChange(max)
                  field.onChange(value)
                }}
                onBlur={(event) => {
                  const value = parseFloat(
                    event.target.value.replace(/[^0-9.]/g, "")
                  )
                  if (isNaN(value)) return
                  if (value < min) return field.onChange(min)
                  if (value > max) return field.onChange(max)
                  return field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="mb-6 mt-4">
            <FormControl>
              <Slider
                {...field}
                defaultValue={[field.value]}
                min={min}
                max={max}
                onValueChange={(vals) => {
                  field.onChange(vals[0])
                }}
                value={[field.value]}
                step={500}
              />
            </FormControl>
            <div className="flex justify-between pt-2 text-sm">
              <div>{toCurrency(min, 0)}</div>

              <div className="text-right">{toCurrency(max, 0)}</div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default memo(RHFLoanSlider)
