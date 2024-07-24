import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { BusinessModelFormResponse } from "./type"
import { getQuestionLabel, getStrategyLabel } from "./constants"
import { get } from "lodash"
import { convertRevenueRangeToNumber } from "@/modules/loan-application/constants/options"

type Props = {
  data?: BusinessModelFormResponse
}

export const BusinessModelFormDetails: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Business Model</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          <AnswersTextDisplay
            key="description"
            label="How do you, or will you make money?"
            value={get(data, "description", "")}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            key="totalRevenueRange"
            label={getQuestionLabel("totalRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "totalRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            key="lastMonthRevenueRange"
            label={getQuestionLabel("lastMonthRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "lastMonthRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            key="lastYearRevenueRange"
            label={getQuestionLabel("lastYearRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "lastYearRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="scalePlan"
            label="What are your business’ near term plans to scale?"
            value={getStrategyLabel(get(data, "scalePlan", ""))}
          />
        </div>
      </div>
    </Card>
  )
}
