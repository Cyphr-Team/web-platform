import { FormField, FormItem, FormLabel } from "@/components/ui/form.tsx"
import { cn } from "@/lib/utils.ts"
import { memo, type ReactNode } from "react"
import {
  type FieldPath,
  type FieldValues,
  useFormContext
} from "react-hook-form"
import * as SwitchPrimitives from "@radix-ui/react-switch"

export interface RHFSwitchInput<T extends FieldValues> {
  label: ReactNode
  name: FieldPath<T>

  className?: string
  styleProps?: {
    labelClassName?: string
  }
}

function RHFSwitch<T extends FieldValues>(props: RHFSwitchInput<T>) {
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
            "flex items-center justify-between gap-x-2 align-middle",
            className
          )}
        >
          <FormLabel className={cn("mt-2 text-text-secondary", labelClassName)}>
            {label}
          </FormLabel>

          <SwitchPrimitives.Root
            className={cn(
              "inline-flex shrink-0 items-center",
              "rounded-full border-2 border-transparent",
              "h-6 w-11 cursor-pointer transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            )}
            {...field}
          >
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
              )}
            />
          </SwitchPrimitives.Root>
        </FormItem>
      )}
    />
  )
}

export default memo(RHFSwitch)
