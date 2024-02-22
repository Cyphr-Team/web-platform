import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VerificationStatus } from "../atoms/VerificationStatus"
import { VerificationIcon } from "../atoms/VerificationIcon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { UNKNOWN_VALUE } from "../../constants"
import { LoanApplicationsKyb } from "../../constants/type"
import { BadgeVerificationStatus } from "../atoms/BadgeVerificationStatus"

type Props = {
  loanKybDetail?: LoanApplicationsKyb
}

export const KybReport = ({ loanKybDetail }: Props) => {
  return (
    <Card className="w-full flex-1 space-y-4xl p-4xl">
      <div className="space-y-lg my-lg">
        <div className="flex items-center gap-sm">
          <VerificationStatus status={loanKybDetail?.businessName?.status} />
          <p className="text-4xl font-semibold ">
            {loanKybDetail?.businessName?.value ?? UNKNOWN_VALUE}
          </p>
        </div>

        <div className="flex gap-lg flex-wrap">
          {loanKybDetail?.industryClassification?.map((item, index) => (
            <Badge key={index} className="space-x-xs py-xs px-lg border w-fit">
              <p className="text-sm font-medium">{item}</p>
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col flex-1">
          <p className="text-slate-500 font-medium text-sm whitespace-nowrap">
            Formation state
          </p>
          <p className="text-xl mt-1.5">
            {loanKybDetail?.formation?.state ?? UNKNOWN_VALUE}
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-slate-500 font-medium text-sm whitespace-nowrap">
            Formation date
          </p>
          <p className="text-xl mt-1.5">
            {loanKybDetail?.formation?.date ?? UNKNOWN_VALUE}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col flex-1 gap-1.5">
          <p className="text-slate-500 font-medium text-sm whitespace-nowrap">
            Tax ID
          </p>
          <p className="text-xl">{loanKybDetail?.tax.value ?? UNKNOWN_VALUE}</p>
          {loanKybDetail?.tax.status && (
            <Badge className="mt-sm space-x-xs py-xs border w-fit">
              <VerificationIcon
                status={loanKybDetail?.tax.status}
                className="w-4"
              />
              <p className="text-sm font-medium">{loanKybDetail?.tax.label}</p>
            </Badge>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-slate-500 font-medium text-sm whitespace-nowrap">
            Entity type
          </p>
          <p className="text-xl mt-1.5">
            {loanKybDetail?.formation?.entityType ?? UNKNOWN_VALUE}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col">
        <div className="flex items-center space-x-sm">
          <div className="w-4 h-4">
            <AspectRatio ratio={1 / 1}>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </AspectRatio>{" "}
          </div>
          <p className="text-slate-500 font-medium text-sm">Office address</p>
        </div>
        <p className="text-xl my-sm">
          {loanKybDetail?.officeAddresses[0] ?? UNKNOWN_VALUE}
        </p>
        {loanKybDetail?.officeAddresses.length && (
          <Accordion type="single" collapsible className="w-fit">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="justify-start pt-0 pb-1">
                <p className="text-sm text-slate-500">
                  {loanKybDetail?.officeAddresses.length} Office addresses
                </p>
              </AccordionTrigger>
              <AccordionContent>
                {loanKybDetail?.officeAddresses.map((item, index) => (
                  <p key={index} className="text-sm my-sm">
                    {item}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
      <Separator />
      <div className="md:flex space-y-4 md:space-y-0 gap-8">
        <div className="flex flex-col flex-1 flex-grow w-full">
          <p className="text-slate-500 font-medium text-sm">Website</p>
          <p className="text-xl break-all mt-1.5">
            {loanKybDetail?.website.url ?? UNKNOWN_VALUE}
          </p>
          {loanKybDetail?.website.description && (
            <p className="text-sm text-slate-500 mt-1.5">
              {loanKybDetail?.website.description}
            </p>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-slate-500 font-medium text-sm">Phone Number</p>
          {Array.isArray(loanKybDetail?.phoneNumber) ? (
            <p className="text-xl mt-1.5">
              {loanKybDetail?.phoneNumber?.[0] ?? UNKNOWN_VALUE}
            </p>
          ) : (
            loanKybDetail?.phoneNumber ?? UNKNOWN_VALUE
          )}
        </div>
      </div>
      <Separator />
      {loanKybDetail?.businessVerificationStatus && (
        <BadgeVerificationStatus
          status={loanKybDetail?.businessVerificationStatus}
        />
      )}
    </Card>
  )
}
