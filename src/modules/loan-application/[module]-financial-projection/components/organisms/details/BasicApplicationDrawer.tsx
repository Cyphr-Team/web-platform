import { Drawer } from "@/modules/loan-application/[module]-financial-projection/components/molecules/Drawer.tsx"
import { LoanReadyPlan } from "@/modules/loanready/types/payment.ts"

export function BasicApplicationDrawer() {
  return <Drawer applicationPlan={LoanReadyPlan.BASIC} />
}
