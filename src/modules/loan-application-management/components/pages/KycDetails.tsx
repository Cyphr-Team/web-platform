import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationItem from "../organisms/VerificationItem"
import { Separator } from "@/components/ui/separator"

import { InformationRow } from "../molecules/InformationRow"
import { UNKNOWN_VALUE } from "../../constants"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { VerificationStatus } from "../atoms/VerificationStatus"
import { BadgeVerificationStatus } from "../atoms/BadgeVerificationStatus"

export const Component = () => {
  const { loanKycDetail } = useLoanApplicationDetailContext()

  return (
    <div className="lg:flex gap-3xl w-full">
      <Card className="h-fit lg:sticky top-0 z-10 mb-4">
        <CardHeader className="mb-sm pb-0">
          <CardTitle className="font-bold text-base mb-sm">Summary</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-1 lg:space-y-sm w-full lg:w-[19rem]">
          <VerificationItem
            title="ID Check"
            status={loanKycDetail?.summary?.idCheck.status}
          />
          <VerificationItem
            title="Personal Info"
            status={loanKycDetail?.summary?.personalInfo.status}
          />
          <VerificationItem
            title="Checklist"
            status={loanKycDetail?.summary?.checkList.status}
          />
        </CardContent>
      </Card>
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl overflow-auto">
        <div className="space-y-lg my-lg">
          <div className="flex items-center gap-sm">
            <VerificationStatus status={loanKycDetail?.kycStatus?.status} />
            <p className="text-4xl font-semibold ">KYC/Identity Verification</p>
          </div>
          {/* Comment because API has not returned the data yet */}
          {/* <div className="flex gap-lg">
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
          </div> */}
        </div>
        <div className="flex flex-col gap-y-lg">
          <p className="text-3xl font-semibold">Personal Info</p>
          <Card>
            <InformationRow
              label="Name"
              value={
                loanKycDetail?.personalInfo?.name?.payload ?? UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.personalInfo?.name?.status}
            />
            <Separator />
            <InformationRow
              label="Date of Birth"
              value={
                loanKycDetail?.personalInfo?.dateOfBirth?.payload ??
                UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.personalInfo?.dateOfBirth?.status}
            />{" "}
            <Separator />
            <InformationRow
              label="Residential Address"
              value={
                loanKycDetail?.personalInfo?.residentialAddress?.payload ??
                UNKNOWN_VALUE
              }
              isBadge
              badgeText={
                loanKycDetail?.personalInfo?.residentialAddress?.status
              }
            />{" "}
            <Separator />
            <InformationRow
              label="Email Address"
              value={
                loanKycDetail?.personalInfo?.email?.payload ?? UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.personalInfo?.email?.status}
            />{" "}
            <Separator />
            <InformationRow
              label="Phone Number"
              value={
                loanKycDetail?.personalInfo?.phoneNumber?.payload ??
                UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.personalInfo?.phoneNumber?.status}
              hasAction
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
              badgeText={loanKycDetail?.idCheck?.driverLicense?.status}
            />
            <Separator />
            <InformationRow
              label="Passport"
              isBadge
              hasAction
              badgeText={loanKycDetail?.idCheck?.passport?.status}
            />{" "}
          </Card>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-lg">
          <p className="text-3xl font-semibold">Checklists</p>
          <Card>
            <InformationRow
              label="PEP/Sanctions"
              value={
                loanKycDetail?.checkLists?.pepSanctions?.reason ?? UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.checkLists?.pepSanctions?.status}
            />
            <Separator />
            <InformationRow
              label="Internal Blocklist"
              value={
                loanKycDetail?.checkLists?.internalBlocklist?.reason ??
                UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.checkLists?.internalBlocklist?.status}
            />{" "}
            <Separator />
            <InformationRow
              label="Duplicate"
              value={
                loanKycDetail?.checkLists?.duplicate?.reason ?? UNKNOWN_VALUE
              }
              isBadge
              hasAction
              badgeText={loanKycDetail?.checkLists?.duplicate?.status}
            />{" "}
            <Separator />
            <InformationRow
              label="FraudCheck"
              value={loanKycDetail?.checkLists?.fraud?.reason ?? UNKNOWN_VALUE}
              isBadge
              badgeText={loanKycDetail?.checkLists?.duplicate?.status}
            />{" "}
            <Separator />
            <InformationRow
              label="Biometrics"
              value={
                loanKycDetail?.checkLists?.biometrics?.reason ?? UNKNOWN_VALUE
              }
              isBadge
              badgeText={loanKycDetail?.checkLists?.biometrics?.status}
            />
          </Card>
        </div>
        <Separator />
        {loanKycDetail?.kycStatus && (
          <BadgeVerificationStatus status={loanKycDetail?.kycStatus.status} />
        )}
      </Card>
    </div>
  )
}
