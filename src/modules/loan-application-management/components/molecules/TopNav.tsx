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
import { checkIsWorkspaceAdmin } from "../../../../utils/check-roles"
import { APPLICATION_MENU, ApplicationMenuName } from "../../constants"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function TopNav({ className, ...props }: Props) {
  const pathname = useLocation().pathname
  const { id } = useParams()

  let menuItems: (string | null)[] = APPLICATION_MENU(id!).map((e) => e.name)
  if (isLoanReady() || isCyphrBank()) {
    menuItems = [
      ApplicationMenuName.business,
      ApplicationMenuName.cashflow,
      ApplicationMenuName.debtSchedule,
      ApplicationMenuName.applicationSummary,
      ApplicationMenuName.loanReadiness
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
          {applicationMenu.map((example, index) => (
            <Link
              to={example.href}
              key={example.href}
              className={cn(
                "flex px-xs pb-lg font-semibold items-center justify-center text-center text-sm transition-colors border-b-2 border-transparent whitespace-nowrap",
                "hover:text-primary hover:border-primary",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
