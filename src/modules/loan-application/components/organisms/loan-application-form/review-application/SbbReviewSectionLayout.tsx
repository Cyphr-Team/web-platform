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
        "loan-application-item h-fit overflow-auto rounded-lg border",
        className
      )}
    >
      <div
        className={cn(EXPORT_CLASS.FINANCIAL, "flex flex-col gap-2xl p-4xl")}
      >
        {children}
      </div>
    </div>
  )
}
