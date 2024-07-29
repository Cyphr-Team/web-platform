import {
  BusinessWebsiteDetail,
  BusinessWebsiteFieldStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import {
  MiddeskDetailItem,
  MiddeskDetailItemSkeleton
} from "../../molecules/MiddeskDetailItem"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { ColumnDef } from "@tanstack/react-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/MiddeskBadge"
import { convertDateTimeToLocal, formatDate } from "@/utils"

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
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm font-bold truncate"
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
        <div className="min-w-0 flex items-center text-sm">
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
        <div className="min-w-0 flex items-center text-sm">
          <p>{phoneNumber}</p>
        </div>
      )
    }
  }
]

export const Website = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const website = loanKybDetail?.businessWebsite

  const badge = (
    <MiddeskBadge
      status={loanKybDetail?.insights.website?.status}
      label={website?.subLabel}
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

  const businessWebsite: BusinessWebsiteDetail[] = loanKybDetail
    ?.businessWebsite?.data
    ? [loanKybDetail?.businessWebsite?.data]
    : []

  const websiteDetail = {
    status: loanKybDetail?.businessWebsite?.data?.status,
    identifiedWebPresence:
      loanKybDetail?.businessWebsite?.data?.identifiedWebPresence
  }

  const content = (
    <div className="space-y-4">
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {websiteDetail &&
          Object.entries(websiteDetail).map(([key, detailData]) => {
            return (
              <MiddeskDetailItem
                key={key}
                label={getLabelByDataKey(key as keyof BusinessWebsiteDetail)}
                value={detailData}
                statusProps={getStatusIndicatorProps(
                  loanKybDetail?.insights.website?.status,
                  detailData
                )}
                annotation={
                  key === "status"
                    ? loanKybDetail?.businessWebsite?.data?.online
                      ? convertDateTimeToLocal(
                          loanKybDetail?.businessWebsite?.data?.online,
                          ", ",
                          "@"
                        )
                      : "---"
                    : undefined
                }
                labelClassName="text-xs"
              />
            )
          })}
      </div>
      <div className="overflow-x-auto">
        <MiddeskTable
          tableClassName={"table-fixed"}
          columns={columns}
          data={businessWebsite}
          isLoading={isLoading}
        />
      </div>
    </div>
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.website}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={
        isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
