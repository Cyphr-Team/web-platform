import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { MiddeskDetailItem } from "../../molecules/MiddeskDetailItem"
import { SourceToolTip } from "../../molecules/SourceToolTip"
import { DownloadPDF } from "./DownloadPDF"

type BusinessDetailData = {
  businessName?: MiddeskTableContentReport
  officerAddress?: MiddeskTableContentReport
  tin?: MiddeskTableContentReport
  entityType?: MiddeskTableContentReport
  formationState?: MiddeskTableContentReport
  formationDate?: MiddeskTableContentReport
}

export const BusinessDetail = () => {
  const data: BusinessDetailData = {
    businessName: {
      name: "Larry’s Latte LLC",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    officerAddress: {
      name: "123 Coffee Lane, Seattle, WA 98765",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    tin: {
      name: "12-3456789",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    entityType: {
      name: "LLC",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    formationState: {
      name: "WA",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    formationDate: {
      name: "4 years ago • 02/24/2020   ",
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    }
  }

  const headerTitle = <>Business Details</>
  const headerRight = <DownloadPDF />

  const content = (
    <div className="grid grid-cols-2 gap-4">
      {!!data?.businessName && (
        <MiddeskDetailItem
          label="Business name"
          value={data?.businessName?.name}
          status={data.businessName?.sources?.[0]?.metadata?.status}
          toolTip={
            <SourceToolTip
              data={data?.businessName?.sources ?? []}
              sourceContent="Verified"
              description="Match identified to the submitted Business Name"
            />
          }
        />
      )}

      {!!data?.officerAddress && (
        <MiddeskDetailItem
          label="Officer address"
          value={data?.officerAddress?.name}
          status={data.officerAddress?.status}
          toolTip={
            <SourceToolTip
              data={data?.officerAddress?.sources ?? []}
              sourceContent="Verified"
            />
          }
        />
      )}

      {!!data?.tin && (
        <MiddeskDetailItem
          label="TIN"
          value={data?.tin?.name}
          status={data.tin?.sources?.[0]?.metadata?.status}
          toolTip={
            <SourceToolTip
              data={data?.tin?.sources ?? []}
              sourceContent="Found"
            />
          }
        />
      )}

      {!!data?.entityType && (
        <MiddeskDetailItem
          label="Officer address"
          value={data?.entityType?.name}
          toolTip={
            <SourceToolTip
              data={data?.entityType?.sources ?? []}
              sourceContent="Source"
            />
          }
        />
      )}

      {!!data?.formationState && (
        <MiddeskDetailItem
          label="Formation state"
          value={data?.formationState?.name}
          toolTip={
            <SourceToolTip
              data={data?.formationState?.sources ?? []}
              sourceContent="Source"
            />
          }
        />
      )}

      {!!data?.formationDate && (
        <MiddeskDetailItem
          label="Formation date"
          value={data?.formationDate?.name}
          toolTip={
            <SourceToolTip
              data={data?.formationDate?.sources ?? []}
              sourceContent="Source"
            />
          }
        />
      )}
    </div>
  )

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={content}
    />
  )
}
