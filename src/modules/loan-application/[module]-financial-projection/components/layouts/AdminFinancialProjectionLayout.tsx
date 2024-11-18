import { cn } from "@/lib/utils"
import { type FC, type PropsWithChildren } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll.tsx"
import { ADMIN_APPLICATION_MENU } from "@/modules/loan-application/[module]-financial-projection/constants/application.ts"

export const AdminFinancialProjectionLayout: FC<PropsWithChildren> = (
  props
) => {
  const { children } = props
  const { id } = useParams()
  const pathname = useLocation().pathname

  const applicationMenu = ADMIN_APPLICATION_MENU(id ?? "")

  return (
    <div className={cn("container bg-[#F9FAFB]", "overflow-scroll")}>
      <div className="my-4 flex flex-col space-y-3xl ">
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
