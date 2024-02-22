import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import VerificationItem from "../organisms/VerificationItem"
import { KybDetailInsights } from "../../constants/type"

type Props = {
  insights?: KybDetailInsights
}

export const KybInsights = ({ insights }: Props) => {
  return (
    <Card className="h-fit lg:sticky top-0 z-10 mb-4">
      <CardHeader className="mb-sm !p-4 !pb-0">
        <CardTitle className="font-bold text-base">Insights</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-1 lg:space-y-sm w-full lg:w-[19rem] !p-4 !pt-0">
        <VerificationItem
          title="Business name verification"
          status={insights?.businessNameVerification}
        />
        <VerificationItem
          title="Office address verification"
          status={insights?.officeAddressVerification}
        />
        <VerificationItem
          title="People verification"
          status={insights?.peopleVerification}
        />
        <VerificationItem title="TIN match" status={insights?.tinMatch} />
        <VerificationItem
          title="Watchlist screening"
          status={insights?.watchlistScreening}
        />
      </CardContent>
    </Card>
  )
}
