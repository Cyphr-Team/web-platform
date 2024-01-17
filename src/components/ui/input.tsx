import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffixIcon?: React.ReactNode
  prefixIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixIcon, suffixIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {prefixIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefixIcon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border border-0">
            {suffixIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const inputType = React.useMemo(
      () => (isShowPassword ? "text" : "password"),
      [isShowPassword]
    )

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute inset-y-0 right-0 rounded-md border border-input px-2 border-l rounded-l-none"
          onClick={() => setIsShowPassword((preState) => !preState)}
        >
          {isShowPassword ? (
            <EyeOff size={20} className="text-muted-foreground" />
          ) : (
            <Eye size={20} className="text-muted-foreground" />
          )}
        </Button>
      </div>
    )
  }
)
Input.displayName = "InputPassword"

export { Input, InputPassword }
