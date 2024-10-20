import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { getStateName } from "@/modules/loan-application/hooks/useSelectCities"
import { type KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"
import { isLaunchKC } from "@/utils/domain.utils"
import { AnswersTextDisplay } from "../../../atoms/AnswersTextDisplay"
import { getLabelFromValue, LEGAL_STRUCTURE_OPTIONS } from "./launchkc/const"
import { get } from "lodash"

interface KybFormDetailsProps {
  kybFormData?: KYBInformationResponse
}

export function KybFormDetails({ kybFormData }: KybFormDetailsProps) {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />

      {isLaunchKC() ? (
        <div className="flex flex-col gap-4xl">
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business legal name"
            value={kybFormData?.businessLegalName}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business street address line #1"
            value={kybFormData?.businessStreetAddress.addressLine1}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business street address line #2"
            value={kybFormData?.businessStreetAddress.addressLine2}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business city"
            value={kybFormData?.businessStreetAddress.city}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business state"
            value={getStateName(
              kybFormData?.businessStreetAddress.state ?? "N/A"
            )}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business zip code"
            value={kybFormData?.businessStreetAddress.postalCode}
            valueClassName="text-right"
          />
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="EIN"
            value={toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)}
            valueClassName="text-right"
          />
          {kybFormData?.metadata?.yearFounded ? (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="Year founded"
              value={kybFormData.metadata.yearFounded}
              valueClassName="text-right"
            />
          ) : null}
          {kybFormData?.metadata?.legalStructure ? (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="Legal structure"
              value={getLabelFromValue(
                LEGAL_STRUCTURE_OPTIONS,
                get(kybFormData, "metadata.legalStructure", "N/A")
              )}
              valueClassName="text-right"
            />
          ) : null}
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Business website"
            value={kybFormData?.businessWebsite}
          />
          {kybFormData?.metadata?.primaryIndustry ? (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="Primary industry"
              value={kybFormData.metadata.primaryIndustry}
            />
          ) : null}
          {kybFormData?.metadata?.primaryIndustryOther ? (
            <AnswersTextDisplay
              className="!flex-row justify-between"
              label="Primary industry (other)"
              value={kybFormData.metadata.primaryIndustryOther}
            />
          ) : null}
          {kybFormData?.metadata?.companyDescription ? (
            <AnswersTextDisplay
              label="Describe your company in one sentence"
              value={kybFormData.metadata.companyDescription}
            />
          ) : null}
        </div>
      ) : (
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
            className="col-span-5"
            label="EIN"
            value={toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)}
          />
          {kybFormData?.metadata?.yearFounded ? (
            <TextInputDisplay
              className="col-span-3"
              label="Year founded"
              value={kybFormData.metadata.yearFounded}
            />
          ) : null}
          {kybFormData?.metadata?.legalStructure ? (
            <TextInputDisplay
              className="col-span-4"
              label="Legal structure"
              value={kybFormData.metadata.legalStructure}
            />
          ) : null}
          <TextInputDisplay
            className="col-span-12"
            label="Business website"
            value={kybFormData?.businessWebsite}
          />
          {kybFormData?.metadata?.primaryIndustry ? (
            <TextInputDisplay
              className="col-span-6"
              label="Primary industry"
              value={kybFormData.metadata.primaryIndustry}
            />
          ) : null}
          {kybFormData?.metadata?.primaryIndustryOther ? (
            <TextInputDisplay
              className="col-span-6"
              label="Primary industry (other)"
              value={kybFormData.metadata.primaryIndustryOther}
            />
          ) : null}
          {kybFormData?.metadata?.companyDescription ? (
            <TextInputDisplay
              className="col-span-12"
              label="Describe your company in one sentence"
              value={kybFormData.metadata.companyDescription}
            />
          ) : null}
        </div>
      )}
    </Card>
  )
}
