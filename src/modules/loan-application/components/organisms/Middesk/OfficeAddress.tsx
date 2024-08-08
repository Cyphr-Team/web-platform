import { Dot } from "@/components/ui/dot"
import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { BusinessAddressDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useCallback, useMemo } from "react"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export const OfficeAddress = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const businessAddresses = loanKybDetail?.businessAddresses

  const getBusinessAddressNote = useCallback(
    (businessAddress: BusinessAddressDetail) => {
      return (
        <div>
          {businessAddress.deliverable && (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="green"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> Deliverable
              </div>
            </div>
          )}
          {businessAddress.cmra && (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="red"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> CMRA
              </div>
            </div>
          )}
          {businessAddress.registeredAgent && (
            <div className="flex items-center">
              <Dot
                className="flex-shrink-0 self-start mt-1"
                variantColor="yellow"
              />
              <div className="flex items-center text-base flex-wrap">
                USPS <Dot className="mx-1 w-2" /> Registered Agent
              </div>
            </div>
          )}
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
      status={loanKybDetail?.insights.officeAddress?.status}
      label={businessAddresses?.subLabel}
    />
  )
  const headerTitle = <>Office Addresses {badge}</>

  const content = (
    <MiddeskTableContent
      nameTitle="Office addresses"
      data={data}
      isLoading={isLoading}
    />
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.officeAddress}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
