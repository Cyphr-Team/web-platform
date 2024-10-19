import { Card } from "@/components/ui/card"
import { type PreQualificationResponse } from "@/modules/loan-application/constants/type"

import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { options } from "./constants"

interface Props {
  data?: PreQualificationResponse
}

export function PreQualificationFormDetails({ data }: Props) {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item">
      <h5 className="text-lg font-semibold">Pre-Qualification</h5>
      <div className="flex flex-col gap-y-2xl gap-x-4xl">
        <AnswersTextDisplay
          key="isCompanyBasedInUs"
          className="!flex-row justify-between"
          label="Company based in the US"
          value="Yes"
        />
        <AnswersTextDisplay
          key="foundingTeamEligibleToWorkInUs"
          className="!flex-row justify-between"
          label="Founding team eligible to work in the US"
          value="Yes"
        />
        <AnswersTextDisplay
          key="isForProfitTechCompany"
          className="!flex-row justify-between"
          label="Your company is a for-profit technology provider (product, service, solution)"
          value="Yes"
        />
        <AnswersTextDisplay
          key="hasMvpWithRevenueUnderOneMillion"
          className="!flex-row justify-between"
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
