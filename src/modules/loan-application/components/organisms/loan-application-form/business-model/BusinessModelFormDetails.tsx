import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { BusinessModelFormResponse } from "./type"
import { questions } from "./constants"
import { get } from "lodash"

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
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              key={ind}
              label={item.question}
              value={get(data, item.field, "")}
            />
          ))}
          <AnswersTextDisplay
            key="scalePlan"
            label="What are your business’ near term plans to scale?"
            value={get(data, "scalePlan", "")}
          />
        </div>
      </div>
    </Card>
  )
}
