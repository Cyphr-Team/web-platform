import { CheckCircle2, MinusCircle } from "lucide-react"
import { type UserRoles } from "@/types/user.type.ts"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { cn } from "@/lib/utils.ts"

interface MultiChoicesProps {
  role: { value: UserRoles; label: string }
  isSelected: boolean
  onClick: () => void
  description?: string
  itemClassName: string
  iconClassName: string
}

export function MultiChoices(props: MultiChoicesProps) {
  const {
    role,
    isSelected,
    onClick,
    description,
    itemClassName,
    iconClassName
  } = props

  return (
    <ToggleGroup.Root aria-label="Text formatting" type="multiple">
      <ToggleGroup.Item
        className={cn("border border-gray-400 py-2 px-4 w-full", itemClassName)}
        value={role.label}
        onClick={onClick}
      >
        <div className={cn("flex items-center p-1", iconClassName)}>
          {isSelected ? (
            <CheckCircle2 className="mr-1.5" size={16} />
          ) : (
            <MinusCircle className="mr-1.5" size={16} />
          )}
          {role.label}
        </div>
        <div className="p-2 text-left text-sm font-normal">{description}</div>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
