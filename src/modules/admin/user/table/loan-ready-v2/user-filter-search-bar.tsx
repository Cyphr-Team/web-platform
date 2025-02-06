import { Form, FormField } from "@/components/ui/form"
import { type Option } from "@/types/common.type"
import { type ReactNode, useCallback } from "react"
import { type UseFormReturn } from "react-hook-form"
import { MultiSelectRound } from "@/components/ui/multi-select-round.tsx"
import { UserStatus } from "@/types/user.type.ts"
import { type UserFilterValues } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateUser.ts"

interface IFilter {
  filterForm: UseFormReturn<UserFilterValues>
}

export const enum FormFieldNames {
  Statuses = "filter.statuses",
  Accounts = "filter.accountTypes"
}

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
  }
]

export function FilterSearchUsers({ filterForm }: IFilter) {
  const MultiSelectComponent = useCallback(
    <T,>(option: Option<T>, close: ReactNode) => (
      <div>
        {option.label}
        {close}
      </div>
    ),
    []
  )

  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
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
