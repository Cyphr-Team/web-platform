import { Form, FormField } from "@/components/ui/form"
import { type Option } from "@/types/common.type"
import { type ReactNode } from "react"
import { type UseFormReturn } from "react-hook-form"
import { MultiSelectRound } from "@/components/ui/multi-select-round.tsx"
import { type FeatureFlagFilterValues } from "@/modules/feature-flag/hooks/useQuery/useQueryFeatureFlags"
import { FeatureFlagRolloutType } from "@/types/feature-flag.types"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"

interface IFilter {
  filterForm: UseFormReturn<FeatureFlagFilterValues>
}

const enum FormFieldNames {
  Status = "status",
  Search = "search",
  RolloutType = "rolloutType"
}

const STATUS_OPTIONS: Option[] = [
  {
    value: BINARY_VALUES.YES,
    label: "On"
  },
  {
    value: BINARY_VALUES.NO,
    label: "Off"
  }
]

const ROLLOUT_TYPE_OPTIONS: Option<FeatureFlagRolloutType>[] = [
  {
    value: FeatureFlagRolloutType.FULL,
    label: "All users"
  },
  {
    value: FeatureFlagRolloutType.WHITELIST,
    label: "Whitelisted users"
  }
]

const StatusMultiSelectComponent = (option: Option, close: ReactNode) => (
  <div>
    {option.label}
    {close}
  </div>
)

const RolloutTypeMultiSelectComponent = (
  option: Option<FeatureFlagRolloutType>,
  close: ReactNode
) => (
  <div>
    {option.label}
    {close}
  </div>
)

export function FeatureFlagTableHeader({ filterForm }: IFilter) {
  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name={FormFieldNames.Status}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Status"
              labelHOC={(option, close) =>
                StatusMultiSelectComponent(option, close)
              }
              options={STATUS_OPTIONS}
              subLabel="Select status"
            />
          )}
        />
        <FormField
          control={filterForm.control}
          name={FormFieldNames.RolloutType}
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Rollout Type"
              labelHOC={(option, close) =>
                RolloutTypeMultiSelectComponent(option, close)
              }
              options={ROLLOUT_TYPE_OPTIONS}
              subLabel="Select rollout type"
            />
          )}
        />
      </div>
    </Form>
  )
}
