import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { useCheckLoanReadyPlan } from "@/modules/loan-application/[module]-financial-projection/hooks/loanready/useCheckLoanReadyPlan.ts"
import { useParams } from "react-router-dom"

export function BasicApplicationDrawer() {
  const { id: applicationId } = useParams()
  const { isPlusPlan } = useCheckLoanReadyPlan({ applicationId })

  return (
    <Drawer
      applicationPlan={
        isPlusPlan ? LoanReadyPlanEnum.PLUS : LoanReadyPlanEnum.BASIC
      }
    />
  )
}
