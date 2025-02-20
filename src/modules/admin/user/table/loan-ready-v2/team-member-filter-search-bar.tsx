import { Form, FormField } from "@/components/ui/form"
import { type Option } from "@/types/common.type"
import { type ReactNode, useCallback } from "react"
import { type UseFormReturn } from "react-hook-form"
import { MultiSelectRound } from "@/components/ui/multi-select-round.tsx"
import { UserRoles, UserStatus } from "@/types/user.type.ts"
import { type UserFilterValues } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateUser.ts"
import { Badge } from "@/components/ui/badge.tsx"
import {
  getBadgeVariantByRole,
  getRoleDisplayName
} from "@/modules/loanready/services"

interface IFilter {
  filterForm: UseFormReturn<UserFilterValues>
}

export const enum FormFieldNames {
  Statuses = "filter.statuses",
  Accounts = "filter.accountTypes",
  Roles = "filter.roles"
}

const ROLES_OPTIONS: Option<UserRoles>[] = [
  {
    value: UserRoles.WORKSPACE_ADMIN,
    label: "Admin"
  },
  {
    value: UserRoles.VIEWER,
    label: "Viewer"
  }
]

const STATUS_OPTIONS: Option<UserStatus>[] = [
  {
    value: UserStatus.ACTIVE,
    label: "Active"
  },
  {
    value: UserStatus.PENDING,
    label: "Pending"
  }
]

const ACCOUNT_OPTIONS: Option[] = [
  {
    value: "GOOGLE",
    label: "Google"
  },
  {
    value: "EMAIL",
    label: "Email"
  },
  {
    value: "ANONYMOUS",
    label: "Anonymous"
  }
]

export function FilterSearchTeamMembers({ filterForm }: IFilter) {
  const MultiSelectComponent = useCallback(
    <T,>(option: Option<T>, close: ReactNode) => (
      <div>
        {option.label}
        {close}
      </div>
    ),
    []
  )

  const RoleMultiSelectComponent = useCallback(
    (option: Option<UserRoles>, close: ReactNode) => (
      <Badge
        className="text-[#252828]"
        variant="solid"
        variantColor={getBadgeVariantByRole(option.value)}
      >
        {getRoleDisplayName(option.value)}
        {close}
      </Badge>
    ),
    []
  )

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Roles}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Roles"
              labelHOC={(option, close) =>
                RoleMultiSelectComponent(option, close)
              }
              options={ROLES_OPTIONS}
              subLabel="Select role"
            />
          )}
        />
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Statuses}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Status"
              labelHOC={(option, close) => MultiSelectComponent(option, close)}
              options={STATUS_OPTIONS}
              subLabel="Select status"
            />
          )}
        />
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Accounts}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Account Type"
              labelHOC={(option, close) => MultiSelectComponent(option, close)}
              options={ACCOUNT_OPTIONS}
              subLabel="Select account type"
            />
          )}
        />
      </div>
    </Form>
  )
}
