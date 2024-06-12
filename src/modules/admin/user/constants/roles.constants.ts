import {
  applicantRole,
  platformAdminRole,
  reviewerRole,
  UserRoles,
  workspaceAdminRole
} from "@/types/user.type.ts"
import { migrateUserRoleEnabled } from "@/utils/feature-flag.utils.ts"

// TODO: Clean deprecated role options after migrate to the new roles.
const DEPRECATED_EDIT_ROLE_OPTIONS = [
  {
    label: "Lender Admin",
    value: UserRoles.CDFI_ADMIN
  },
  {
    label: "Loan Officer",
    value: UserRoles.LOAN_OFFICER
  }
]

const DEPRECATED_INVITE_ROLE_OPTIONS = [
  ...DEPRECATED_EDIT_ROLE_OPTIONS,
  {
    label: "Loan Applicant",
    value: UserRoles.LOAN_APPLICANT
  }
]

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
    case UserRoles.CDFI_ADMIN:
      return "Lender Admin"
    case UserRoles.LOAN_OFFICER:
      return "Loan Officer"
    case UserRoles.LOAN_APPLICANT:
      return "Loan Applicant"
    case UserRoles.FORESIGHT_ADMIN:
      return "Cyphr Admin"
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
  return migrateUserRoleEnabled()
    ? [workspaceAdminRoleOption, reviewerRoleOption]
    : DEPRECATED_EDIT_ROLE_OPTIONS
}

const inviteRoleOptions = () => {
  return migrateUserRoleEnabled()
    ? [workspaceAdminRoleOption, reviewerRoleOption, applicantRoleOption]
    : DEPRECATED_INVITE_ROLE_OPTIONS
}

export { nameByRole, editRoleOptions, inviteRoleOptions }
