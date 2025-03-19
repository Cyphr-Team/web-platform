import { toCurrency } from "@/utils"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"
import {
  getLabelByValue,
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES
} from "./constants"

interface Props {
  data?: {
    id?: string
    amount: string
    sourceType: string
  }[]
}

export function FundingSourceDetails({ data }: Props) {
  return (
    <div className="flex flex-col gap-2xl">
      {data?.map((fundingSource, index) => (
        <div key={fundingSource.id} className="flex flex-col gap-2xl">
          <h5 className="text-sm font-semibold">FUNDING SOURCE #{index + 1}</h5>
          <div className="flex flex-col gap-x-4xl gap-y-2xl">
            <div className="flex flex-col gap-y-4xl">
              <AnswersTextDisplay
                key={`${fundingSource.id}-sourceType`}
                className="!flex-row justify-between"
                label="Funding source"
                value={getLabelByValue(
                  get(fundingSource, "sourceType", ""),
                  getOptionsByField(
                    LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES
                  )
                )}
              />
              <AnswersTextDisplay
                key={`${fundingSource.id}-amount`}
                className="!flex-row justify-between"
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
