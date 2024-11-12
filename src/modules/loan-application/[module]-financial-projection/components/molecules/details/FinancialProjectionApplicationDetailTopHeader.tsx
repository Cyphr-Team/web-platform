import { ScrollArea, ScrollBar } from "@/components/ui/scroll.tsx"
import { cn } from "@/lib/utils.ts"
import { NavLink } from "react-router-dom"
import { FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU } from "@/modules/loan-application/[module]-financial-projection/constants"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { toCurrency } from "@/utils"

function Title() {
  const { loanRequest, businessInformation } = useLoanApplicationFormContext()

  return (
    <div className="mb-4 px-4xl text-3.5xl">
      {businessInformation?.businessLegalName ?? "---"}
      <span> • {toCurrency(loanRequest?.loanAmount, 0)}</span>
    </div>
  )
}

export function FinancialProjectionApplicationDetailTopHeader() {
  return (
    <div className="relative">
      <Title />
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center space-x-lg px-4xl")}>
          {FINANCIAL_PROJECTION_DETAIL_TOP_HEADER_MENU.map((menu) => (
            <NavLink
              key={menu.href}
              end
              className={({ isActive }) =>
                cn(
                  "flex px-xs pb-lg font-semibold items-center justify-center text-center text-sm transition-colors border-b-2 border-transparent whitespace-nowrap",
                  "hover:text-primary hover:border-primary",
                  isActive
                    ? "text-primary border-b-2 border-primary"
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
