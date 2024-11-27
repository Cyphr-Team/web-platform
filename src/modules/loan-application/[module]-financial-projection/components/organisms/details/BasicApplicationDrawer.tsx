import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export function BasicApplicationDrawer() {
  return <Drawer applicationPlan={LoanReadyPlanEnum.BASIC} />
}
