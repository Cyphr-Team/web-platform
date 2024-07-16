import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"

import { FAKE_DATA, questions } from "./constants"
import { LaunchKcFitFormResponse } from "./type"

type Props = {
  data?: LaunchKcFitFormResponse
}

export const LaunchKcFitFormDetails: React.FC<Props> = ({ data }) => {
  console.log(data)

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Market Opportunity</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={FAKE_DATA[item.field as keyof LaunchKcFitFormResponse]}
            />
          ))}
          <AnswersTextDisplay
            className="!flex-row justify-between"
            key="prevLaunchKcApp"
            label="Have you applied to LaunchKC previously"
            value="Yes"
          />
          <AnswersTextDisplay
            key="prevLaunchKcApp"
            label="If Yes, what progess, have you made since your previous application"
            value="I have made a lot of progress since my previous application."
          />
        </div>
      </div>
    </Card>
  )
}
