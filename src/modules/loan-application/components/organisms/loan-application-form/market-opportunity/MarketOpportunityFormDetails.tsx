import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { questions } from "./contants"
import { MarketOpportunityFormResponse } from "./type"
import React from "react"
import { get } from "lodash"

type Props = {
  data?: MarketOpportunityFormResponse
}

export const MarketOpportunityFormDetails: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Market Opportunity</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={get(data, item.field)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
