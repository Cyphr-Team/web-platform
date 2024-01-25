import { USER_ROLES } from "@/common"
import { IconProps } from "@/components/ui/icons"
import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon: LucideIcon | ((props: IconProps) => JSX.Element)
  label?: string
  description?: string
  roles?: USER_ROLES[]
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

export type StateType = {
  id: number
  name: string
  state_code: string
  latitude: string
  longitude: string
  country_id: number
  cities: CityType[]
}

export type CityType = {
  id: number
  name: string
  latitude: string
  longitude: string
}
