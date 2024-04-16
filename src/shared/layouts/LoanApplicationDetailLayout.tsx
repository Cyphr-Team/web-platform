import React from "react"
import { SideNavApplicationDetails } from "../molecules/SideNavApplicationDetails"
import { cn } from "@/lib/utils"

export const LoanApplicationDetailLayout = ({
  children
}: React.PropsWithChildren) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full z-40 flex left-0 top-0 mt-14 pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <SideNavApplicationDetails />
      <div className="w-full overflow-auto flex flex-col">{children}</div>
    </div>
  )
}
