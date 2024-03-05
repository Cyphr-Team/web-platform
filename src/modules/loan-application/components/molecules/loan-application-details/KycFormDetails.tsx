import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { TextInputDisplay } from "../../atoms/TextInputDisplay"
import { formatPhoneNumber } from "@/utils"

export const KycFormDetails = () => {
  const { kycFormData } = useBRLoanApplicationDetailsContext()
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Owner Information</h5>
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
          value={kycFormData?.dateOfBirth}
        />
        <TextInputDisplay
          className="col-span-3"
          label="SSN/ITIN"
          value={kycFormData?.socialSecurityNumber}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Business Ownership Percentage"
          value={`${kycFormData?.businessOwnershipPercentage}%`}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Other than you, are there any individuals who own 20% or
          more of the business?"
          value={kycFormData?.hasOtherSubstantialStackHolders ? "Yes" : "No"}
        />
      </div>
    </Card>
  )
}
