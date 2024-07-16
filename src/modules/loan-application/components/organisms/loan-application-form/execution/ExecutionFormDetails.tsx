import { Card } from "@/components/ui/card"

import {
  AnswersTextDisplay,
  MultiAnswersTextDisplay
} from "../../../atoms/AnswersTextDisplay"

import { ExecutionFormResponse } from "./type"
import { FAKE_DATA, questions } from "./constants"

type Props = {
  data?: ExecutionFormResponse
}

export const ExecutionFormDetails: React.FC<Props> = ({ data }) => {
  console.log(data)

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Execution</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          <AnswersTextDisplay
            key="monthlyBurn"
            label="How much cash does your company go through each month?"
            value={
              FAKE_DATA["monthlyBurn" as keyof ExecutionFormResponse] as string
            }
          />
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={
                FAKE_DATA[item.field as keyof ExecutionFormResponse] as string
              }
            />
          ))}
          <AnswersTextDisplay
            key="currentStage"
            label="Which best describes the current stage of your product or service?"
            value={
              FAKE_DATA["currentStage" as keyof ExecutionFormResponse] as string
            }
          />
          <MultiAnswersTextDisplay
            key="supportAreas"
            label="What areas do you need the most support? (You can select more than 1) ?"
            value={
              FAKE_DATA[
                "supportAreas" as keyof ExecutionFormResponse
              ] as string[]
            }
          />
          <MultiAnswersTextDisplay
            key="supportAreas"
            label="What alliances or partnerships have you entered? (You can select more than 1) ?"
            value={
              FAKE_DATA[
                "partnerships" as keyof ExecutionFormResponse
              ] as string[]
            }
          />
        </div>
      </div>
    </Card>
  )
}
