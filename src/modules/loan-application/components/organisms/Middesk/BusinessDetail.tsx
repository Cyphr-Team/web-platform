import { BusinessDetail as BusinessDetailType } from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { mappedStateAbbreviations } from "@/utils/state.utils"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import {
  MiddeskDetailItem,
  MiddeskDetailItemSkeleton
} from "../../molecules/MiddeskDetailItem"
import { SourceToolTip } from "../../molecules/SourceToolTip"
import { DownloadPDF } from "./DownloadPDF"

export const BusinessDetail = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const stateAbbr = loanKybDetail?.businessDetails?.formationState.value
  const businessDetail = {
    name: loanKybDetail?.businessDetails.name,
    address: loanKybDetail?.businessDetails.address,
    tin: loanKybDetail?.businessDetails.tin,
    formationDate: loanKybDetail?.businessDetails.formationDate,
    entityType: loanKybDetail?.businessDetails.entityType,
    formationState: loanKybDetail?.businessDetails?.formationState
      ? {
          ...loanKybDetail?.businessDetails?.formationState,
          value: stateAbbr
            ? mappedStateAbbreviations[
                stateAbbr as keyof typeof mappedStateAbbreviations
              ] ?? stateAbbr
            : stateAbbr
        }
      : undefined
  }

  const getLabelByDataKey = (key: keyof BusinessDetailType) => {
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
  const headerRight = <DownloadPDF />

  const content = (
    <div className="grid grid-cols-2 gap-4">
      {businessDetail &&
        Object.entries(businessDetail).map(([key, detailData]) => {
          return (
            <MiddeskDetailItem
              key={key}
              label={getLabelByDataKey(key as keyof BusinessDetailType)}
              value={detailData?.value}
              status={detailData?.status}
              toolTip={
                detailData && (
                  <SourceToolTip
                    data={
                      detailData?.source?.state
                        ? [detailData?.source]
                        : undefined
                    }
                    sourceContent={detailData?.subLabel}
                    description={detailData?.message}
                  />
                )
              }
            />
          )
        })}
    </div>
  )

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={
        isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            <MiddeskDetailItemSkeleton />
            <MiddeskDetailItemSkeleton />
            <MiddeskDetailItemSkeleton />
          </div>
        ) : (
          content
        )
      }
    />
  )
}
