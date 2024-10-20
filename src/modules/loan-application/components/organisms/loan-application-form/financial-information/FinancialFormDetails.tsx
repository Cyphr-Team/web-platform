import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { type FinancialInformationResponse } from "@/modules/loan-application/constants/type"
import { capitalizeWords } from "@/utils"

interface Props {
  financialFormData: FinancialInformationResponse
}

export function FinancialFormDetails({ financialFormData }: Props) {
  return financialFormData?.incomeCategories?.length ? (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Financial Information</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <p className="text-sm text-text-secondary font-medium">
          How do you make money?
        </p>
        <div className="flex flex-col gap-y-sm">
          {financialFormData?.incomeCategories?.map((item) => (
            <div
              key={item}
              className="flex flex-row items-center space-x-lg space-y-0"
            >
              <Checkbox checked className="w-5 h-5" />
              <p className="text-sm font-normal">
                {capitalizeWords(item.replace(/_/g, " "))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  )
}
