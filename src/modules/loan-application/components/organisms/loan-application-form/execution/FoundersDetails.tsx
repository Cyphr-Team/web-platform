import { snakeCaseToText } from "@/utils"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"

type Props = {
  data?: {
    id?: string
    name: string
    jobType: string
    background: string
    skill: string
  }[]
}

export const FoundersDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2xl">
      {data?.map((founder, index) => (
        <div className="flex flex-col gap-2xl" key={founder.id}>
          <h5 className="text-sm font-semibold">FOUNDER #{index + 1}</h5>
          <div className="flex flex-col gap-y-2xl gap-x-4xl">
            <div className="flex flex-col gap-y-4xl">
              <AnswersTextDisplay
                className="!flex-row justify-between"
                key={`${founder.id}-name`}
                label="First and last name"
                value={get(founder, "name", "")}
              />
              <AnswersTextDisplay
                valueClassName="capitalize"
                className="!flex-row justify-between"
                key={`${founder.id}-jobType`}
                label="Full-time or part-time"
                value={snakeCaseToText(get(founder, "jobType", ""))}
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
