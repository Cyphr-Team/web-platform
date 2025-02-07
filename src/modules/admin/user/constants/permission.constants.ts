import { UserRoles } from "@/types/user.type"

export const DETAILS_PERMISSION_BY_ROLE = {
  [UserRoles.WORKSPACE_ADMIN]:
    "Has full control of the workspace, including user management, application oversight, and maintaining platform security.",
  [UserRoles.REVIEWER]:
    "Grants the ability to approve or deny applications and manage their progression through the workflow.",
  [UserRoles.VIEWER]:
    "Read-only access to view applications without making changes."
}
