import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
  suffixClassName?: string
  suffixIcon?: React.ReactNode
  prefixIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapperClassName,
      suffixClassName,
      className,
      type,
      prefixIcon,
      suffixIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", wrapperClassName)}>
        {prefixIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-tertiary">
            {prefixIcon}
          </div>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefixIcon && "pl-9",
            "aria-invalid:ring-2 aria-invalid:ring-destructive aria-invalid:ring-offset-2 aria-invalid:focus-visible:ring-destructive",
            !!suffixIcon && "pr-10",
            className
          )}
          type={type}
          {...props}
        />
        {suffixIcon ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 flex items-center border-0 border-l px-3 text-text-tertiary",
              suffixClassName
            )}
          >
            {suffixIcon}
          </div>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const inputType = React.useMemo(
      () => (isShowPassword ? "text" : "password"),
      [isShowPassword]
    )

    return (
      <div className="relative">
        <Input ref={ref} type={inputType} {...props} />
        <Button
          className="absolute inset-y-0 right-0 rounded-md rounded-l-none border border-input px-2"
          tabIndex={-1}
          type="button"
          variant="ghost"
          onClick={() => setIsShowPassword((preState) => !preState)}
        >
          {isShowPassword ? (
            <EyeOff className="text-muted-foreground" size={20} />
          ) : (
            <Eye className="text-muted-foreground" size={20} />
          )}
        </Button>
      </div>
    )
  }
)

Input.displayName = "InputPassword"

export { Input, InputPassword }
