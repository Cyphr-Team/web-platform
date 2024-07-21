import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"

import { questions } from "./constants"
import { LaunchKcFitFormResponse } from "./type"
import { get } from "lodash"
type Props = {
  data?: LaunchKcFitFormResponse
}

export const LaunchKcFitFormDetails: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">LaunchKC Fit</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={get(data, item.field, "")}
            />
          ))}
          <AnswersTextDisplay
            className="!flex-row justify-between"
            key="applied"
            label="Have you applied to LaunchKC previously"
            value={data?.applied ? "Yes" : "No"}
          />
          <AnswersTextDisplay
            key="progress"
            label="If Yes, what progress, have you made since your previous application"
            value={data?.progress}
          />
        </div>
      </div>
    </Card>
  )
}
