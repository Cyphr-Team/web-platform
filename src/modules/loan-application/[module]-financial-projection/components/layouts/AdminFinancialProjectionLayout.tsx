import { cn } from "@/lib/utils"
import { FC, PropsWithChildren } from "react"
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
    <div className={cn("bg-[#F9FAFB] container", "overflow-scroll")}>
      <div className="my-4 flex flex-col space-y-3xl ">
        <div className="relative bg-white  rounded-xl">
          <ScrollArea className="max-w-[600px] lg:max-w-none">
            <div className="flex items-center space-x-lg">
              {applicationMenu.map((example) => (
                <Link
                  to={example.href}
                  key={example.href}
                  className={cn(
                    "flex rounded-lg px-4xl py-md h-full font-normal items-center justify-center text-center text-sm transition-colors border-transparent whitespace-nowrap",
                    pathname?.startsWith(example.href)
                      ? "bg-financial-projection-btn text-white"
                      : ""
                  )}
                >
                  {example.name}
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>
      <div className="p-xl pt-3xl flex-1 bg-gray-50">{children}</div>
    </div>
  )
}
