import { Card } from "@/components/ui/card"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import { KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { FormItem } from "@/components/ui/form.tsx"
import { CalendarPlus, ChevronDown, MailOpen, SearchIcon } from "lucide-react"

interface KycFormDetailsProps {
  kycFormData?: KYCInformationResponse
}

export const KycFormDetails: React.FC<KycFormDetailsProps> = ({
  kycFormData
}) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Owner Information</h5>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">Full name</Label>
          <Input value={kycFormData?.fullName} readOnly={true} />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Your Role</Label>
          <Input value={kycFormData?.businessRole} readOnly={true} />
        </FormItem>
      </div>
      <FormItem>
        <Label className="text-text-secondary">Resident Address Line #1</Label>
        <Input value={kycFormData?.addressLine1} readOnly={true} />
      </FormItem>
      <FormItem>
        <Label className="text-text-secondary">Resident Address Line #2</Label>
        <Input value={kycFormData?.addressLine2} readOnly={true} />
      </FormItem>

      <div className="grid grid-cols-3 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">Business City</Label>
          <Input
            readOnly={true}
            value={kycFormData?.businessCity}
            prefixIcon={<SearchIcon className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Business State</Label>
          <Input
            readOnly={true}
            value={kycFormData?.businessState}
            prefixIcon={<SearchIcon className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Zip Code</Label>
          <Input value={kycFormData?.businessZipCode} readOnly={true} />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">Email Address</Label>
          <Input
            readOnly={true}
            value={kycFormData?.email}
            prefixIcon={<MailOpen className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Phone Number</Label>
          <Input
            readOnly={true}
            className="col-span-3 pl-14"
            prefixIcon={
              <span className="text-text-tertiary inline-flex">
                US {<ChevronDown className="ml-1 mt-1 h-4 w-4" />}
              </span>
            }
            value={formatPhoneNumber(kycFormData?.phoneNumber ?? "") || ""}
          />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">Date of Birth</Label>
          <Input
            readOnly={true}
            value={formatBirthday(kycFormData?.dateOfBirth)}
            suffixIcon={<CalendarPlus className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">SSN/ITIN</Label>
          <Input readOnly={true} value={kycFormData?.socialSecurityNumber} />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">
            Business Ownership Percentage
          </Label>
          <Input
            readOnly={true}
            value={
              kycFormData?.businessOwnershipPercentage
                ? `${kycFormData?.businessOwnershipPercentage}`
                : "N/A"
            }
            suffixIcon={<span className="text-text-tertiary">%</span>}
          />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">
            Other than you, are there any individuals who own 20% or more of the
            business?
          </Label>
          <Input
            readOnly={true}
            value={kycFormData?.hasOtherSubstantialStackHolders ? "Yes" : "No"}
            suffixIcon={<ChevronDown className="ml-2 h-4 w-4" />}
          />
        </FormItem>
      </div>
    </Card>
  )
}
