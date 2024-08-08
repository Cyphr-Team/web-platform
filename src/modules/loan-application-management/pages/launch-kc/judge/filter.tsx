import { Form, FormField } from "@/components/ui/form"
import { MultiSelectRound } from "@/components/ui/multi-select-round"
import { FC } from "react"
import { UseFormReturn } from "react-hook-form"
import { ScoredBadgeStatus } from "../../../components/atoms/score/ScoredBadgeStatus"
import { StatusRoundBadge } from "../../../components/atoms/StatusRoundBadge"
import { ASSIGNABLE_STAGE, SCORED_STATUS } from "../../../constants"
import { JudgeLoanApplicationFilterValues } from "../../../hooks/useQuery/useQueryListPaginateJudgeLoanApplication"

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
              label="Scorecard Status"
              field={field}
              options={SCORED_STATUS}
              labelHOC={(option, close) => (
                <ScoredBadgeStatus scoredAt={option.value === "true"}>
                  {option.label} {close}
                </ScoredBadgeStatus>
              )}
            />
          )}
        />

        <FormField
          control={filterForm.control}
          name="applicationCaptureStages"
          render={({ field }) => (
            <MultiSelectRound
              label="Round"
              field={field}
              options={ASSIGNABLE_STAGE}
              labelHOC={(option, close) => (
                <StatusRoundBadge round={option.value}>
                  {option.label} {close}
                </StatusRoundBadge>
              )}
            />
          )}
        />
      </div>
    </Form>
  )
}
