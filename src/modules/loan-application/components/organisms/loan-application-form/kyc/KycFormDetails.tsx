import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { Separator } from "@/components/ui/separator"
import { FC } from "react"
import { TextInputDisplay } from "@/modules/loan-application/components/atoms/TextInputDisplay.tsx"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import {
  getLabelFromValue,
  getOptionsByField,
  LAUNCH_KC_KYC_FIELD_NAMES
} from "../custom-form/launchkc/const"
import { get } from "lodash"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { checkIsJudge } from "@/utils/check-roles"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export const KycFormDetails: FC<KycFormDetailsProps> = ({ kycFormData }) => {
  const getValue = (field: string) => get(kycFormData, field, "N/A")

  const getMetadataValue = (field: string) =>
    get(kycFormData, `${LAUNCH_KC_KYC_FIELD_NAMES.METADATA}.${field}`, "N/A")

  const getOptionValue = (field: string, isMetaData?: boolean) => {
    return getLabelFromValue(
      getOptionsByField(field),
      isMetaData ? getMetadataValue(field) : getValue(field)
    )
  }
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
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
              getOptionValue(LAUNCH_KC_KYC_FIELD_NAMES.TITLE, true) ?? "N/A"
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
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Racial identification"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION,
              true
            )}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Ethnic identification"
            value={getOptionValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION,
              true
            )}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Resident address line #1"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE1) ?? "N/A"}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Resident address line #2"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE2) ?? "N/A"}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="City"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY) ?? "N/A"}
          />
          <AnswersTextDisplay
            label="State"
            className="!flex-row justify-between"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_STATE) ?? "N/A"}
          />
          <AnswersTextDisplay
            label="Zip code"
            className="!flex-row justify-between"
            value={
              getValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE) ?? "N/A"
            }
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Email address"
            value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.EMAIL) ?? "N/A"}
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Phone number"
            value={
              formatPhoneNumber(
                getValue(LAUNCH_KC_KYC_FIELD_NAMES.PHONE_NUMBER) ?? "N/A"
              ) || "N/A"
            }
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Date of birth"
            value={formatBirthday(
              getValue(LAUNCH_KC_KYC_FIELD_NAMES.DATE_OF_BIRTH)
            )}
          />
          {!checkIsJudge() && (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="SSN/ITIN"
              value={getValue(LAUNCH_KC_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER)}
            />
          )}
          <AnswersTextDisplay
            valueClassName="capitalize"
            className="!flex-row justify-between"
            label="Are you a founder or co-founder of the company applying"
            value={getMetadataValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ARE_FOUNDER_OR_CO_FOUNDER
            )}
          />
          <AnswersTextDisplay
            valueClassName="capitalize"
            className="!flex-row justify-between"
            label="Full-time founder"
            value={getMetadataValue(
              LAUNCH_KC_KYC_FIELD_NAMES.ARE_FULL_TIME_FOUNDER
            )}
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
        <div className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
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
            label="Business state"
            className="col-span-2"
            value={kycFormData?.businessState}
          />
          <TextInputDisplay
            label="Zip code"
            className="col-span-2"
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
