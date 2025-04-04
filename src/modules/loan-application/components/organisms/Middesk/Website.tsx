import {
  type BusinessWebsiteDetail,
  BusinessWebsiteFieldStatus,
  type TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import {
  MiddeskDetailItem,
  MiddeskDetailItemSkeleton
} from "../../molecules/middesk/MiddeskDetailItem"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { type ColumnDef } from "@tanstack/react-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { DateHeader } from "@/modules/loan-application/components/organisms/Middesk/DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
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
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const website = loanKybDetail?.businessWebsite

  const badge = (
    <MiddeskBadge
      label={website?.subLabel}
      status={loanKybDetail?.insights.website?.status}
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
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2">
        {websiteDetail
          ? Object.entries(websiteDetail).map(([key, detailData]) => {
              return (
                <MiddeskDetailItem
                  key={key}
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
                  label={getLabelByDataKey(key as keyof BusinessWebsiteDetail)}
                  labelClassName="text-xs"
                  statusProps={getStatusIndicatorProps(
                    loanKybDetail?.insights.website?.status,
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
          isLoading={isLoading}
          tableClassName="table-fixed"
        />
      </div>
    </div>
  )

  return (
    <MiddeskCard
      content={
        isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MiddeskDetailItemSkeleton />
            <MiddeskDetailItemSkeleton />
            <MiddeskDetailItemSkeleton />
          </div>
        ) : (
          content
        )
      }
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.website}
    />
  )
}
