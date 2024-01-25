import { cn } from "@/lib/utils"
import { ChevronRight, HomeIcon } from "lucide-react"
import React from "react"
import { Link, NavLink } from "react-router-dom"

export interface Breads {
  label: string
  to: string
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  breads?: Breads[]
}

export function Breadcrumbs({ className, breads = [] }: BreadcrumbsProps) {
  return (
    <div className={cn("flex space-x-lg items-center px-4xl", className)}>
      <Link to="/">
        <HomeIcon className="h-5 w-5" />
      </Link>
      {breads.map(({ label, to }) => {
        return (
          <React.Fragment key={to}>
            <ChevronRight className="text-text-senary" />
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "text-primary" : "")}
              end
            >
              <p className="text-sm font-medium">{label}</p>
            </NavLink>
          </React.Fragment>
        )
      })}
    </div>
  )
}
