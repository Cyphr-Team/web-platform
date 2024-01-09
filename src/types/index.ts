import { IconProps } from "@/assets/icons/icon"
import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon: LucideIcon | ((props: IconProps) => JSX.Element)
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren
