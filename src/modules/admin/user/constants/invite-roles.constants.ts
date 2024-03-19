import { UserRoles } from "@/types/user.type"

const INVITE_ROLES = [
  {
    label: "CDFI Admin",
    value: UserRoles.CDFI_ADMIN
  },
  {
    label: "Loan Officer",
    value: UserRoles.LOAN_OFFICER
  },
  {
    label: "Loan Applicant",
    value: UserRoles.LOAN_APPLICANT
  }
]

export { INVITE_ROLES }
