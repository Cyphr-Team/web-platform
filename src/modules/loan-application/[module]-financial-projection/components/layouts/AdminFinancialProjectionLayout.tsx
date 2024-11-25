import { cn } from "@/lib/utils"
import { type PropsWithChildren } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll.tsx"
import {
  ADMIN_APPLICATION_MENU,
  ADMIN_APPLICATION_MENU_V2
} from "@/modules/loan-application/[module]-financial-projection/constants/application.ts"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"

export function AdminFinancialProjectionLayout(props: PropsWithChildren) {
  const { children } = props
  const { id } = useParams()
  const pathname = useLocation().pathname

  const applicationMenu = isEnableLoanReadyV2()
    ? ADMIN_APPLICATION_MENU_V2(id ?? "")
    : ADMIN_APPLICATION_MENU(id ?? "")

  return (
    <div className={cn("container bg-[#F9FAFB]", "overflow-scroll")}>
      <div className="my-4 flex flex-col space-y-3xl ">
        {isEnableLoanReadyV2() && (
          <p className="mt-1 text-sm text-text-tertiary">
            This section provides an overview of your financial projections,
            including metrics, cash flow, balance sheets, and income statements.
            It estimates future performance and shows how revenue and expenses
            could affect profitability.
          </p>
        )}
        <div className="relative rounded-xl  bg-white">
          <ScrollArea className="max-w-[600px] lg:max-w-none">
            <div className="flex items-center space-x-lg">
              {applicationMenu.map((example) => (
                <Link
                  key={example.href}
                  className={cn(
                    "flex h-full items-center justify-center whitespace-nowrap rounded-lg border-transparent px-4xl py-md text-center text-sm font-normal transition-colors",
                    pathname?.startsWith(example.href)
                      ? "bg-financial-projection-btn text-white"
                      : ""
                  )}
                  to={example.href}
                >
                  {example.name}
                </Link>
              ))}
            </div>
            <ScrollBar className="invisible" orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-xl pt-3xl">{children}</div>
    </div>
  )
}
