import { Card } from "@/components/ui/card"
import { getStateName } from "@/modules/loan-application/hooks/useSelectCities"
import { KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { FormItem } from "@/components/ui/form.tsx"
import { SearchIcon } from "lucide-react"

interface KybFormDetailsProps {
  kybFormData?: KYBInformationResponse
}

export const KybFormDetails: React.FC<KybFormDetailsProps> = ({
  kybFormData
}) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <FormItem>
        <Label className="text-text-secondary">Business Legal Name</Label>
        <Input value={kybFormData?.businessLegalName} readOnly={true} />
      </FormItem>
      <FormItem>
        <Label className="text-text-secondary">
          Business Street Address Line #1
        </Label>
        <Input
          readOnly={true}
          value={kybFormData?.businessStreetAddress.addressLine1}
        />
      </FormItem>
      <FormItem>
        <Label className="text-text-secondary">
          Business Street Address Line #2
        </Label>
        <Input
          value={kybFormData?.businessStreetAddress.addressLine2}
          readOnly={true}
        />
      </FormItem>
      <div className="grid grid-cols-3 gap-y-2xl gap-x-4xl">
        <FormItem>
          <Label className="text-text-secondary">Business City</Label>
          <Input
            value={kybFormData?.businessStreetAddress.city}
            readOnly={true}
            prefixIcon={<SearchIcon className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Business State</Label>
          <Input
            readOnly={true}
            value={getStateName(kybFormData?.businessStreetAddress.state ?? "")}
            prefixIcon={<SearchIcon className="ml-2 h-4 w-4" />}
          />
        </FormItem>
        <FormItem>
          <Label className="text-text-secondary">Business Zip Code</Label>
          <Input
            readOnly={true}
            value={kybFormData?.businessStreetAddress.postalCode}
          />
        </FormItem>
      </div>
      <FormItem>
        <Label className="text-text-secondary">
          Employer Identification Number (EIN)
        </Label>
        <Input
          readOnly={true}
          value={toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)}
        />
      </FormItem>
      <FormItem>
        <Label className="text-text-secondary">Business Website</Label>
        <Input
          readOnly={true}
          className="col-span-3 pl-16"
          value={kybFormData?.businessWebsite}
          prefix="https://"
          prefixIcon={<p className="text-text-secondary">https://</p>}
        />
      </FormItem>
    </Card>
  )
}
