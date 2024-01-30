import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationItem from "../organisms/VerificationItem"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { VerificationStatus } from "../atoms/VerificationStatus"
import { VerificationIcon } from "../atoms/VerificationIcon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { UNKNOWN_VALUE } from "../../constants"
import { KybLienDetails } from "../molecules/LienDetails"
import { KybState } from "../molecules/KybState"

export const Component = () => {
  const { loanKybDetail } = useLoanApplicationDetailContext()

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
            status={loanKybDetail?.insights?.businessNameVerification}
          />
          <VerificationItem
            title="Office address verification"
            status={loanKybDetail?.insights?.officeAddressVerification}
          />
          <VerificationItem
            title="People verification"
            status={loanKybDetail?.insights?.peopleVerification}
          />
          <VerificationItem
            title="TIN match"
            status={loanKybDetail?.insights?.tinMatch}
          />
          <VerificationItem
            title="Watchlist screening"
            status={loanKybDetail?.insights?.watchlistScreening}
          />
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-3xl flex-1 overflow-auto">
        <Card className="w-full flex-1 space-y-4xl p-4xl">
          <div className="space-y-lg my-lg">
            <div className="flex items-center gap-sm">
              <VerificationStatus
                status={loanKybDetail?.businessName?.status}
              />
              <p className="text-4xl font-semibold ">
                {loanKybDetail?.businessName?.value ?? UNKNOWN_VALUE}
              </p>
            </div>
            <div className="flex gap-lg">
              {loanKybDetail?.industryClassification?.map((item, index) => (
                <Badge
                  key={index}
                  className="space-x-xs py-xs px-lg border w-fit"
                >
                  <p className="text-sm font-medium">{item}</p>
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 space-x-6xl">
            <div className="flex flex-col">
              <p className="text-text-secondary font-medium text-sm">
                Formation state
              </p>
              <p className="text-xl">
                {loanKybDetail?.formation.state ?? UNKNOWN_VALUE}
              </p>
            </div>
            <div className="flex flex-col space-y-sm">
              <p className="text-text-secondary font-medium text-sm">
                Formation date
              </p>
              <p className="text-xl">
                {loanKybDetail?.formation.date ?? UNKNOWN_VALUE}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-text-secondary font-medium text-sm">
                Entity type
              </p>
              <p className="text-xl">
                {loanKybDetail?.formation.entityType ?? UNKNOWN_VALUE}
              </p>
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
            <p className="text-xl my-sm">
              {loanKybDetail?.officeAddresses[0] ?? UNKNOWN_VALUE}
            </p>
            {loanKybDetail?.officeAddresses.length && (
              <Accordion type="single" collapsible className="w-fit">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="justify-start">
                    <p className="text-sm text-text-secondary">
                      {loanKybDetail?.officeAddresses.length} Office addresses
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {loanKybDetail?.officeAddresses.map((item, index) => (
                      <p key={index} className="text-xl my-sm">
                        {item}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
          <Separator />
          <div className="grid grid-cols-3 space-x-6xl">
            <div className="flex flex-col">
              <p className="text-text-secondary font-medium text-sm">Tax ID</p>
              <p className="text-xl">
                {loanKybDetail?.tax.value ?? UNKNOWN_VALUE}
              </p>
              {loanKybDetail?.tax.status && (
                <Badge className="mt-sm space-x-xs py-xs border w-fit">
                  <VerificationIcon status={loanKybDetail?.tax.status} />
                  <p className="text-sm">{loanKybDetail?.tax.label}</p>
                </Badge>
              )}
            </div>
            <div className="flex flex-col space-y-sm">
              <p className="text-text-secondary font-medium text-sm">Website</p>
              <p className="text-xl">
                {loanKybDetail?.website.url ?? UNKNOWN_VALUE}
              </p>
              {loanKybDetail?.website.description && (
                <p className="text-sm">{loanKybDetail?.website.description}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-text-secondary font-medium text-sm">
                Phone Number
              </p>
              <p className="text-xl">
                {loanKybDetail?.phoneNumber ?? UNKNOWN_VALUE}
              </p>
            </div>
          </div>
          <Separator />
          {loanKybDetail?.businessVerificationStatus && (
            <Badge className="space-x-xs py-md px-lg bg-success-secondary border border-success w-fit rounded-lg">
              <VerificationIcon
                status={loanKybDetail?.businessVerificationStatus}
              />
              <p className="text-sm font-medium text-success">
                {loanKybDetail?.businessVerificationStatus}
              </p>
            </Badge>
          )}
        </Card>{" "}
        <div className="grid grid-cols-2 gap-x-3xl">
          <KybState registrationStatus={loanKybDetail?.registrationStatus} />
          <KybLienDetails lienDetails={loanKybDetail?.liens} />
        </div>
      </div>
    </div>
  )
}
