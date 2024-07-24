import { UserRoles, UserStatus } from "@/types/user.type.ts"
import { ButtonReactivateUser } from "@/modules/admin/user/components/ReactivateUserButton.tsx"
import { ModifyUserPermission } from "@/modules/admin/user/components/ModifyUserPermission.tsx"
import { isApplicant, isPlatformAdmin } from "@/utils/check-roles.ts"
import { ButtonDeactivateUser } from "../components/DeactivateUserButton"
import { isLaunchKC } from "@/utils/domain.utils"

export const ModifyUserPermissionAction = ({
  userId,
  status,
  roles
}: {
  userId: string
  status: UserStatus
  roles: UserRoles[]
}) => {
  return (
    <div>
      {!isApplicant(roles) &&
        !isPlatformAdmin(roles) &&
        (status !== UserStatus.ACTIVE ? (
          <ButtonReactivateUser userId={userId} />
        ) : (
          <>
            <ButtonDeactivateUser userId={userId} />
            {!isLaunchKC() && (
              <ModifyUserPermission userId={userId} roles={roles} />
            )}
          </>
        ))}
    </div>
  )
}
