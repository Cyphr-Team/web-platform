import { UserRoles, UserStatus } from "@/types/user.type.ts"
import { ButtonReactivateUser } from "@/modules/admin/user/components/ReactivateUserButton.tsx"
import { ModifyUserPermission } from "@/modules/admin/user/components/ModifyUserPermission.tsx"
import { ButtonDeactivateUser } from "../components/DeactivateUserButton"
import { isLaunchKC } from "@/utils/domain.utils"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"

export const ModifyUserPermissionAction = ({
  userId,
  status,
  roles
}: {
  userId: string
  status: UserStatus
  roles: UserRoles[]
}) => {
  return status !== UserStatus.ACTIVE ? (
    <DropdownMenuLabel>
      <ButtonReactivateUser userId={userId} />
    </DropdownMenuLabel>
  ) : (
    <>
      <DropdownMenuLabel>
        <ButtonDeactivateUser userId={userId} />
      </DropdownMenuLabel>
      {!isLaunchKC() && (
        <DropdownMenuLabel>
          <ModifyUserPermission userId={userId} roles={roles} />
        </DropdownMenuLabel>
      )}
    </>
  )
}
