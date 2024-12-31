import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import {
  APPLICANT_APPLICATION_MENU,
  APPLICANT_APPLICATION_MENU_V2
} from "@/modules/loan-application/[module]-financial-projection/constants/application"
import { Link, useLocation } from "react-router-dom"
import React from "react"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"

type TopNavProps = React.HTMLAttributes<HTMLDivElement> & {
  loanProgramId?: string
}

export function TopNav({
  id,
  className,
  loanProgramId,
  ...props
}: TopNavProps) {
  const pathname = useLocation().pathname
  const FINAL_APPLICATION_MENU = isEnableLoanReadyV2()
    ? APPLICANT_APPLICATION_MENU_V2(loanProgramId!, id!)
    : APPLICANT_APPLICATION_MENU(id!)

  return (
    <div className="relative rounded-xl bg-white p-2">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("flex items-center space-x-lg", className)}
          {...props}
        >
          {FINAL_APPLICATION_MENU.map((example, index) => (
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
