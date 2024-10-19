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
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Market Opportunity</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
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
