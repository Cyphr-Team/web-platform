import { Card } from "@/components/ui/card"

import { questions } from "./constants"
import { type LaunchKcFitFormResponse } from "./type"
import { get } from "lodash"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
interface Props {
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
            key="applied"
            className="!flex-row justify-between"
            label="Have you applied to LaunchKC previously"
            value={data?.applied ? "Yes" : "No"}
          />
          {data?.applied ? (
            <AnswersTextDisplay
              key="progress"
              label="If Yes, what progress, have you made since your previous application"
              value={data?.progress}
            />
          ) : null}
        </div>
      </div>
    </Card>
  )
}
