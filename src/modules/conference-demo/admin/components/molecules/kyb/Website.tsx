import {
  type BusinessWebsiteDetail,
  BusinessWebsiteFieldStatus,
  type TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { MiddeskDetailItem } from "@/modules/loan-application/components/molecules/middesk/MiddeskDetailItem"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { convertDateTimeToLocal, formatDate } from "@/utils"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant.ts"

const getLabelByDataKey = (key: keyof BusinessWebsiteDetail) => {
  switch (key) {
    case "status":
      return "Status"
    case "identifiedWebPresence":
      return "Identified Web Presence"
    default:
      return key
  }
}

const columns: ColumnDef<BusinessWebsiteDetail>[] = [
  {
    accessorKey: "website",
    header: () => <MiddeskTableHeader title="Website" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <a
          className="truncate text-sm font-bold text-blue-600"
          href={data.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.website}
        </a>
      )
    }
  },
  {
    accessorKey: "created",
    header: () => <MiddeskTableHeader title="Created" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex min-w-0 items-center text-sm">
          <p>{data.created ? formatDate(data.created, "T") : "---"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "phoneNumber",
    header: () => <MiddeskTableHeader title="Phone number" />,
    cell: ({ row }) => {
      const data = row.original
      const phoneNumbers = data.phoneNumber
      const phoneNumber =
        !phoneNumbers || phoneNumbers.length === 0
          ? "---"
          : phoneNumbers.join(", ")

      return (
        <div className="flex min-w-0 items-center text-sm">
          <p>{phoneNumber}</p>
        </div>
      )
    }
  }
]

export function Website() {
  const website = MOCK_KYB_DETAIL.businessWebsite

  const badge = (
    <MiddeskBadge
      label={website.subLabel}
      status={MOCK_KYB_DETAIL.insights.website?.status}
    />
  )

  const getStatusIndicatorProps = (
    status: TaskFieldStatus | undefined,
    detailData: string | undefined
  ) => {
    const isStatusCheck =
      !!status &&
      (detailData === BusinessWebsiteFieldStatus.Online ||
        detailData === BusinessWebsiteFieldStatus.Offline ||
        detailData === BusinessWebsiteFieldStatus.Unknown)

    return {
      isStatusCheck,
      color: isStatusCheck ? status : undefined
    }
  }

  const headerTitle = <>Website {badge}</>

  const businessWebsite: BusinessWebsiteDetail[] = MOCK_KYB_DETAIL
    ?.businessWebsite?.data
    ? [MOCK_KYB_DETAIL?.businessWebsite?.data]
    : []

  const websiteDetail = {
    status: MOCK_KYB_DETAIL.businessWebsite.data.status,
    identifiedWebPresence:
      MOCK_KYB_DETAIL.businessWebsite.data.identifiedWebPresence
  }

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        {websiteDetail
          ? Object.entries(websiteDetail).map(([key, detailData]) => {
              return (
                <MiddeskDetailItem
                  key={key}
                  annotation={
                    key === "status"
                      ? MOCK_KYB_DETAIL.businessWebsite.data.online
                        ? convertDateTimeToLocal(
                            MOCK_KYB_DETAIL.businessWebsite.data.online,
                            ", ",
                            "@"
                          )
                        : "---"
                      : undefined
                  }
                  label={getLabelByDataKey(key as keyof BusinessWebsiteDetail)}
                  labelClassName="text-xs"
                  statusProps={getStatusIndicatorProps(
                    MOCK_KYB_DETAIL.insights.website?.status,
                    detailData
                  )}
                  value={detailData}
                />
              )
            })
          : null}
      </div>
      <div className="overflow-x-auto">
        <MiddeskTable
          columns={columns}
          data={businessWebsite}
          tableClassName="table-fixed"
        />
      </div>
    </div>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.website}
    />
  )
}
