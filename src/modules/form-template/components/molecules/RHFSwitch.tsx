import { FormField, FormItem, FormLabel } from "@/components/ui/form.tsx"
import { cn } from "@/lib/utils.ts"
import { memo, ReactNode } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import * as SwitchPrimitives from "@radix-ui/react-switch"

export interface RHFTextInputProps<T extends FieldValues> {
  label: ReactNode
  name: FieldPath<T>

  className?: string
  styleProps?: {
    labelClassName?: string
  }
}

const RHFSwitch = <T extends FieldValues>(props: RHFTextInputProps<T>) => {
  const { control } = useFormContext()
  const { name, label, className, styleProps = {} } = props
  const { labelClassName } = styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex items-center justify-between align-middle gap-x-2",
            className
          )}
        >
          <FormLabel className={cn("text-text-secondary mt-2", labelClassName)}>
            {label}
          </FormLabel>

          <SwitchPrimitives.Root
            className={cn(
              "inline-flex items-center shrink-0",
              "border-2 border-transparent rounded-full",
              "h-6 w-11 cursor-pointer transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            )}
            {...field}
          >
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
              )}
            />
          </SwitchPrimitives.Root>
        </FormItem>
      )}
    />
  )
}

export default memo(RHFSwitch)
