import { Form, FormField } from "@/components/ui/form"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { type FC } from "react"
import { type UseFormReturn } from "react-hook-form"
import { ScoredBadgeStatus } from "../../../components/atoms/score/ScoredBadgeStatus"
import { StatusRoundBadge } from "../../../components/atoms/StatusRoundBadge"
import { ASSIGNABLE_STAGE, SCORED_STATUS } from "../../../constants"
import { type JudgeLoanApplicationFilterValues } from "../../../hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

interface IFilter {
  filterForm: UseFormReturn<JudgeLoanApplicationFilterValues>
}

export const Filter: FC<IFilter> = ({ filterForm }) => {
  return (
    <Form {...filterForm}>
      <div className="flex gap-3">
        <FormField
          control={filterForm.control}
          name="isScoreds"
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Scorecard Status"
              labelHOC={(option, close) => (
                <ScoredBadgeStatus scoredAt={option.value === "true"}>
                  {option.label} {close}
                </ScoredBadgeStatus>
              )}
              options={SCORED_STATUS}
            />
          )}
        />

        <FormField
          control={filterForm.control}
          name="applicationCaptureStages"
          render={({ field }) => (
            <MultiSelectRound
              field={field}
              label="Round"
              labelHOC={(option, close) => (
                <StatusRoundBadge round={option.value}>
                  {option.label} {close}
                </StatusRoundBadge>
              )}
              options={ASSIGNABLE_STAGE}
            />
          )}
        />
      </div>
    </Form>
  )
}
