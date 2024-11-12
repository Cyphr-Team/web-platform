import React from "react"
import { SideNavApplicationDetails } from "../molecules/SideNavApplicationDetails"
import { cn } from "@/lib/utils"

export function LoanApplicationDetailLayout({
  children
}: React.PropsWithChildren) {
  return (
    <div
      className={cn(
        "absolute h-full w-full z-40 flex left-0 top-0 mt-14 pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <SideNavApplicationDetails />
      <div className="flex w-full flex-col overflow-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),_0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
        {children}
      </div>
    </div>
  )
}
