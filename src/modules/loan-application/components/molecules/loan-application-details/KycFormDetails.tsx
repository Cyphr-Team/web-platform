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
} from "../../organisms/loan-application-form/custom-form/launchkc/const"
import { get } from "lodash"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export const KycFormDetails: FC<KycFormDetailsProps> = ({ kycFormData }) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      <div className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
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
              value={getLabelFromValue(
                getOptionsByField(LAUNCH_KC_KYC_FIELD_NAMES.TITLE),
                get(kycFormData, "metadata.title", "")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Gender identity"
              value={getLabelFromValue(
                getOptionsByField(LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY),
                get(kycFormData, "metadata.genderIdentity", "")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Racial identification"
              value={getLabelFromValue(
                getOptionsByField(
                  LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION
                ),
                get(kycFormData, "metadata.racialIdentification", "")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Ethnic identification"
              value={getLabelFromValue(
                getOptionsByField(
                  LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION
                ),
                get(kycFormData, "metadata.ethnicIdentification", "")
              )}
            />
            <TextInputDisplay
              className="col-span-3"
              label="Preferred pronoun"
              value={getLabelFromValue(
                getOptionsByField(LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN),
                get(kycFormData, "metadata.preferredPronoun", "")
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
          value={formatPhoneNumber(kycFormData?.phoneNumber ?? "") || ""}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Date of birth"
          value={formatBirthday(kycFormData?.dateOfBirth)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="SSN/ITIN"
          value={kycFormData?.socialSecurityNumber}
        />

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
