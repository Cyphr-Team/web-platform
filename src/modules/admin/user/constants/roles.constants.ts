import {
  applicantRole,
  platformAdminRole,
  reviewerRole,
  UserRoles,
  workspaceAdminRole
} from "@/types/user.type.ts"

const platformAdminRoleOption = {
  label: "Platform Admin",
  value: platformAdminRole()
}

const workspaceAdminRoleOption = {
  label: "Workspace Admin",
  value: workspaceAdminRole()
}

const reviewerRoleOption = {
  label: "Reviewer",
  value: reviewerRole()
}

const applicantRoleOption = {
  label: "Applicant",
  value: applicantRole()
}

const nameByRole = (role: UserRoles) => {
  switch (role.toUpperCase()) {
    case applicantRole():
      return applicantRoleOption.label
    case reviewerRole():
      return reviewerRoleOption.label
    case workspaceAdminRole():
      return workspaceAdminRoleOption.label
    case platformAdminRole():
      return platformAdminRoleOption.label
    default:
      return "Unknown"
  }
}

const editRoleOptions = () => {
  return [workspaceAdminRoleOption, reviewerRoleOption]
}

const inviteRoleOptions = () => {
  return [workspaceAdminRoleOption, reviewerRoleOption, applicantRoleOption]
}

export { nameByRole, editRoleOptions, inviteRoleOptions }
