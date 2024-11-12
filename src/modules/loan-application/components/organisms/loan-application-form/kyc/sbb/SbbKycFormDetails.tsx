import { type KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { SBB_KYC_FIELD_NAMES } from "./const"
import { chunk, get } from "lodash"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/date.utils"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { ControlAuthorizationDetails } from "./ControlAuthorization"
import { BeneficialOwnersDetails } from "./BeneficialOwners"
import { SbbReviewSectionLayout } from "@/modules/loan-application/components/organisms/loan-application-form/review-application/SbbReviewSectionLayout.tsx"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service.ts"
import { cn } from "@/lib/utils.ts"

interface KycFormDetailsProps {
  kycFormData: KYCInformationResponse
}

enum FieldTypes {
  TEXT = "text",
  DATE = "date",
  NUMBER = "number"
}

interface Field {
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

export function SbbKycFormDetails({ kycFormData }: KycFormDetailsProps) {
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
            label={field.label}
            value={formatDate(value, FORMAT_DATE_MM_DD_YYYY)}
            valueClassName="text-right"
          />
        )
      default:
        return (
          <AnswersTextDisplay
            key={field.field}
            className="!flex-row justify-between"
            label={field.label}
            value={value}
            valueClassName="text-right"
          />
        )
    }
  }

  return (
    <div className="rounded-lg border">
      <SbbReviewSectionLayout className="border-0">
        <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
        <Separator />
      </SbbReviewSectionLayout>

      <div className="flex flex-col py-4xl pt-0">
        {chunk(KYC_FORM_FIELDS, 3).map((chunkFields, parentIndex) => (
          <div
            key={parentIndex.toString()}
            className={cn(
              "flex flex-col gap-4xl px-4xl pb-4xl",
              EXPORT_CLASS.FINANCIAL
            )}
          >
            {chunkFields.map((field, key) => (
              <div key={parentIndex.toString() + key.toString()}>
                {renderField(field)}
              </div>
            ))}
          </div>
        ))}

        <div className="px-4xl">
          <Separator />
        </div>
      </div>

      <BeneficialOwnersDetails data={kycFormData.metadata?.beneficialOwners} />

      <div
        className={cn(
          "flex flex-col gap-4xl px-4xl pb-4xl",
          EXPORT_CLASS.FINANCIAL
        )}
      >
        <Separator />
        <ControlAuthorizationDetails
          value={get(
            kycFormData.metadata,
            SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION,
            ""
          )}
        />
      </div>
    </div>
  )
}
