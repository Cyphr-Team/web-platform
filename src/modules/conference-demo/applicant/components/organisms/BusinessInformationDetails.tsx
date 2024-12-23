import { Card } from "@/components/ui/card"
import { getStateName } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { Separator } from "@/components/ui/separator"
import { TextInputDisplay } from "@/modules/loan-application/components/atoms/TextInputDisplay"
import { MOCK_BUSINESS_INFORMATION } from "../../constants/data"

export function BusinessInformationDetails() {
  return (
    <Card className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <div className="flex flex-col gap-4xl">
        <TextInputDisplay
          label="Business legal name"
          value={MOCK_BUSINESS_INFORMATION.businessLegalName}
        />
        <TextInputDisplay
          label="Business street address line #1"
          value={MOCK_BUSINESS_INFORMATION.businessStreetAddress.streetLine1}
        />
        <div className="flex flex-row justify-between">
          <TextInputDisplay
            label="Business city"
            value={MOCK_BUSINESS_INFORMATION.businessStreetAddress.city}
          />
          <TextInputDisplay
            label="Business state"
            value={getStateName(
              MOCK_BUSINESS_INFORMATION?.businessStreetAddress.state ?? "N/A"
            )}
          />
          <TextInputDisplay
            label="Business zip code"
            value={MOCK_BUSINESS_INFORMATION?.businessStreetAddress.postalCode}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInputDisplay
            label="EIN"
            value={toPattern(
              MOCK_BUSINESS_INFORMATION.businessTin ?? "",
              EIN_PATTERN
            )}
          />
          <TextInputDisplay
            label="Business website"
            value={MOCK_BUSINESS_INFORMATION.businessWebsite}
          />
        </div>
      </div>
    </Card>
  )
}
