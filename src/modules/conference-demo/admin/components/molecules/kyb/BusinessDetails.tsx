import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { type BusinessDetail } from "@/modules/loan-application-management/constants/types/business.type"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { MiddeskDetailItem } from "@/modules/loan-application/components/molecules/middesk/MiddeskDetailItem"
import { SourceToolTip } from "@/modules/loan-application/components/molecules/SourceToolTip"
import { DownloadPDF } from "@/modules/loan-application/components/organisms/Middesk/DownloadPDF"
import { mappedStateAbbreviations } from "@/utils/state.utils"

function BusinessDetails({
  isDownloadAble = true,
  name
}: {
  isDownloadAble?: boolean
  name?: string
}) {
  const stateAbbr = MOCK_KYB_DETAIL.businessDetails?.formationState.value
  const businessDetail = {
    name: {
      ...MOCK_KYB_DETAIL.businessDetails.name,
      value: name || MOCK_KYB_DETAIL.businessDetails.name.value
    },
    address: MOCK_KYB_DETAIL.businessDetails.address,
    tin: MOCK_KYB_DETAIL.businessDetails.tin,
    entityType: MOCK_KYB_DETAIL.businessDetails.entityType,
    formationState: MOCK_KYB_DETAIL.businessDetails?.formationState
      ? {
          ...MOCK_KYB_DETAIL.businessDetails?.formationState,
          value: stateAbbr
            ? mappedStateAbbreviations[
                stateAbbr as keyof typeof mappedStateAbbreviations
              ] ?? stateAbbr
            : stateAbbr
        }
      : undefined,
    formationDate: MOCK_KYB_DETAIL.businessDetails.formationDate
  }

  const getLabelByDataKey = (key: keyof BusinessDetail) => {
    switch (key) {
      case "name":
        return "Business name"
      case "address":
        return "Officer address"
      case "tin":
        return "TIN"
      case "formationState":
        return "Formation state"
      case "formationDate":
        return "Formation date"
      case "entityType":
        return "Entity type"
      default:
        return key
    }
  }

  const headerTitle = <>Business Details</>
  const headerRight = isDownloadAble ? <DownloadPDF /> : ""

  const content = (
    <div className="grid grid-cols-2 gap-4">
      {businessDetail
        ? Object.entries(businessDetail).map(([key, detailData]) => {
            return (
              <MiddeskDetailItem
                key={key}
                label={getLabelByDataKey(key as keyof BusinessDetail)}
                status={detailData?.status}
                toolTip={
                  detailData ? (
                    <SourceToolTip
                      data={
                        detailData?.source?.state
                          ? [detailData?.source]
                          : undefined
                      }
                      // Only have a trigger button when the data or description is available
                      description={detailData?.message}
                      sourceContent={
                        detailData?.source?.state || detailData?.message
                          ? detailData?.subLabel
                          : ""
                      }
                    />
                  ) : null
                }
                value={detailData?.value}
              />
            )
          })
        : null}
    </div>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={headerRight}
      headerTitle={headerTitle}
    />
  )
}

export default BusinessDetails
