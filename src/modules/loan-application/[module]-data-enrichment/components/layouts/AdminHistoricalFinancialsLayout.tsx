import { type PropsWithChildren } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll.tsx"

export function AdminHistoricalFinancialsLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <div className="container bg-[#F9FAFB]">
      <div className="my-4 flex space-y-3xl ">
        <p className="mt-1 text-sm text-text-tertiary">
          This section offers a summary of your past financial performance,
          based on data from your connected Plaid account and the way you've
          categorized your transactions.
        </p>

        <div className="relative rounded-xl  bg-white">
          <ScrollArea className="max-w-[600px] lg:max-w-none">
            <ScrollBar className="invisible" orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 pt-xl">{children}</div>
    </div>
  )
}
