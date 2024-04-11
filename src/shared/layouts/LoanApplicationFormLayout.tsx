import React from "react"
import { SideNavLoanApplication } from "../molecules/SideNavLoanApplication"

export const LoanApplicationFormLayout = ({
  children
}: React.PropsWithChildren) => {
  return (
    <div className="absolute h-full w-full z-40 flex left-0 top-0">
      <SideNavLoanApplication />
      <div className="w-full overflow-auto flex flex-col">{children}</div>
    </div>
  )
}
