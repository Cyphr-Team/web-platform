import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { type CapitalCollabKYCFieldName } from "@/modules/loan-application/capital-collab/constants/kyc"
import { toAdditionalOwnerDetail } from "@/modules/loan-application/capital-collab/stores/kyc-store"
import {
  type CapitalCollabAdditionalOwnerFormValue,
  type CapitalCollabOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc"
import _ from "lodash"

interface AdditionalOwnerDetailProps {
  data:
    | CapitalCollabOwnerFormValue[CapitalCollabKYCFieldName.ADDITIONAL_OWNERS]
    | undefined
}

function AdditionalOwnerDetail({ data }: AdditionalOwnerDetailProps) {
  return (
    <div className="flex flex-col gap-3">
      {data?.map((owner, index) => (
        <FinancialApplicationFormDetail
          key={`AdditionalOwner-${index + 1}`}
          isSubChildren
          financialApplicationFormData={toAdditionalOwnerDetail(
            owner as CapitalCollabAdditionalOwnerFormValue,
            index
          )}
        />
      ))}
    </div>
  )
}

export const renderAdditionalOwnerDetail = ({
  data
}: AdditionalOwnerDetailProps) => {
  if (!Array.isArray(data) || _.isEmpty(data)) {
    return undefined
  }

  return <AdditionalOwnerDetail data={data} />
}
