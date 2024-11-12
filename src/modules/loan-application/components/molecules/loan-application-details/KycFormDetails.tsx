import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { type KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { Separator } from "@/components/ui/separator"
import { type FC } from "react"
import { TextInputDisplay } from "@/modules/loan-application/components/atoms/TextInputDisplay.tsx"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import { get } from "lodash"
import { checkIsJudge } from "@/utils/check-roles"
import {
  getKycLabelFromValue,
  getKycOptionsByField,
  LAUNCH_KC_KYC_FIELD_NAMES
} from "../../organisms/loan-application-form/kyc/launchkc/const"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export const KycFormDetails: FC<KycFormDetailsProps> = ({ kycFormData }) => {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
        {!isLaunchKC() && (
          <TextInputDisplay
            className="col-span-3"
            label="Full name"
            value={kycFormData?.fullName}
          />
        )}
        {isLaunchKC() && (
          <>
            <TextInputDisplay
              className="col-span-3"
              label="First name"
              value={kycFormData?.metadata?.firstName}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Last name"
              value={kycFormData?.metadata?.lastName}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Title"
              value={getKycLabelFromValue(
                getKycOptionsByField(LAUNCH_KC_KYC_FIELD_NAMES.TITLE),
                get(kycFormData, "metadata.title", "N/A")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Gender identity"
              value={getKycLabelFromValue(
                getKycOptionsByField(LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY),
                get(kycFormData, "metadata.genderIdentity", "N/A")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Racial identification"
              value={getKycLabelFromValue(
                getKycOptionsByField(
                  LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION
                ),
                get(kycFormData, "metadata.racialIdentification", "N/A")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Ethnic identification"
              value={getKycLabelFromValue(
                getKycOptionsByField(
                  LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION
                ),
                get(kycFormData, "metadata.ethnicIdentification", "N/A")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Preferred pronoun"
              value={getKycLabelFromValue(
                getKycOptionsByField(
                  LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN
                ),
                get(kycFormData, "metadata.preferredPronoun", "N/A")
              )}
            />
          </>
        )}
        {!isLaunchKC() && (
          <TextInputDisplay
            className="col-span-3"
            label="Your role"
            value={kycFormData?.businessRole}
          />
        )}
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
          value={formatPhoneNumber(kycFormData?.phoneNumber ?? "N/A") || "N/A"}
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

        {isLaunchKC() && (
          <>
            <TextInputDisplay
              className="col-span-3"
              label="Are you a founder or co-founder of the company applying"
              value={kycFormData?.metadata?.areFounderOrCoFounder}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Full-time founder"
              value={kycFormData?.metadata?.areFullTimeFounder}
            />
          </>
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
    </Card>
  )
}
