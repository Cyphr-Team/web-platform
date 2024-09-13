import { KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { SBB_KYC_FIELD_NAMES } from "./const"
import { get } from "lodash"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { formatDate } from "@/utils/date.utils"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { ControlAuthorizationDetails } from "./ControlAuthorization"
import { BeneficialOwnersDetails } from "./BeneficialOwners"

interface KycFormDetailsProps {
  kycFormData: KYCInformationResponse
}

enum FieldTypes {
  TEXT = "text",
  DATE = "date",
  NUMBER = "number"
}

type Field = {
  label: string
  field: SBB_KYC_FIELD_NAMES
  type?: FieldTypes
}
const KYC_FORM_FIELDS: Field[] = [
  {
    label: "First name:",
    field: SBB_KYC_FIELD_NAMES.FIRST_NAME
  },
  {
    label: "Last name:",
    field: SBB_KYC_FIELD_NAMES.LAST_NAME
  },
  {
    label: "Resident address:",
    field: SBB_KYC_FIELD_NAMES.ADDRESS_LINE1
  },
  {
    label: "Email address:",
    field: SBB_KYC_FIELD_NAMES.EMAIL
  },
  {
    label: "Phone number:",
    field: SBB_KYC_FIELD_NAMES.PHONE_NUMBER
  },
  {
    label: "Date of birth:",
    field: SBB_KYC_FIELD_NAMES.DATE_OF_BIRTH,
    type: FieldTypes.DATE
  },
  {
    label: "SSN/ITIN:",
    field: SBB_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER
  },
  {
    label: "Your role:",
    field: SBB_KYC_FIELD_NAMES.BUSINESS_ROLE
  },
  {
    label: "Percentage of the business you own:",
    field: SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE
  }
]

export const SbbKycFormDetails: React.FC<KycFormDetailsProps> = ({
  kycFormData
}) => {
  const renderField = (field: Field) => {
    const value = get(
      kycFormData,
      field.field,
      get(kycFormData.metadata, field.field, "N/A")
    ) as string
    switch (field.type) {
      case FieldTypes.DATE:
        return (
          <AnswersTextDisplay
            key={field.field}
            className="!flex-row justify-between"
            valueClassName="text-right"
            label={field.label}
            value={formatDate(value, FORMAT_DATE_MM_DD_YYYY)}
          />
        )
    }
    return (
      <AnswersTextDisplay
        key={field.field}
        className="!flex-row justify-between"
        valueClassName="text-right"
        label={field.label}
        value={value}
      />
    )
  }

  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      {KYC_FORM_FIELDS.map((field) => renderField(field))}
      <Separator />
      <BeneficialOwnersDetails data={kycFormData.metadata?.beneficialOwners} />
      <Separator />
      <ControlAuthorizationDetails
        value={get(
          kycFormData.metadata,
          SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION,
          ""
        )}
      />
    </Card>
  )
}
