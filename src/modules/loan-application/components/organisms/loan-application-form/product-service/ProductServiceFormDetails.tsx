import { Card } from "@/components/ui/card"
import { productServiceFormQuestions } from "./constants"
import { type ProductServiceFormResponse } from "./type"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"

interface Props {
  data?: ProductServiceFormResponse
}

export function ProductServiceFormDetails({ data }: Props) {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">Product and Service</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <AnswersTextDisplay
          key="businessType"
          className="!flex-row justify-between capitalize"
          label="Core business is a product or service"
          value={data?.businessType}
        />
        <div className="flex flex-col gap-y-4xl">
          {productServiceFormQuestions.map((item) => (
            <AnswersTextDisplay
              key={item.field}
              label={item.question}
              value={get(data, item.field, "")}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
