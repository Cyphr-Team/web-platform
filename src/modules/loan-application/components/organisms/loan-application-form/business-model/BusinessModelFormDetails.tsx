import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { type BusinessModelFormResponse } from "./type"
import { getQuestionLabel, getStrategyLabel } from "./constants"
import { get } from "lodash"
import { convertRevenueRangeToNumber } from "@/modules/loan-application/constants/options"

interface Props {
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
            key="totalRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("totalRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "totalRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="lastMonthRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("lastMonthRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "lastMonthRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="lastYearRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("lastYearRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(data, "lastYearRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="annualPayroll"
            className="!flex-row justify-between"
            label="What is your annual payroll?"
            value={get(data, "annualPayroll", "") as string}
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
