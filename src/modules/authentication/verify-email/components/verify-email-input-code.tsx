import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const VerifyEmailCodeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    const { error } = useFormField()

    return (
      <input
        ref={ref}
        className={cn(
          "flex h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] text-center rounded-lg border border-input bg-background px-3 py-2 text-4xl sm:text-5xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !!value && "border-primary text-primary border-2",
          !!error &&
            "border-red-400 text-red-400 border-2 focus-visible:ring-red-400",
          className
        )}
        type={type}
        value={value}
        {...props}
      />
    )
  }
)

VerifyEmailCodeInput.displayName = "VerifyEmailVerifyEmailCodeInput"

export { VerifyEmailCodeInput }
