import { Card } from "@/components/ui/card"
import {
  FAKE_PRODUCT_SERVICE_DATA,
  productServiceFormQuestions
} from "./constants"
import { ProductServiceFormResponse } from "./type"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"

type Props = {
  data?: ProductServiceFormResponse
}

export const ProductServiceFormDetails: React.FC<Props> = ({ data }) => {
  console.log(data)

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Product and Service</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="productOrService"
          label="Core business is a product or service"
          value={"Product"}
        />
        <div className="flex flex-col gap-y-4xl">
          {productServiceFormQuestions.map((item, ind) => (
            <AnswersTextDisplay
              key={ind}
              label={item.question}
              value={
                FAKE_PRODUCT_SERVICE_DATA[
                  item.field as keyof ProductServiceFormResponse
                ]
              }
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
