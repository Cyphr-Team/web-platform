import { USER_ROLES } from "@/common"
import { checkRolesMatchWithUserRoles } from "@/utils/check-roles"
interface RoleBaseProps {
  roles?: USER_ROLES[]
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
