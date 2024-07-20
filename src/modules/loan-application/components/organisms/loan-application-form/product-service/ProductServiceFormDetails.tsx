import { Card } from "@/components/ui/card"
import { productServiceFormQuestions } from "./constants"
import { ProductServiceFormResponse } from "./type"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { get } from "lodash"
type Props = {
  data?: ProductServiceFormResponse
}

export const ProductServiceFormDetails: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">Product and Service</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="businessType"
          label="Core business is a product or service"
          value={data?.businessType}
        />
        <div className="flex flex-col gap-y-4xl">
          {productServiceFormQuestions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={get(data, item.field, "")}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
