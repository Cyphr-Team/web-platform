import React from "react"
import { CheckCircle2, MinusCircle } from "lucide-react"
import { UserRoles } from "@/types/user.type.ts"
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

export const MultiChoices: React.FC<MultiChoicesProps> = ({
  role,
  isSelected,
  onClick,
  description,
  itemClassName,
  iconClassName
}) => {
  return (
    <ToggleGroup.Root type="multiple" aria-label="Text formatting">
      <ToggleGroup.Item
        value={role.label}
        onClick={onClick}
        className={cn("border border-gray-400 py-2 px-4 w-full", itemClassName)}
      >
        <div className={cn("flex items-center p-1", iconClassName)}>
          {isSelected ? (
            <CheckCircle2 size={16} className="mr-1.5" />
          ) : (
            <MinusCircle size={16} className="mr-1.5" />
          )}
          {role.label}
        </div>
        <div className="font-normal text-left py-2 px-2 text-sm">
          {description}
        </div>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
