import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { Link, useLocation, useParams } from "react-router-dom"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles.ts"
import { APPLICATION_MENU, ApplicationMenuName } from "../../constants"
import { ADMIN_APPLICATION_MENU } from "@/modules/loan-application/[module]-financial-projection/constants/application.ts"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"

type Props = React.HTMLAttributes<HTMLDivElement>

export function TopNav({ className, ...props }: Props) {
  const pathname = useLocation().pathname
  const { id } = useParams()

  let menuItems: (string | null)[] = APPLICATION_MENU(id!).map((e) => e.name)

  if (isLoanReady()) {
    if (isEnableLoanReadyV2()) {
      menuItems = [
        ApplicationMenuName.applicationSummary,
        ApplicationMenuName.financialProjection,
        ApplicationMenuName.loanReady
      ]
    } else {
      menuItems = [
        ApplicationMenuName.business,
        ApplicationMenuName.applicationSummary,
        ApplicationMenuName.financialProjection
      ]
    }
  } else if (isCyphrBank()) {
    menuItems = [
      ApplicationMenuName.business,
      ApplicationMenuName.applicationSummary,
      ApplicationMenuName.financialProjection
    ]
  } else if (isKccBank()) {
    menuItems = [
      ApplicationMenuName.business,
      ApplicationMenuName.identity,
      ApplicationMenuName.cashflow,
      ApplicationMenuName.applicationSummary
    ]
  } else if (isLaunchKC()) {
    if (checkIsWorkspaceAdmin()) {
      menuItems = [
        ApplicationMenuName.business,
        ApplicationMenuName.identity,
        ApplicationMenuName.document,
        ApplicationMenuName.cashflow,
        ApplicationMenuName.applicationSummary
      ]
    } else {
      // In Launch KC, this else case means the Judge role only
      menuItems = [
        ApplicationMenuName.business,
        ApplicationMenuName.identity,
        ApplicationMenuName.document,
        ApplicationMenuName.applicationSummary
      ]
    }
  } else if (isSbb()) {
    menuItems = [
      ApplicationMenuName.business,
      ApplicationMenuName.identity,
      ApplicationMenuName.document,
      ApplicationMenuName.applicationSummary
    ]
  }

  menuItems = menuItems.filter(Boolean)

  const applicationMenu = APPLICATION_MENU(id!).filter((el) =>
    menuItems.includes(el.name)
  )

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("flex items-center space-x-lg px-4xl", className)}
          {...props}
        >
          {applicationMenu.map((example, index) => {
            /**
             * Here is the things. Basically we have three tabs:
             * - Business Verification
             * - Application Summary
             * - Financial Projections: (this shiet have another sub tab)
             *    + Overview
             *    + Cash Flow
             *    + Income Statement
             *    + Loan Ready
             * So, this code handle the active state for FP tab.
             * These logic can speak as follows:
             * If current tabs is sub tabs of FP, set the FP active
             * */
            const isFpTab =
              example.name === ApplicationMenuName.financialProjection
            const isChildFpTab = ADMIN_APPLICATION_MENU(id!).find(
              (item) => item.href === pathname
            )
            const defaultActive =
              pathname?.startsWith(example.href) ||
              (index === 0 && pathname === "/")
            const isActive = isFpTab ? isChildFpTab : defaultActive

            return (
              <Link
                key={example.href}
                className={cn(
                  "flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-xs pb-lg text-center text-sm font-semibold transition-colors",
                  "hover:border-primary hover:text-primary",
                  isActive
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                )}
                to={example.href}
              >
                {example.name}
              </Link>
            )
          })}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
