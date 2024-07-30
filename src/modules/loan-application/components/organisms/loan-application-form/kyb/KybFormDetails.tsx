import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { getStateName } from "@/modules/loan-application/hooks/useSelectCities"
import { KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"
import React from "react"

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
      <div className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
        <TextInputDisplay
          className="col-span-12"
          label="Business legal name"
          value={kybFormData?.businessLegalName}
        />
        <TextInputDisplay
          className="col-span-12"
          label="Business street address line #1"
          value={kybFormData?.businessStreetAddress.addressLine1}
        />
        <TextInputDisplay
          className="col-span-12"
          label="Business street address line #2"
          value={kybFormData?.businessStreetAddress.addressLine2}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business city"
          value={kybFormData?.businessStreetAddress.city}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business state"
          value={getStateName(
            kybFormData?.businessStreetAddress.state ?? "N/A"
          )}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business zip code"
          value={kybFormData?.businessStreetAddress.postalCode}
        />
        <TextInputDisplay
          label="EIN"
          value={toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)}
          className="col-span-5"
        />
        {kybFormData?.metadata?.yearFounded && (
          <TextInputDisplay
            label="Year founded"
            value={kybFormData.metadata.yearFounded}
            className="col-span-3"
          />
        )}
        {kybFormData?.metadata?.legalStructure && (
          <TextInputDisplay
            label="Legal structure"
            value={kybFormData.metadata.legalStructure}
            className="col-span-4"
          />
        )}
        <TextInputDisplay
          label="Business website"
          value={kybFormData?.businessWebsite}
          className="col-span-12"
        />
        {kybFormData?.metadata?.primaryIndustry && (
          <TextInputDisplay
            label="Primary industry"
            value={kybFormData.metadata.primaryIndustry}
            className="col-span-6"
          />
        )}
        {kybFormData?.metadata?.primaryIndustryOther && (
          <TextInputDisplay
            label="Primary industry (other)"
            value={kybFormData.metadata.primaryIndustryOther}
            className="col-span-6"
          />
        )}
        {kybFormData?.metadata?.companyDescription && (
          <TextInputDisplay
            label="Describe your company in one sentence"
            value={kybFormData.metadata.companyDescription}
            className="col-span-12"
          />
        )}
      </div>
    </Card>
  )
}
