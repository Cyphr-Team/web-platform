import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../atoms/TextInputDisplay"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { Separator } from "@/components/ui/separator"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export const KycFormDetails: React.FC<KycFormDetailsProps> = ({
  kycFormData
}) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
      <Separator />
      <div className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
        <TextInputDisplay
          className="col-span-3"
          label="Full Name"
          value={kycFormData?.fullName}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Your Role"
          value={kycFormData?.businessRole}
        />
        <TextInputDisplay
          className="col-span-6"
          label="Resident Address Line #1"
          value={kycFormData?.addressLine1}
        />
        <TextInputDisplay
          className="col-span-6"
          label="Resident Address Line #2"
          value={kycFormData?.addressLine2}
        />
        <TextInputDisplay
          className="col-span-2"
          label="Business City"
          value={kycFormData?.businessCity}
        />
        <TextInputDisplay
          label="Business State"
          className="col-span-2"
          value={kycFormData?.businessState}
        />
        <TextInputDisplay
          label="Zip Code"
          className="col-span-2"
          value={kycFormData?.businessZipCode}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Email Address"
          value={kycFormData?.email}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Phone Number"
          value={formatPhoneNumber(kycFormData?.phoneNumber ?? "") || ""}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Date of Birth"
          value={formatBirthday(kycFormData?.dateOfBirth)}
        />
        <TextInputDisplay
          className="col-span-3"
          label="SSN/ITIN"
          value={kycFormData?.socialSecurityNumber}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Business Ownership Percentage"
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
