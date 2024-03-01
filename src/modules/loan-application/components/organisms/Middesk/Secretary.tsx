import { Dot } from "@/components/ui/dot"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { CardStatus } from "@/modules/loan-application-management/components/atoms/CardStatus"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { STATE_STATUS } from "@/modules/loan-application-management/constants"
import { KYC_STATUS } from "@/modules/loan-application-management/constants/types/kyc"
import {
  MIDDESK_ACTIVE_STATUS,
  RegistrationStatus,
  SecretaryReport
} from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { SourceToolTip } from "../../molecules/SourceToolTip"

const columns: ColumnDef<SecretaryReport>[] = [
  {
    accessorKey: "name",
    header: () => <MiddeskTableHeader title={"File date"} />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.fileDate ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "submitted",
    header: () => <MiddeskTableHeader title="State" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p>{data?.state ?? "-"}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <MiddeskTableHeader title="Status" />,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <MiddeskBadge status={data?.status} />
        </div>
      )
    }
  },
  {
    accessorKey: "sources",
    header: () => <MiddeskTableHeader title="Sub-status" />,
    cell: ({ row }) => {
      const data = row.original

      if (!data.sources) return "-"

      return (
        <div className="flex items-start">
          <Dot
            className="flex-shrink-0 self-start mt-1"
            variantColor={getBadgeVariantByMiddeskStatus(
              data.sources?.[0].metadata?.status
            )}
          />
          <SourceToolTip
            data={data?.sources ?? []}
            sourceContent="Good Standing"
          />
        </div>
      )
    }
  }
]

export const Secretary = () => {
  const registrationStatus: RegistrationStatus = {
    active: 2,
    inactive: 0,
    unknown: 0
  }
  const data: SecretaryReport[] = [
    {
      fileDate: "02/24/2020",
      state: "Washington",
      status: MIDDESK_ACTIVE_STATUS.DOMESTIC_ACTIVE,
      sources: [{ metadata: { state: "WA", status: KYC_STATUS.VERIFIED } }]
    },
    {
      fileDate: "02/24/2020",
      state: "Colorado",
      status: MIDDESK_ACTIVE_STATUS.ACTIVE,
      sources: [{ metadata: { state: "CO", status: KYC_STATUS.VERIFIED } }]
    }
  ]

  const badge = <MiddeskBadge status={MIDDESK_ACTIVE_STATUS.ACTIVE} />
  const headerTitle = <>Secretary of State filings {badge}</>
  const headerRight = (
    <div className="text-text-tertiary">
      Last updated on {format(new Date(), FORMAT_DATE_MM_DD_YYYY)}
    </div>
  )

  const content = (
    <>
      <div className="flex flex-col gap-y-lg my-4">
        <p className="text-lg font-medium">Registration Status</p>
        <div className="flex flex-wrap gap-lg">
          <div className="w-[140px] rounded-lg overflow-hidden">
            <CardStatus
              status={STATE_STATUS.ACTIVE}
              amount={registrationStatus?.active}
            />
          </div>
          <div className="w-[140px] rounded-lg overflow-hidden">
            <CardStatus
              status={STATE_STATUS.INACTIVE}
              amount={registrationStatus?.inactive}
            />
          </div>
          <div className="w-[140px] rounded-lg overflow-hidden">
            <CardStatus
              status={STATE_STATUS.UNKNOWN}
              amount={registrationStatus?.unknown}
            />
          </div>
        </div>
      </div>
      <MiddeskTable
        tableClassName={"table-fixed"}
        columns={columns}
        data={data}
      />
    </>
  )

  return (
    <MiddeskCard
      headerTitle={headerTitle}
      headerRight={headerRight}
      content={content}
    />
  )
}
