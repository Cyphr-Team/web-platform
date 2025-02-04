export const ROLES = {
  ADMIN: "Admin",
  REVIEWER: "Reviewer",
  VIEWER: "Viewer"
}

export const DETAILS_PERMISSION_BY_ROLE = {
  [ROLES.ADMIN]:
    "Has full control of the workspace, including user management, application oversight, and maintaining platform security.",
  [ROLES.REVIEWER]:
    "Grants the ability to approve or deny applications and manage their progression through the workflow.",
  [ROLES.VIEWER]:
    "Read-only access to view applications without making changes."
}
