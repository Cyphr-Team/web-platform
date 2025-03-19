import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { getStateName } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"
import { type IBusinessFormValue } from "@/modules/loan-application/constants/form.ts"

interface KybFormDetailsProps {
  kybFormDataV2?: IBusinessFormValue
}

/**
 * This should be used with flag FORM V2 ON
 */
export function KybFormDetailsV2({ kybFormDataV2 }: KybFormDetailsProps) {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />

      <div className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
        <TextInputDisplay
          className="col-span-12"
          label="Business legal name"
          value={kybFormDataV2?.businessLegalName}
        />
        <TextInputDisplay
          className="col-span-12"
          label="Business street address line #1"
          value={kybFormDataV2?.addressLine1}
        />
        <TextInputDisplay
          className="col-span-12"
          label="Business street address line #2"
          value={kybFormDataV2?.addressLine2}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business city"
          value={kybFormDataV2?.city}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business state"
          value={getStateName(kybFormDataV2?.state ?? "N/A")}
        />
        <TextInputDisplay
          className="col-span-4"
          label="Business zip code"
          value={kybFormDataV2?.postalCode}
        />
        <TextInputDisplay
          className="col-span-5"
          label="EIN"
          value={toPattern(kybFormDataV2?.businessTin ?? "", EIN_PATTERN)}
        />

        <TextInputDisplay
          className="col-span-12"
          label="Business website"
          value={kybFormDataV2?.businessWebsite}
        />
      </div>
    </Card>
  )
}
