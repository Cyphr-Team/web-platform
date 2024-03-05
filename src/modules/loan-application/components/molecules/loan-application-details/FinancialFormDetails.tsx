import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { capitalizeWords } from "@/utils"

export const FinancialFormDetails = () => {
  const { financialFormData } = useBRLoanApplicationDetailsContext()
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Financial Information</h5>
      <Separator />
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <p className="text-sm text-text-secondary font-medium">
          How do you make money?
        </p>
        <div className="flex flex-col gap-y-sm">
          {financialFormData?.incomeCategories?.map((item, ind) => (
            <div
              className="flex flex-row items-center space-x-lg space-y-0"
              key={ind}
            >
              <Checkbox className="w-5 h-5" checked={true} />
              <p className="text-sm font-normal">
                {capitalizeWords(item.replace(/_/g, " "))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
