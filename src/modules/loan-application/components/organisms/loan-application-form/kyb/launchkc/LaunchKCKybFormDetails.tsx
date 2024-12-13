import { Card } from "@/components/ui/card"
import { getStateName } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"
import { type LaunchKCBusinessFormValue } from "@/modules/loan-application/constants/form.kyb.ts"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay.tsx"
import {
  getLabelFromValue,
  LEGAL_STRUCTURE_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/const.ts"

interface KybFormDetailsProps {
  kybFormDataV2?: LaunchKCBusinessFormValue
}

/**
 * This is used with flag FORM V2 ON
 * @see [@/modules/loan-application-management/pages/launch-kc/loan-summary.tsx]
 */
export function LaunchKCKybFormDetails({ kybFormDataV2 }: KybFormDetailsProps) {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <div className="flex flex-col gap-4xl">
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business legal name"
          value={kybFormDataV2?.businessLegalName}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business street address line #1"
          value={kybFormDataV2?.addressLine1}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business street address line #2"
          value={kybFormDataV2?.addressLine2}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business city"
          value={kybFormDataV2?.city}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business state"
          value={getStateName(kybFormDataV2?.state ?? "N/A")}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business zip code"
          value={kybFormDataV2?.postalCode}
          valueClassName="text-right"
        />
        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="EIN"
          value={toPattern(kybFormDataV2?.businessTin ?? "", EIN_PATTERN)}
          valueClassName="text-right"
        />

        {kybFormDataV2?.yearFounded ? (
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Year founded"
            value={kybFormDataV2?.yearFounded}
            valueClassName="text-right"
          />
        ) : null}

        {kybFormDataV2?.legalStructure ? (
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Legal structure"
            value={getLabelFromValue(
              LEGAL_STRUCTURE_OPTIONS,
              kybFormDataV2?.legalStructure ?? ""
            )}
            valueClassName="text-right"
          />
        ) : null}

        <AnswersTextDisplay
          className="!flex-row justify-between"
          label="Business website"
          value={kybFormDataV2?.businessWebsite}
        />

        {kybFormDataV2?.primaryIndustry ? (
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Primary industry"
            value={kybFormDataV2?.primaryIndustry}
          />
        ) : null}

        {kybFormDataV2?.primaryIndustryOther ? (
          <AnswersTextDisplay
            className="!flex-row justify-between"
            label="Primary industry (other)"
            value={kybFormDataV2?.primaryIndustryOther}
          />
        ) : null}

        {kybFormDataV2?.companyDescription ? (
          <AnswersTextDisplay
            label="Describe your company in one sentence"
            value={kybFormDataV2?.companyDescription}
          />
        ) : null}
      </div>
    </Card>
  )
}
