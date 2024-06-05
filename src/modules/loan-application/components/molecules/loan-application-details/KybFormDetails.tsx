import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../atoms/TextInputDisplay"
import { getStateName } from "@/modules/loan-application/hooks/useSelectCities"
import { KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"

interface KybFormDetailsProps {
  kybFormData?: KYBInformationResponse
}

export const KybFormDetails: React.FC<KybFormDetailsProps> = ({
  kybFormData
}) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <div className="grid grid-cols-3 gap-y-2xl gap-x-4xl">
        <TextInputDisplay
          className="col-span-3"
          label="Business Legal Name"
          value={kybFormData?.businessLegalName}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Business Street Address Line #1"
          value={kybFormData?.businessStreetAddress.addressLine1}
        />
        <TextInputDisplay
          className="col-span-3"
          label="Business Street Address Line #2"
          value={kybFormData?.businessStreetAddress.addressLine2}
        />
        <TextInputDisplay
          label="Business City"
          value={kybFormData?.businessStreetAddress.city}
        />
        <TextInputDisplay
          label="Business State"
          value={getStateName(kybFormData?.businessStreetAddress.state ?? "")}
        />
        <TextInputDisplay
          label="Business Zip Code"
          value={kybFormData?.businessStreetAddress.postalCode}
        />
        <TextInputDisplay
          label="Employer Identification Number (EIN)"
          value={toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)}
          className="col-span-3"
        />
        <TextInputDisplay
          label="Business Website"
          value={kybFormData?.businessWebsite}
          className="col-span-3"
        />
      </div>
    </Card>
  )
}
