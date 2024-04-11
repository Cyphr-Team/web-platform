import React from "react"
import { SideNavApplicationDetails } from "../molecules/SideNavApplicationDetails"

export const LoanApplicationDetailLayout = ({
  children
}: React.PropsWithChildren) => {
  return (
    <div className="absolute h-full w-full z-40 flex left-0 top-0">
      <SideNavApplicationDetails />
      <div className="w-full overflow-auto flex flex-col">{children}</div>
    </div>
  )
}
