import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { Separator } from "@/components/ui/separator"
import { checkIsJudge } from "@/utils/check-roles"
import { type LaunchKCOwnerFormValue } from "@/modules/loan-application/constants/form.kyc.ts"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay.tsx"
import {
  getKycLabelFromValue,
  getKycOptionsByField,
  LAUNCH_KC_KYC_FIELD_NAMES
} from "@/modules/loan-application/components/organisms/loan-application-form/kyc/launchkc/const.ts"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form.ts"

interface KycFormDetailsProps {
  kycFormDataV2?: LaunchKCOwnerFormValue
}

export function LaunchKCKycFormDetails({ kycFormDataV2 }: KycFormDetailsProps) {
  const getOptionValue = (field: string, value: string) => {
    return getKycLabelFromValue(getKycOptionsByField(field), value)
  }

  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      <div className="flex flex-col gap-4xl">
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="First name"
          value={kycFormDataV2?.firstName}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Last name"
          value={kycFormDataV2?.lastName}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Title"
          value={
            getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ROLE,
              kycFormDataV2?.businessRole ?? ""
            ) ?? "N/A"
          }
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Gender identity"
          value={getOptionValue(
            LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY,
            kycFormDataV2?.genderIdentity ?? ""
          )}
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Preferred pronoun"
          value={getOptionValue(
            LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN,
            kycFormDataV2?.preferredPronoun ?? ""
          )}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Racial identification"
          value={getOptionValue(
            LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION,
            kycFormDataV2?.racialIdentification ?? ""
          )}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Ethnic identification"
          value={getOptionValue(
            LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION,
            kycFormDataV2?.ethnicIdentification ?? ""
          )}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Resident address line #1"
          value={kycFormDataV2?.addressLine1 ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Resident address line #2"
          value={kycFormDataV2?.addressLine2 ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="City"
          value={kycFormDataV2?.businessCity ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="State"
          value={kycFormDataV2?.businessState ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Zip code"
          value={kycFormDataV2?.businessZipCode ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Email address"
          value={kycFormDataV2?.email ?? "N/A"}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Phone number"
          value={
            formatPhoneNumber(kycFormDataV2?.phoneNumber ?? "N/A") || "N/A"
          }
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Date of birth"
          value={formatBirthday(kycFormDataV2?.dateOfBirth)}
          valueClassName="text-right"
        />
        {!checkIsJudge() && (
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="SSN/ITIN"
            value={kycFormDataV2?.socialSecurityNumber}
            valueClassName="text-right"
          />
        )}
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Are you a founder or co-founder of the company applying"
          value={
            kycFormDataV2?.areFounderOrCoFounder
              ? BINARY_VALUES.YES
              : BINARY_VALUES.NO
          }
          valueClassName="capitalize"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Full-time founder"
          value={
            kycFormDataV2?.areFullTimeFounder
              ? BINARY_VALUES.YES
              : BINARY_VALUES.NO
          }
          valueClassName="capitalize"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Percentage of the business you own"
          value={
            kycFormDataV2?.businessOwnershipPercentage
              ? `${kycFormDataV2?.businessOwnershipPercentage}%`
              : "N/A"
          }
        />
      </div>
    </Card>
  )
}
