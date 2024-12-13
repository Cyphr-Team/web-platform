import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { Separator } from "@/components/ui/separator"
import { TextInputDisplay } from "@/modules/loan-application/components/atoms/TextInputDisplay.tsx"
import { checkIsJudge } from "@/utils/check-roles"
import { type IOwnerFormValue } from "@/modules/loan-application/constants/form.ts"

interface KycFormDetailsProps {
  kycFormData?: IOwnerFormValue
}

/**
 * This is used with flag FORM V2 ON
 */
export function KycFormDetailsV2({ kycFormData }: KycFormDetailsProps) {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
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
