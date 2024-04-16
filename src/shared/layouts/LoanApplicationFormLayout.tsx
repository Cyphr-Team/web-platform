import React from "react"
import { SideNavLoanApplication } from "../molecules/SideNavLoanApplication"
import { cn } from "@/lib/utils"

export const LoanApplicationFormLayout = ({
  children
}: React.PropsWithChildren) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full z-40 flex left-0 top-0 mt-14 pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <SideNavLoanApplication />
      <div className="w-full overflow-auto flex flex-col">{children}</div>
    </div>
  )
}
