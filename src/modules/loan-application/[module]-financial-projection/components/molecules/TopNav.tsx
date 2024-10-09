import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import {
  APPLICATION_MENU,
  ApplicationMenuName
} from "@/modules/loan-application/[module]-financial-projection/constants/application"
import { Link, useLocation } from "react-router-dom"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function TopNav({ id, className, ...props }: Props) {
  const pathname = useLocation().pathname

  let menuItems: (string | null)[] = APPLICATION_MENU(id!).map((e) => e.name)
  menuItems = [
    ApplicationMenuName.overview,
    ApplicationMenuName.cashFlow,
    ApplicationMenuName.balanceSheet,
    ApplicationMenuName.incomeStatement,
    ApplicationMenuName.loanReady
  ]

  menuItems = menuItems.filter(Boolean)

  const applicationMenu = APPLICATION_MENU(id!).filter((el) =>
    menuItems.includes(el.name)
  )

  return (
    <div className="relative bg-white p-2 rounded-xl">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("flex items-center space-x-lg", className)}
          {...props}
        >
          {applicationMenu.map((example, index) => (
            <Link
              to={example.href}
              key={example.href}
              className={cn(
                "flex rounded-lg px-4xl py-md h-full font-normal items-center justify-center text-center text-sm transition-colors border-transparent whitespace-nowrap",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
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
  )
}
