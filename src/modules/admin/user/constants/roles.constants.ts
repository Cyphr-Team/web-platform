import {
  applicantRole,
  judgeRole,
  platformAdminRole,
  reviewerRole,
  type UserRoles,
  viewerRole,
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

const judgeRoleOption = {
  label: "Judge",
  value: judgeRole()
}

const applicantRoleOption = {
  label: "Applicant",
  value: applicantRole()
}

const viewerRoleOption = {
  label: "Viewer",
  value: viewerRole()
}

const nameByRole = (role: UserRoles) => {
  switch (role.toUpperCase()) {
    case applicantRole():
      return applicantRoleOption.label
    case judgeRole():
      return judgeRoleOption.label
    case reviewerRole():
      return reviewerRoleOption.label
    case workspaceAdminRole():
      return workspaceAdminRoleOption.label
    case platformAdminRole():
      return platformAdminRoleOption.label
    case viewerRole():
      return viewerRoleOption.label
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

const inviteLaunchKCRoleOptions = () => {
  return [workspaceAdminRoleOption, judgeRoleOption]
}

export {
  nameByRole,
  editRoleOptions,
  inviteRoleOptions,
  inviteLaunchKCRoleOptions
}
