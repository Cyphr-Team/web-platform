import { Bankruptcy } from "@/modules/conference-demo/admin/components/molecules/kyb/Bankruptcy"
import BusinessDetails from "@/modules/conference-demo/admin/components/molecules/kyb/BusinessDetails"
import { BusinessName } from "@/modules/conference-demo/admin/components/molecules/kyb/BusinessName"
import { Insights } from "@/modules/conference-demo/admin/components/molecules/kyb/Insights"
import { OfficeAddress } from "@/modules/conference-demo/admin/components/molecules/kyb/OfficeAddress"
import { People } from "@/modules/conference-demo/admin/components/molecules/kyb/People"
import { Secretary } from "@/modules/conference-demo/admin/components/molecules/kyb/Secretary"
import { TinMatch } from "@/modules/conference-demo/admin/components/molecules/kyb/TinMatch"
import { WatchLists } from "@/modules/conference-demo/admin/components/molecules/kyb/WatchLists"
import { IndustryClassification } from "@/modules/conference-demo/admin/components/molecules/kyb/IndustryClassification"
import { Website } from "@/modules/conference-demo/admin/components/molecules/kyb/Website.tsx"
import { AdverseMedia } from "@/modules/conference-demo/admin/components/molecules/kyb/AdverseMedia.tsx"

function BusinessVerification() {
  return (
    <div className="w-full gap-3xl lg:flex">
      <Insights />

      <div className="w-full space-y-6">
        <BusinessDetails />
        <BusinessName />
        <OfficeAddress />
        <Secretary />
        <TinMatch />
        <People />
        <WatchLists />
        <IndustryClassification />
        <Bankruptcy />
        <Website />
        <AdverseMedia />
      </div>
    </div>
  )
}

export default BusinessVerification
