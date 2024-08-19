import { ComponentType, FC } from "react"
import { SCREEN } from "@/modules/financial-projection/constants"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import DirectCostForm from "@/modules/financial-projection/components/organisms/DirectCostForm.tsx"

// TODO: remove this
const KhoaiMon = () => {
  return <div>KhoaiMon</div>
}

// TODO: CHANGE THE COMPONENT HERE
const ScreenMapper: { [key: string]: ComponentType } = {
  [SCREEN.INPUT_REVENUE]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_DIRECT_COSTS]: DirectCostForm,
  [SCREEN.INPUT_OPERATING_EXPENSES]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_TAX_RATES]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_INITIAL_BALANCES]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_INITIAL_LIABILITIES]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_INITIAL_EQUITY]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_ASSETS]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_DEBT_FINANCING]: KhoaiMon, // TODO: fix me
  [SCREEN.INPUT_EQUITY_FINANCING]: KhoaiMon, // TODO: fix me

  [SCREEN.EXPORT_FORECAST_FOR_USE]: KhoaiMon, // TODO: fix me

  [SCREEN.ASSUMPTIONS]: KhoaiMon, // TODO: fix me
  [SCREEN.INCOME]: KhoaiMon, // TODO: fix me
  [SCREEN.BALANCE]: KhoaiMon, // TODO: fix me
  [SCREEN.CASH_FLOW]: KhoaiMon // TODO: fix me
}

interface Props {}

const FinancialToolkitDetailTemplate: FC<Props> = () => {
  const currentScreen = useFinancialToolkitStore.use.currentScreen()
  const Component = ScreenMapper[currentScreen]
  return <Component />
}
export default FinancialToolkitDetailTemplate
