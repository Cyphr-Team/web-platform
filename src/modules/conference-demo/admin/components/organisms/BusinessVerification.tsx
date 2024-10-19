import { Bankruptcy } from "@/modules/conference-demo/admin/components/molecules/kyb/Bankruptcy"
import BusinessDetails from "@/modules/conference-demo/admin/components/molecules/kyb/BusinessDetails"
import { BusinessName } from "@/modules/conference-demo/admin/components/molecules/kyb/BusinessName"
import { Insights } from "@/modules/conference-demo/admin/components/molecules/kyb/Insights"
import { OfficeAddress } from "@/modules/conference-demo/admin/components/molecules/kyb/OfficeAddress"
import { People } from "@/modules/conference-demo/admin/components/molecules/kyb/People"
import { Secretary } from "@/modules/conference-demo/admin/components/molecules/kyb/Secretary"
import { TinMatch } from "@/modules/conference-demo/admin/components/molecules/kyb/TinMatch"
import { WatchLists } from "@/modules/conference-demo/admin/components/molecules/kyb/WatchLists"

function BusinessVerification() {
  return (
    <div className="lg:flex gap-3xl w-full">
      <Insights />

      <div className="space-y-6 w-full">
        <BusinessDetails />
        <BusinessName />
        <OfficeAddress />
        <Secretary />
        <TinMatch />
        <People />
        <WatchLists />
        <Bankruptcy />
      </div>
    </div>
  )
}

export default BusinessVerification
