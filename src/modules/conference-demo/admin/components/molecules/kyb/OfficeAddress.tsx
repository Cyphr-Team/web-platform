import { Dot } from "@/components/ui/dot"
import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { BusinessAddressDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useCallback, useMemo } from "react"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

export const OfficeAddress = () => {
  const businessAddresses = MOCK_KYB_DETAIL?.businessAddresses

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
      status={MOCK_KYB_DETAIL.insights.officeAddress?.status}
      label={businessAddresses?.subLabel}
    />
  )
  const headerTitle = <>Office Addresses {badge}</>

  const content = (
    <MiddeskTableContent nameTitle="Office addresses" data={data} />
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.officeAddress}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
