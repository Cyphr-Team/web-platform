import React from "react"
import { CheckCircle2, MinusCircle } from "lucide-react"
import { UserRoles } from "@/types/user.type.ts"
import { Badge } from "@/components/ui/badge.tsx"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

interface MultiChoicesProps {
  role: { value: UserRoles; label: string }
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const MultiChoices: React.FC<MultiChoicesProps> = ({
  role,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const icon = isSelected ? (
    <CheckCircle2 size={16} className="text-sm mr-1.5" />
  ) : (
    <MinusCircle size={16} className="text-sm mr-1.5" />
  )

  const badgeClassName = isSelected
    ? "flex items-center capitalize p-1 text-primary checked"
    : `flex items-center capitalize p-1 w-full ${
        isHovered ? "text-destructive cursor-pointer" : ""
      } text-center`

  return (
    <div
      className="flex items-center justify-between mb-0.5"
      style={{ padding: "3px", backgroundColor: "white" }}
    >
      <ToggleGroup.Root type="multiple" aria-label="Text formatting">
        <ToggleGroup.Item
          value={role.label}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Badge className={badgeClassName}>
            {icon}
            {role.label}
          </Badge>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
