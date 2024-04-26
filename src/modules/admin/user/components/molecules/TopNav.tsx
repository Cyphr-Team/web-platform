import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { USER_MENU } from "@/modules/admin/user/constants"
import React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function TopNav({ className, ...props }: Props) {
  const userMenu = USER_MENU()

  return (
    <div className="relative mb-8">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div
          className={cn("flex items-center space-x-8xl", className)}
          {...props}
        >
          {userMenu.map((example, index) => (
            <Link
              to={example.href}
              key={example.href}
              className={cn(
                "flex px-xs pb-lg font-semibold items-center justify-center text-base transition-colors border-b-2 border-transparent whitespace-nowrap",
                "hover:text-primary hover:border-primary",
                className,
                index > 0 ? "ml-4" : "ml-0"
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
