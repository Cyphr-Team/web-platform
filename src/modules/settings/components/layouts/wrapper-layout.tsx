import { Component as ApplicantLayout } from "@/modules/loan-application/page.tsx"
import { Component as DashboardLayout } from "@/shared/layouts/dashboard-layout/dashboard-layout"
import { checkIsLoanApplicant } from "@/utils/check-roles.ts"

export function WrapperLayout(): JSX.Element {
  return checkIsLoanApplicant() ? <ApplicantLayout /> : <DashboardLayout />
}
