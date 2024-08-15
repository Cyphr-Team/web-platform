import { FC, ReactNode } from "react"
import { SCREEN } from "@/modules/financial-projection/constants"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

interface Props {}

// TODO: CHANGE THE COMPONENT HERE
const ScreenMapper: { [key: string]: ReactNode } = {
  [SCREEN.INPUT_REVENUE]: <div>SCREEN.INPUT_REVENUE</div>,
  [SCREEN.INPUT_DIRECT_COSTS]: <div>SCREEN.INPUT_DIRECT_COSTS</div>,
  [SCREEN.INPUT_OPERATING_EXPENSES]: <div>SCREEN.INPUT_OPERATING_EXPENSES</div>,
  [SCREEN.INPUT_TAX_RATES]: <div>SCREEN.INPUT_TAX_RATES</div>,
  [SCREEN.INPUT_INITIAL_BALANCES]: <div>SCREEN.INPUT_INITIAL_BALANCES</div>,
  [SCREEN.INPUT_INITIAL_LIABILITIES]: (
    <div>SCREEN.INPUT_INITIAL_LIABILITIES</div>
  ),
  [SCREEN.INPUT_INITIAL_EQUITY]: <div>SCREEN.INPUT_INITIAL_EQUITY</div>,
  [SCREEN.INPUT_ASSETS]: <div>SCREEN.INPUT_ASSETS</div>,
  [SCREEN.INPUT_DEBT_FINANCING]: <div>SCREEN.INPUT_DEBT_FINANCING</div>,
  [SCREEN.INPUT_EQUITY_FINANCING]: <div>SCREEN.INPUT_EQUITY_FINANCING</div>,

  [SCREEN.EXPORT_FORECAST_FOR_USE]: <div>SCREEN.EXPORT_FORECAST_FOR_USE</div>,

  [SCREEN.ASSUMPTIONS]: <div>SCREEN.ASSUMPTIONS</div>,
  [SCREEN.INCOME]: <div>SCREEN.INCOME</div>,
  [SCREEN.BALANCE]: <div>SCREEN.BALANCE</div>,
  [SCREEN.CASH_FLOW]: <div>SCREEN.CASH_FLOW</div>
}

const FinancialToolkitDetailTemplate: FC<Props> = () => {
  const currentScreen = useFinancialToolkitStore.use.currentScreen()

  return ScreenMapper[currentScreen]
}
export default FinancialToolkitDetailTemplate
