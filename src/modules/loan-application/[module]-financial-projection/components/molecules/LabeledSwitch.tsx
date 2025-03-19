import { Switch } from "@/components/ui/switch.tsx"
import { type MouseEventHandler, type ReactNode, useCallback } from "react"
import { cn } from "@/lib/utils.ts"
import { type UseBooleanReturn } from "@/hooks/useBoolean.ts"

interface LabeledSwitchProps {
  label: ReactNode
  state: UseBooleanReturn

  className?: string
  labelClassName?: string
}

export function LabeledSwitch(props: LabeledSwitchProps) {
  const { label, className, labelClassName, state } = props

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      state.onToggle()
    },
    [state]
  )

  return (
    <div className={cn("flex items-center justify-between gap-x-2", className)}>
      <div className={cn("text-sm font-normal", labelClassName)}>{label}</div>
      <Switch
        checked={state.value}
        data-state={state.value ? "checked" : "unchecked"}
        onClick={handleClick}
      />
    </div>
  )
}
