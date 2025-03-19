import { Card } from "@/components/ui/card"
import { productServiceFormQuestions } from "./constants"
import { type ProductServiceFormResponse } from "./type"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"
import { type ProductServiceFormValue } from "@/modules/loan-application/constants/form.ts"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

interface Props {
  data?: ProductServiceFormResponse
  dataV2?: ProductServiceFormValue
}

export function ProductServiceFormDetails({ data, dataV2 }: Props) {
  const dataToUse = isEnableFormV2() && dataV2 ? dataV2 : data

  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl">
      <h5 className="text-lg font-semibold">Product and Service</h5>
      <div className="flex flex-col gap-x-4xl gap-y-2xl">
        <AnswersTextDisplay
          key="businessType"
          className="!flex-row justify-between capitalize"
          label="Core business is a product or service"
          value={dataToUse?.businessType}
        />
        <div className="flex flex-col gap-y-4xl">
          {productServiceFormQuestions.map((item) => (
            <AnswersTextDisplay
              key={item.field}
              label={item.question}
              value={get(dataToUse, item.field, "")}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
