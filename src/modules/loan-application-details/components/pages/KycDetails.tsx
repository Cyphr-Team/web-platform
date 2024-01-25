import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationItem from "../organisms/VerificationItem"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { InformationRow } from "../molecules/InformationRow"
import { KYC_STATUS } from "../../constants"

export const Component = () => {
  return (
    <div className="flex gap-3xl w-full h-full">
      <Card className="h-fit">
        <CardHeader className="mb-sm pb-0">
          <CardTitle className="font-bold text-base mb-sm">Summary</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-sm w-[19rem]">
          <VerificationItem title="ID Check" status="warning" />
          <VerificationItem title="Personal Info" status="approved" />
          <VerificationItem title="Checklist" status="warning" />
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
            <p className="text-4xl font-semibold ">KYC/Identity Verification</p>
          </div>
          <div className="flex gap-lg">
            <Badge className="space-x-xs py-xs px-lg border w-fit">
              <p className="text-sm font-medium">
                Personal Info • Other Non-Prohibited
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
        <div className="flex flex-col gap-y-lg">
          <p className="text-3xl font-semibold">Personal Info</p>
          <Card>
            <InformationRow
              label="Name"
              value="Latte Larry"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />
            <Separator />
            <InformationRow
              label="Date of Birth"
              value="23 April 1991"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />{" "}
            <Separator />
            <InformationRow
              label="Residential Address"
              value="456 Frappuchino St, Seattle, WA 98765-4321"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />{" "}
            <Separator />
            <InformationRow
              label="Email Address"
              value="larrycoffee1991@gmail.com"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />{" "}
            <Separator />
            <InformationRow
              label="Phone Number"
              value="(987) 654-3210"
              isBadge
              hasAction
              badgeText={KYC_STATUS.UNVERIFIED}
            />
          </Card>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-lg">
          <p className="text-3xl font-semibold">ID Check</p>
          <Card>
            <InformationRow
              label="Drivers License"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />
            <Separator />
            <InformationRow
              label="Passport"
              isBadge
              hasAction
              badgeText={KYC_STATUS.UNCHECKED}
            />{" "}
          </Card>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-lg">
          <p className="text-3xl font-semibold">Checklists</p>
          <Card>
            <InformationRow
              label="PEP/Sanctions"
              value="Name"
              isBadge
              badgeText={KYC_STATUS.PASSED}
            />
            <Separator />
            <InformationRow
              label="Internal Blocklist"
              value="No blacklist matches found"
              isBadge
              badgeText={KYC_STATUS.VERIFIED}
            />{" "}
            <Separator />
            <InformationRow
              label="Duplicate"
              value="Potential profile duplicate found"
              isBadge
              hasAction
              badgeText={KYC_STATUS.FAILED}
            />{" "}
            <Separator />
            <InformationRow
              label="FraudCheck"
              value="Email Address"
              isBadge
              badgeText={KYC_STATUS.UNCHECKED}
            />{" "}
            <Separator />
            <InformationRow
              label="Biometrics"
              value="Phone Number"
              isBadge
              badgeText={KYC_STATUS.UNCHECKED}
            />
          </Card>
        </div>
        <Separator />
        <Badge className="space-x-xs py-md px-lg bg-success-50 border border-success-200 w-fit rounded-lg">
          <CheckCircle className="w-6 h-6 text-success-500" />
          <p className="text-sm font-medium text-success-700">Passed</p>
        </Badge>
      </Card>
    </div>
  )
}
