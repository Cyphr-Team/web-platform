import { UserRoles } from "@/types/user.type.ts"

export const EDIT_ROLES = [
  {
    label: "Lender Admin",
    value: UserRoles.CDFI_ADMIN
  },
  {
    label: "Loan Officer",
    value: UserRoles.LOAN_OFFICER
  }
]
