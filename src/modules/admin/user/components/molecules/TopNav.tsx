import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { USER_MENU } from "@/modules/admin/user/constants"
import React from "react"

type Props = React.HTMLAttributes<HTMLDivElement>

export function TopNav({ className, ...props }: Props) {
  const pathname = useLocation().pathname
  const userMenu = USER_MENU()

  return (
    <div className="relative mb-8">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("space-x-8xl flex items-center", className)}
          {...props}
        >
          {userMenu.map((example, index) => (
            <Link
              key={example.href}
              className={cn(
                "items-center justify-center whitespace-nowrap border-b-2 border-transparent px-xs pb-lg text-center font-semibold transition-colors",
                "hover:border-primary hover:text-primary",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground",
                className,
                index > 0 ? "ml-4" : "ml-0"
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
  )
}
