import { Dot } from "@/components/ui/dot"
import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { type BusinessAddressDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { type MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useCallback, useMemo } from "react"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export function OfficeAddress() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const businessAddresses = loanKybDetail?.businessAddresses

  const getBusinessAddressNote = useCallback(
    (businessAddress: BusinessAddressDetail) => {
      return (
        <div>
          {businessAddress.deliverable ? (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="green"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> Deliverable
              </div>
            </div>
          ) : null}
          {businessAddress.cmra ? (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="red"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> CMRA
              </div>
            </div>
          ) : null}
          {businessAddress.registeredAgent ? (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="yellow"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> Registered Agent
              </div>
            </div>
          ) : null}
        </div>
      )
    },
    []
  )

  const data: MiddeskTableContentReport[] = useMemo(
    () =>
      businessAddresses?.data?.map((businessAddress) => ({
        name: businessAddress.address,
        submitted: businessAddress.submitted,
        sources: [businessAddress.source],
        status: businessAddress.status,
        renderNote: getBusinessAddressNote(businessAddress)
      })) ?? [],
    [businessAddresses, getBusinessAddressNote]
  )

  const badge = (
    <MiddeskBadge
      label={businessAddresses?.subLabel}
      status={loanKybDetail?.insights.officeAddress?.status}
    />
  )
  const headerTitle = <>Office Addresses {badge}</>

  const content = (
    <MiddeskTableContent
      data={data}
      isLoading={isLoading}
      nameTitle="Office addresses"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.officeAddress}
    />
  )
}
