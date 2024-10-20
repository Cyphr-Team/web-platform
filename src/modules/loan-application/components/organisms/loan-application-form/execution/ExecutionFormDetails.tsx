import { Card } from "@/components/ui/card"

import {
  AnswersTextDisplay,
  MultiAnswersTextDisplay
} from "../../../atoms/AnswersTextDisplay"

import { get } from "lodash"
import { useMemo } from "react"
import {
  BUSINESS_MODEL_OTHER_OPTION,
  getLabelByValue,
  getLabelsByValues,
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES,
  questions
} from "./constants"
import { FoundersDetails } from "./FoundersDetails"
import { FundingSourceDetails } from "./FundingSourceDetails"
import { type ExecutionFormResponse } from "./type"

interface Props {
  data?: ExecutionFormResponse
}

export const ExecutionFormDetails: React.FC<Props> = ({ data }) => {
  const businessModels = useMemo(() => {
    const businessModelOptions = getOptionsByField(
      LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL
    )

    // TODO: we've won... but at what cost?
    return (
      data?.businessModels
        ?.sort((vLeft, vRight) =>
          vLeft.businessModel === BUSINESS_MODEL_OTHER_OPTION
            ? 1
            : vLeft.businessModel.localeCompare(vRight.businessModel)
        )
        .map((businessModel) =>
          [
            getLabelByValue(businessModel?.businessModel, businessModelOptions),
            businessModel?.otherMessage
          ]
            .filter((v) => !!v)
            .join(": ")
        ) ?? []
    )
  }, [data?.businessModels])

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Execution</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-y-4xl">
          <AnswersTextDisplay
            key="monthlyExpenseRange"
            className="!flex-row justify-between"
            label="How much cash does your company go through each month?"
            value={getLabelByValue(
              get(
                data,
                LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE,
                ""
              ),
              getOptionsByField(
                LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE
              )
            )}
          />
          {questions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={get(data, item.field, "") as string}
            />
          ))}
          <AnswersTextDisplay
            key="businessStage"
            label="Which best describes the current stage of your product or service?"
            value={getLabelByValue(
              get(data, LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_STAGE, ""),
              getOptionsByField(LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_STAGE)
            )}
          />
          <MultiAnswersTextDisplay
            key="businessModels"
            label="What areas do you need the most support? (You can select more than 1)"
            value={businessModels}
          />
          <MultiAnswersTextDisplay
            key="partnershipType"
            label="What alliances or partnerships have you entered? (You can select more than 1)"
            value={getLabelsByValues(
              get(data, LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE, []),
              getOptionsByField(
                LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE
              )
            )}
          />
        </div>
        <FoundersDetails
          data={get(data, LAUNCH_KC_EXECUTION_FIELD_NAMES.FOUNDERS, [])}
        />
        <FundingSourceDetails
          data={get(data, LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES, [])}
        />
      </div>
    </Card>
  )
}
