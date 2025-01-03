import React from "react"
import { SideNavApplicationDetails } from "../molecules/SideNavApplicationDetails"
import { cn } from "@/lib/utils"
import { isCapitalCollab } from "@/utils/domain.utils"
import { CapitalCollabApplicantApplicationDetailHeader } from "@/modules/loan-application/capital-collab/components/molecules/CapitalCollabApplicantApplicationDetailHeader"

export function LoanApplicationDetailLayout({
  children
}: React.PropsWithChildren) {
  if (isCapitalCollab())
    return (
      <CapitalCollabApplicantApplicationDetailHeader>
        {children}
      </CapitalCollabApplicantApplicationDetailHeader>
    )

  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-40 mt-14 flex size-full pb-14",
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
