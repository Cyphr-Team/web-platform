import { Card } from "@/components/ui/card"
import { PreQualificationResponse } from "@/modules/loan-application/constants/type"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { options } from "./constants"
type Props = {
  data?: PreQualificationResponse
}

export const PreQualificationFormDetails: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">Pre-Qualification</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="isCompanyBasedInUs"
          label="Company based in the US"
          value="Yes"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="foundingTeamEligibleToWorkInUs"
          label="Founding team eligible to work in the US"
          value="Yes"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="isForProfitTechCompany"
          label="Your company is a for-profit technology provider (product, service, solution)"
          value="Yes"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          key="hasMvpWithRevenueUnderOneMillion"
          label="Your company has a minimum viable product with revenue under 1 million."
          value="Yes"
        />
        <AnswersTextDisplay
          key="willingToOperateInKansasCityMo"
          label="Your company is located in, or willing to establish an operating presence within the Kansas City, Missouri county lines for at least one year."
          value={
            options.filter(
              (option) => option.value === data?.willingToOperateInKansasCityMo
            )[0]?.label
          }
        />
      </div>
    </Card>
  )
}
