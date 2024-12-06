import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { type KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { Separator } from "@/components/ui/separator"
import { TextInputDisplay } from "@/modules/loan-application/components/atoms/TextInputDisplay.tsx"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import {
  getKycLabelFromValue,
  getKycOptionsByField,
  LAUNCH_KC_KYC_FIELD_NAMES
} from "./launchkc/const"
import { get } from "lodash"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { checkIsJudge } from "@/utils/check-roles"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export function KycFormDetails({ kycFormData }: KycFormDetailsProps) {
  const getValue = (field: string) => get(kycFormData, field, "N/A")

  const getMetadataValue = (field: string) =>
    get(kycFormData, `${LAUNCH_KC_KYC_FIELD_NAMES.METADATA}.${field}`, "N/A")

  const getOptionValue = (field: string, isMetaData?: boolean) => {
    return getKycLabelFromValue(
      getKycOptionsByField(field),
      isMetaData ? getMetadataValue(field) : getValue(field)
    )
  }

  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      {isLaunchKC() ? (
        <div className="flex flex-col gap-4xl">
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="First name"
            value={kycFormData?.metadata?.firstName}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Last name"
            value={kycFormData?.metadata?.lastName}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Title"
            value={
              getOptionValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ROLE, true) ??
              "N/A"
            }
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Gender identity"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY,
              true
            )}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Preferred pronoun"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN,
              true
            )}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Racial identification"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION,
              true
            )}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Ethnic identification"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION,
              true
            )}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Resident address line #1"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE1) ?? "N/A"}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Resident address line #2"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE2) ?? "N/A"}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="City"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY) ?? "N/A"}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="State"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_STATE) ?? "N/A"}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Zip code"
            value={
              getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE) ?? "N/A"
            }
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Email address"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.EMAIL) ?? "N/A"}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Phone number"
            value={
              formatPhoneNumber(
                getValue(LAUNCH_KC_KYC_FIELD_NAMES.PHONE_NUMBER) ?? "N/A"
              ) || "N/A"
            }
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Date of birth"
            value={formatBirthday(
              getValue(LAUNCH_KC_KYC_FIELD_NAMES.DATE_OF_BIRTH)
            )}
            valueClassName="text-right"
          />
          {!checkIsJudge() && (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="SSN/ITIN"
              value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER)}
              valueClassName="text-right"
            />
          )}
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Are you a founder or co-founder of the company applying"
            value={getMetadataValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ARE_FOUNDER_OR_CO_FOUNDER
            )}
            valueClassName="capitalize"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Full-time founder"
            value={getMetadataValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ARE_FULL_TIME_FOUNDER
            )}
            valueClassName="capitalize"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Percentage of the business you own"
            value={
              getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE)
                ? `${getValue(
                    LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE
                  )}%`
                : "N/A"
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
          <TextInputDisplay
            className="col-span-3"
            label="Full name"
            value={kycFormData?.fullName}
          />
          <TextInputDisplay
            className="col-span-3"
            label="Your role"
            value={kycFormData?.businessRole}
          />
          <TextInputDisplay
            className="col-span-6"
            label="Resident address line #1"
            value={kycFormData?.addressLine1}
          />
          <TextInputDisplay
            className="col-span-6"
            label="Resident address line #2"
            value={kycFormData?.addressLine2}
          />
          <TextInputDisplay
            className="col-span-2"
            label="Business city"
            value={kycFormData?.businessCity}
          />
          <TextInputDisplay
            className="col-span-2"
            label="Business state"
            value={kycFormData?.businessState}
          />
          <TextInputDisplay
            className="col-span-2"
            label="Zip code"
            value={kycFormData?.businessZipCode}
          />
          <TextInputDisplay
            className="col-span-3"
            label="Email address"
            value={kycFormData?.email}
          />
          <TextInputDisplay
            className="col-span-3"
            label="Phone number"
            value={
              formatPhoneNumber(kycFormData?.phoneNumber ?? "N/A") || "N/A"
            }
          />
          <TextInputDisplay
            className="col-span-3"
            label="Date of birth"
            value={formatBirthday(kycFormData?.dateOfBirth)}
          />
          {!checkIsJudge() && (
            <TextInputDisplay
              className="col-span-3"
              label="SSN/ITIN"
              value={kycFormData?.socialSecurityNumber}
            />
          )}
          <TextInputDisplay
            className="col-span-3"
            label="Business ownership percentage"
            value={
              kycFormData?.businessOwnershipPercentage
                ? `${kycFormData?.businessOwnershipPercentage}%`
                : "N/A"
            }
          />
        </div>
      )}
    </Card>
  )
}
