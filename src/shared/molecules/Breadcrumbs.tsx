import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { type Breadcrumb } from "@/types/common.type"
import { ChevronRight } from "lucide-react"
import React from "react"
import { NavLink } from "react-router-dom"

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  breads?: Breadcrumb[]
}

export function Breadcrumbs({ className, breads = [] }: BreadcrumbsProps) {
  return (
    <div className={cn("flex space-x-lg items-center px-8", className)}>
      {breads.map(({ label, to }, index) => {
        return (
          <React.Fragment key={to}>
            <NavLink
              end
              className={({ isActive }) => (isActive ? "text-primary" : "")}
              to={to}
            >
              {({ isActive }) => (
                <>
                  {label === "Home" ? (
                    <Icons.home
                      className={cn(
                        "w-5 text-muted-foreground",
                        isActive && "text-primary"
                      )}
                    />
                  ) : (
                    <p className="text-sm font-medium">{label}</p>
                  )}
                </>
              )}
            </NavLink>

            {index !== breads.length - 1 && (
              <ChevronRight className="text-text-senary w-4" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
