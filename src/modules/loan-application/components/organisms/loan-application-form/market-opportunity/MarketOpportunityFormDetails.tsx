import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { questions } from "./contants"
import { type MarketOpportunityFormResponse } from "./type"
import { get } from "lodash"

interface Props {
  data?: MarketOpportunityFormResponse
}

export function MarketOpportunityFormDetails({ data }: Props) {
  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
      <h5 className="text-lg font-semibold">Market Opportunity</h5>
      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <div className="flex flex-col gap-y-4xl">
          {questions.map((item) => (
            <AnswersTextDisplay
              key={item.question}
              label={item.question}
              value={get(data, item.field)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
