import { snakeCaseToText } from "@/utils"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"

interface Props {
  data?: {
    id?: string
    name: string
    jobType: string
    background: string
    skill: string
  }[]
}

export function FoundersDetails({ data }: Props) {
  return (
    <div className="flex flex-col gap-2xl">
      {data?.map((founder, index) => (
        <div key={founder.id} className="flex flex-col gap-2xl">
          <h5 className="text-sm font-semibold">FOUNDER #{index + 1}</h5>
          <div className="flex flex-col gap-y-2xl gap-x-4xl">
            <div className="flex flex-col gap-y-4xl">
              <AnswersTextDisplay
                key={`${founder.id}-name`}
                className="!flex-row justify-between"
                label="First and last name"
                value={get(founder, "name", "")}
              />
              <AnswersTextDisplay
                key={`${founder.id}-jobType`}
                className="!flex-row justify-between"
                label="Full-time or part-time"
                value={snakeCaseToText(get(founder, "jobType", ""))}
                valueClassName="capitalize"
              />
              <AnswersTextDisplay
                key={`${founder.id}-background`}
                label="What relevant business experience, education, or industry knowledge do they have?"
                value={get(founder, "background", "")}
              />{" "}
              <AnswersTextDisplay
                key={`${founder.id}-skill`}
                label="What skills do they have to ensure the success of your company"
                value={get(founder, "skill", "")}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
