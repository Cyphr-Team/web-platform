import React, { useEffect, useState } from "react"
import { EditUserRolesButton } from "@/modules/admin/user/components/EditUserRolesButton.tsx"
import { EDIT_ROLES } from "@/modules/admin/user/constants/edit-roles.constants.ts"
import { Separator } from "@radix-ui/react-select"
import { useQueryGetUser } from "@/modules/admin/user/hooks/useQuery/useQueryGetUser.ts"
import { ButtonDeactivateUser } from "@/modules/admin/user/components/DeactivateUserButton.tsx"
import { UserRoles } from "@/types/user.type.ts"
import { MultiChoices } from "@/components/ui/multi-choice-selection.tsx"

export const ModifyUserPermission = ({
  userId,
  setIsUserEditFormOpen
}: {
  userId: string
  setIsUserEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [selectedRoles, setSelectedRoles] = useState<UserRoles[]>([])
  const [hoveredButton, setHoveredButton] = useState("")
  const { data } = useQueryGetUser({ id: userId })

  useEffect(() => {
    if (data && data.roles) {
      setSelectedRoles((prevRoles) => [...prevRoles, ...data.roles])
    }
  }, [data])

  const handleRoleClick = (roleValue: UserRoles) => {
    const lowercaseRoleValue = roleValue.toLowerCase() as UserRoles
    if (selectedRoles.includes(lowercaseRoleValue)) {
      setSelectedRoles(
        selectedRoles.filter((role) => role !== lowercaseRoleValue)
      )
    } else {
      setSelectedRoles([...selectedRoles, lowercaseRoleValue])
    }
  }

  const handleMouseHover = (buttonLabel: string) => {
    setHoveredButton(buttonLabel)
  }

  const handleMouseLeave = () => {
    if (selectedRoles || hoveredButton) {
      setHoveredButton("")
    }
  }

  return (
    <form>
      {EDIT_ROLES.map((role) => (
        <MultiChoices
          key={role.value}
          role={role}
          isSelected={selectedRoles.includes(
            role.value.toLowerCase() as UserRoles
          )}
          isHovered={hoveredButton === role.value}
          onClick={() => handleRoleClick(role.value)}
          onMouseEnter={() => handleMouseHover(role.value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      <Separator />
      {selectedRoles.length === 0 ? (
        <ButtonDeactivateUser
          userId={userId}
          setIsUserEditFormOpen={setIsUserEditFormOpen}
        />
      ) : (
        <EditUserRolesButton
          userId={userId}
          roles={selectedRoles}
          setIsUserEditFormOpen={setIsUserEditFormOpen}
        />
      )}
    </form>
  )
}
