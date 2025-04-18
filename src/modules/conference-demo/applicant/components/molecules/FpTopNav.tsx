import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import { ApplicationMenuName } from "@/modules/loan-application/[module]-financial-projection/constants/application"
import { Link, useLocation } from "react-router-dom"
import { APP_PATH } from "@/constants"

const APPLICANT_APPLICATION_MENU = [
  {
    name: ApplicationMenuName.overview as string,
    href: APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.overview
  },
  {
    name: ApplicationMenuName.cashFlow as string,
    href: APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.cashFlow
  },
  {
    name: ApplicationMenuName.balanceSheet as string,
    href: APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.balanceSheet
  },
  {
    name: ApplicationMenuName.incomeStatement as string,
    href: APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.incomeStatement
  },
  {
    name: ApplicationMenuName.loanReady as string,
    href: APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.loanReady
  }
]

interface FpTopNavProps {
  className?: string
}

export function FpTopNav({ className }: FpTopNavProps) {
  const pathname = useLocation().pathname

  return (
    <div className="relative rounded-xl bg-white p-2">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center space-x-lg", className)}>
          {APPLICANT_APPLICATION_MENU.map((example, index) => (
            <Link
              key={example.href}
              className={cn(
                "flex h-full items-center justify-center whitespace-nowrap rounded-lg border-transparent px-4xl py-md text-center text-sm font-normal transition-colors",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "bg-financial-projection-btn text-white"
                  : ""
              )}
              to={example.href}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
