import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { type BusinessModelFormResponse } from "./type"
import { getQuestionLabel, getStrategyLabel } from "./constants"
import { get } from "lodash"
import { convertRevenueRangeToNumber } from "@/modules/loan-application/constants/options"
import { type BusinessModelFormValue } from "@/modules/loan-application/constants/form.ts"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

interface Props {
  data?: BusinessModelFormResponse
  dataV2?: BusinessModelFormValue
}

export const BusinessModelFormDetails: React.FC<Props> = ({ data, dataV2 }) => {
  const dataToUse = isEnableFormV2() && dataV2 ? dataV2 : data

  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
      <h5 className="text-lg font-semibold">Business Model</h5>
      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <div className="flex flex-col gap-y-4xl">
          <AnswersTextDisplay
            key="description"
            label="How do you, or will you make money?"
            value={get(dataToUse, "description", "")}
          />
          <AnswersTextDisplay
            key="totalRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("totalRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(dataToUse, "totalRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="lastMonthRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("lastMonthRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(dataToUse, "lastMonthRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="lastYearRevenueRange"
            className="!flex-row justify-between"
            label={getQuestionLabel("lastYearRevenueRange")}
            value={convertRevenueRangeToNumber(
              get(dataToUse, "lastYearRevenueRange", "")
            )}
          />
          <AnswersTextDisplay
            key="annualPayroll"
            className="!flex-row justify-between"
            label="What is your annual payroll?"
            value={get(dataToUse, "annualPayroll", "") as string}
          />
          <AnswersTextDisplay
            key="scalePlan"
            label="What are your business’ near term plans to scale?"
            value={getStrategyLabel(get(dataToUse, "scalePlan", ""))}
          />
        </div>
      </div>
    </Card>
  )
}
