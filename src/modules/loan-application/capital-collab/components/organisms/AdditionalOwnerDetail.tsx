import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { CapitalCollabKYCFieldName } from "@/modules/loan-application/capital-collab/constants/kyc"
import { toAdditionalOwnerDetail } from "@/modules/loan-application/capital-collab/stores/kyc-store"
import {
  type CapitalCollabAdditionalOwnerFormValue,
  type CapitalCollabOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc"
import { get, isEmpty } from "lodash"

interface AdditionalOwnerDetailProps {
  data:
    | CapitalCollabOwnerFormValue[CapitalCollabKYCFieldName.ADDITIONAL_OWNERS]
    | undefined
}

function AdditionalOwnerDetail({ data }: AdditionalOwnerDetailProps) {
  const hasAdditionalOwner = !isEmpty(data) && !!get(data, "0.fullName")

  return (
    <div className="flex flex-col gap-3">
      <FinancialApplicationFormDetail
        key={CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED}
        isSubChildren
        financialApplicationFormData={[
          {
            id: CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED,
            title: "Business solely owned by you: ",
            content: hasAdditionalOwner ? "No" : "Yes"
          }
        ]}
      />
      {hasAdditionalOwner
        ? data?.map((owner, index) => (
            <FinancialApplicationFormDetail
              key={`AdditionalOwner-${index + 1}`}
              isSubChildren
              financialApplicationFormData={toAdditionalOwnerDetail(
                owner as CapitalCollabAdditionalOwnerFormValue,
                index
              )}
            />
          ))
        : null}
    </div>
  )
}

export const renderAdditionalOwnerDetail = ({
  data
}: AdditionalOwnerDetailProps) => {
  return <AdditionalOwnerDetail data={data} />
}
