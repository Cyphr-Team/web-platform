import { cn } from "@/lib/utils"
import { InputHTMLAttributes, ReactNode, forwardRef } from "react"
import { IMaskInput } from "react-imask"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  wrapperClassName?: string
  suffixIcon?: ReactNode
  prefixIcon?: ReactNode
  validCharRegex?: RegExp
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  pattern: string
}

/**
 * Used to apply the form value to a specific pattern
 *
 * @param value Form value 123456
 * @param pattern Input mask, e.g: 00-0000
 * @param validCharRegex Regex of all valid character, e.g: a-zA-Z0-9
 * @returns New value that applied the pattern e.g 12-3456
 */
const toPattern = (
  value: string,
  pattern: string = "00-0000000",
  validCharRegex: RegExp = /^[0-9a-zA-Z]+$/
) => {
  const values = value.split("")
  let pointer = -1

  return pattern
    .split("")
    .map((patternChar) => {
      if (validCharRegex.test(patternChar)) {
        pointer += 1
        return pointer < values.length ? values[pointer] : patternChar
      }

      if (
        pointer + 1 < values.length &&
        !validCharRegex.test(patternChar) &&
        !validCharRegex.test(values[pointer + 1])
      ) {
        pointer += 1
      }

      return patternChar
    })
    .join("")
}

/**
 * Used to revert the pattern to pure value.
 *
 * @param value Value that applied the pattern e.g 12-3456
 * @param validCharRegex Regex of all valid character, e.g: a-zA-Z0-9
 * @returns Pure value e.g 123456
 */
const revertPattern = (
  value: string,
  validCharRegex: RegExp = /^[0-9a-zA-Z]+$/
) => {
  return value
    .split("")
    .map((v) => {
      if (validCharRegex.test(v)) return v
      return ""
    })
    .filter(Boolean)
    .join("")
}

const MaskInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    onChange,
    className,
    wrapperClassName,
    prefixIcon,
    suffixIcon,
    pattern,
    ...other
  } = props

  return (
    <div className={cn("relative", wrapperClassName)}>
      {prefixIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          {prefixIcon}
        </div>
      )}
      <IMaskInput
        {...other}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          prefixIcon && "pl-9",
          className,
          "aria-invalid:ring-destructive aria-invalid:ring-offset-2 aria-invalid:ring-2 aria-invalid:focus-visible:ring-destructive"
        )}
        mask={pattern}
        definitions={{
          "#": /[1-9]/
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
      {suffixIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-0">
          {suffixIcon}
        </div>
      )}
    </div>
  )
})

MaskInput.displayName = "MaskInput"

export { MaskInput, revertPattern, toPattern }
