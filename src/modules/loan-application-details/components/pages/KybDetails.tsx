import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationItem from "../organisms/VerificationItem"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const Component = () => {
  return (
    <div className="flex gap-3xl w-full h-full">
      <Card className="h-fit">
        <CardHeader className="mb-sm pb-0">
          <CardTitle className="font-bold text-base mb-sm">Insight</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-sm w-[19rem]">
          <VerificationItem
            title="Business name verification"
            status="warning"
          />
          <VerificationItem title="Business Verification" status="approved" />
          <VerificationItem
            title="Office address verification"
            status="rejected"
          />
          <VerificationItem title="TIN match" status="warning" />
          <VerificationItem title="Watchlist screening" status="warning" />
        </CardContent>
      </Card>
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl overflow-auto">
        <div className="space-y-lg my-lg">
          <div className="flex items-center gap-sm">
            <div className="w-12 h-12">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-success-secondary">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </AspectRatio>{" "}
            </div>
            <p className="text-4xl font-semibold ">Larry’s Latte LLC</p>
          </div>
          <div className="flex gap-lg">
            <Badge className="space-x-xs py-xs px-lg border w-fit">
              <p className="text-sm font-medium">
                True Industry • Other Non-Prohibited
              </p>
            </Badge>
            <Badge className="space-x-xs py-xs border w-fit">
              <p className="text-sm font-medium">FMSCA • 0329202-9492</p>
            </Badge>
            <Badge className="space-x-xs py-xs border w-fit">
              <p className="text-sm font-medium">IRS Nonprofit • 503c(a)</p>
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 space-x-6xl">
          <div className="flex flex-col">
            <p className="text-text-secondary font-medium text-sm">
              Formation state
            </p>
            <p className="text-xl">WA</p>
          </div>
          <div className="flex flex-col space-y-sm">
            <p className="text-text-secondary font-medium text-sm">
              Formation date
            </p>
            <p className="text-xl">01/25/2024</p>
          </div>
          <div className="flex flex-col">
            <p className="text-text-secondary font-medium text-sm">
              Entity type
            </p>
            <p className="text-xl">LLC</p>
          </div>
        </div>{" "}
        <Separator />
        <div className="flex flex-col">
          <div className="flex items-center space-x-sm">
            <div className="w-4 h-4">
              <AspectRatio ratio={1 / 1}>
                <AlertTriangle className="w-4 h-4 text-warning" />
              </AspectRatio>{" "}
            </div>
            <p className="text-text-secondary font-medium text-sm">
              Office address
            </p>
          </div>
          <p className="text-xl my-sm">1234 Main St, Seattle, WA 98101</p>
          <p className="text-sm text-text-secondary">
            2 Office addresses &#8594;
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-3 space-x-6xl">
          <div className="flex flex-col">
            <p className="text-text-secondary font-medium text-sm">Tax ID</p>
            <p className="text-xl">82-1459871</p>
            <Badge className="mt-sm space-x-xs py-xs border w-fit">
              <CheckCircle className="w-4 h-4 text-success" />
              <p className="text-sm">IRS • Tax ID Match Found</p>
            </Badge>
          </div>
          <div className="flex flex-col space-y-sm">
            <p className="text-text-secondary font-medium text-sm">Website</p>
            <p className="text-xl">www.larryslatte.com</p>
            <p className="text-sm">
              Larry's Latte, where premium beans meet expert craftsmanship. From
              the heartwarming classic espressos to innovative caffeine
              concoctions, every sip promises an unforgettable journey.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-text-secondary font-medium text-sm">
              Phone Number
            </p>
            <p className="text-xl">(909) 494-7171</p>
          </div>
        </div>
        <Separator />
        <Badge className="space-x-xs py-md px-lg bg-success-secondary border border-success w-fit rounded-lg">
          <CheckCircle className="w-6 h-6 text-success" />
          <p className="text-sm font-medium text-success">Passed</p>
        </Badge>
      </Card>
    </div>
  )
}
