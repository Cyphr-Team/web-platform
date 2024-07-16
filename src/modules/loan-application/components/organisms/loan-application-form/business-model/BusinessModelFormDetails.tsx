import { Card } from "@/components/ui/card"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { BusinessModelFormResponse } from "./type"
import { FAKE_DATA, questions } from "./constants"

type Props = {
  data?: BusinessModelFormResponse
}

export const BusinessModelFormDetails: React.FC<Props> = ({ data }) => {
  console.log(data)

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Market Opportunity</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          <AnswersTextDisplay
            key="howDoYouMakeMoney"
            label="How do you, or will you make money?"
            value={
              FAKE_DATA["howDoYouMakeMoney" as keyof BusinessModelFormResponse]
            }
          />
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              key={ind}
              label={item.question}
              value={FAKE_DATA[item.field as keyof BusinessModelFormResponse]}
            />
          ))}
          <AnswersTextDisplay
            key="nearTermGrowthStrategy"
            label="What are your business’ near term plans to scale?"
            value={
              FAKE_DATA[
                "nearTermGrowthStrategy" as keyof BusinessModelFormResponse
              ]
            }
          />
        </div>
      </div>
    </Card>
  )
}
