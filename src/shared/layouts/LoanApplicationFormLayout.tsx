import React from "react"
import { SideNavLoanApplication } from "../molecules/SideNavLoanApplication"
import { cn } from "@/lib/utils"

export function LoanApplicationFormLayout({
  children
}: React.PropsWithChildren) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-40 mt-14 flex size-full pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <SideNavLoanApplication />
      <div className="flex w-full flex-col overflow-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),_0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
        {children}
      </div>
    </div>
  )
}
