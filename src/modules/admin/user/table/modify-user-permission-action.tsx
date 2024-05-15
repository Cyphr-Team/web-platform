import { UserRoles, UserStatus } from "@/types/user.type.ts"
import { ButtonReactivateUser } from "@/modules/admin/user/components/ReactivateUserButton.tsx"
import { ModifyUserPermission } from "@/modules/admin/user/components/ModifyUserPermission.tsx"

export const ModifyUserPermissionAction = ({
  userId,
  status,
  roles
}: {
  userId: string
  status: UserStatus
  roles: UserRoles[]
}) => {
  const isLoanApplicant = roles.includes(
    UserRoles.LOAN_APPLICANT.toLowerCase() as UserRoles
  )
  const isForesightAdmin = roles.includes(
    UserRoles.FORESIGHT_ADMIN.toLowerCase() as UserRoles
  )

  return (
    <div>
      {!isLoanApplicant &&
        !isForesightAdmin &&
        (status !== UserStatus.ACTIVE ? (
          <ButtonReactivateUser userId={userId} />
        ) : (
          <ModifyUserPermission userId={userId} roles={roles} />
        ))}
    </div>
  )
}
