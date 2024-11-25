import { ScrollArea, ScrollBar } from "@/components/ui/scroll.tsx"
import { cn } from "@/lib/utils.ts"
import { NavLink } from "react-router-dom"
import {
  FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU,
  FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU_V2
} from "@/modules/loan-application/[module]-financial-projection/constants"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { toCurrency } from "@/utils"
import {
  isEnableFormV2,
  isEnableLoanReadyV2
} from "@/utils/feature-flag.utils.ts"

function Title() {
  const { loanRequest, loanRequestV2, businessInformation } =
    useLoanApplicationFormContext()

  const loanAmount = isEnableFormV2()
    ? loanRequestV2?.loanAmount
    : loanRequest?.loanAmount

  return (
    <div className="mb-4 px-4xl text-3.5xl">
      {businessInformation?.businessLegalName ?? "---"}
      <span> • {toCurrency(loanAmount, 0)}</span>
    </div>
  )
}

export function FinancialProjectionApplicationDetailTopHeader() {
  const HEADER_MENU = isEnableLoanReadyV2()
    ? FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU_V2
    : FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU

  return (
    <div className="relative">
      <Title />
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center space-x-lg px-4xl")}>
          {HEADER_MENU.map((menu) => (
            <NavLink
              key={menu.href}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-xs pb-lg text-center text-sm font-semibold transition-colors",
                  "hover:border-primary hover:text-primary",
                  isActive
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                )
              }
              to={menu.href}
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
