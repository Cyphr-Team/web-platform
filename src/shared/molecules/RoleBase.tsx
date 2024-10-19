import { type UserRoles } from "@/types/user.type"
import { checkRolesMatchWithUserRoles } from "@/utils/check-roles"
interface RoleBaseProps {
  roles?: UserRoles[]
}

export const RoleBase = ({
  roles,
  children
}: React.PropsWithChildren<RoleBaseProps>) => {
  //Check if the user is super admin and return the component
  const isNotValidRoles = !roles || roles.length === 0

  if (isNotValidRoles) return children

  if (checkRolesMatchWithUserRoles(roles)) return children

  return ""
}
