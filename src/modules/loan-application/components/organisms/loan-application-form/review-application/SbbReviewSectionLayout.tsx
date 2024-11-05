import { cn } from "@/lib/utils.ts"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service.ts"
import { type PropsWithChildren } from "react"

export function SbbReviewSectionLayout({
  children,
  className
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <div
      className={cn(
        "border rounded-lg h-fit overflow-auto loan-application-item",
        className
      )}
    >
      <div
        className={cn(EXPORT_CLASS.FINANCIAL, "p-4xl flex flex-col gap-2xl")}
      >
        {children}
      </div>
    </div>
  )
}
