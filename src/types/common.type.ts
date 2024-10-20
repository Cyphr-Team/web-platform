import { type IconProps } from "@/components/ui/icons"
import { type FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { type FeatureKey } from "@/hooks/useCanAccess"
import { type ErrorCode } from "@/utils/custom-error"
import { type LucideIcon } from "lucide-react"
import { type ReactNode } from "react"
import { type UserRoles } from "./user.type"

// --- RESPONSE ---
interface SuccessResponse {
  success: boolean
}
interface ErrorResponse {
  message?: string
  code: ErrorCode
}

export type { ErrorResponse, SuccessResponse }

// --- SELECT OPTION ---
interface Option<T = string> {
  label: string
  value: T
  icon?: LucideIcon | ((props: IconProps) => JSX.Element)
}

interface IOptionWithOther<T = string> extends Option<T> {
  readonly otherFieldName?: string
}

export type { IOptionWithOther, Option }

// --- PARAMS WHEN FETCHING LISTS ---
enum SortOrder {
  DESC = "DESC",
  ASC = "ASC",
  DESC_NULLS_LAST = "DESC_NULLS_LAST",
  ASC_NULLS_FIRST = "ASC_NULLS_FIRST"
}

export { SortOrder }

interface PaginateParams {
  limit: number
  offset: number
}

export type { PaginateParams }

// --- INFINITY LIST RESPONSE  ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ListResponse<TData = any> {
  total: number
  currentOffset: number
  data: TData[]
}

export type { ListResponse }

// --- NAV ITEM ---
interface NavItem {
  title: string
  href?: string
  featureFlag?: FEATURE_FLAGS | FEATURE_FLAGS[]
  disabled?: boolean
  external?: boolean
  icon: LucideIcon | ((props: IconProps) => JSX.Element)
  label?: string
  description?: string
  roles?: UserRoles[]
  featureKey: FeatureKey
  className?: string
}
interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}
interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type { NavItem, NavItemWithChildren, NavItemWithOptionalChildren }

// --- STATE ---
interface CityType {
  id: number
  name: string
  latitude: string
  longitude: string
}
interface StateType {
  id: number
  name: string
  state_code: string
  latitude: string
  longitude: string
  country_id: number
  cities: CityType[]
}

export type { CityType, StateType }

// --- BREADCRUMB ---
interface Breadcrumb {
  label: ReactNode
  to: string
}

export type { Breadcrumb }

// --- QUERY RESPONSE ---
export interface ImageDataResponse {
  fileData: string
}

export interface AddressType {
  addressLine1: string
  state: string
  country: string
  countryCode: string
  zip: string
  city: string
}
