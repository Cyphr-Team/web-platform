import { toCurrency } from "@/utils"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"
import {
  getLabelByValue,
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES
} from "./constants"

type Props = {
  data?: {
    id?: string
    amount: string
    sourceType: string
  }[]
}

export const FundingSourceDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2xl">
      {data?.map((fundingSource, index) => (
        <div className="flex flex-col gap-2xl" key={fundingSource.id}>
          <h5 className="text-sm font-semibold">FUNDING SOURCE #{index + 1}</h5>
          <div className="flex flex-col gap-y-2xl gap-x-4xl">
            <div className="flex flex-col gap-y-4xl">
              <AnswersTextDisplay
                className="!flex-row justify-between"
                key={`${fundingSource.id}-sourceType`}
                label="Funding source"
                value={getLabelByValue(
                  get(fundingSource, "sourceType", ""),
                  getOptionsByField(
                    LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES
                  )
                )}
              />
              <AnswersTextDisplay
                className="!flex-row justify-between"
                key={`${fundingSource.id}-amount`}
                label="Funding amount"
                value={toCurrency(Number(get(fundingSource, "amount", "0")))}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
