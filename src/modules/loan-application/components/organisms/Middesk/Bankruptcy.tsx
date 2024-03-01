import { Dot } from "@/components/ui/dot"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MIDDESK_FOUND_STATUS } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { format } from "date-fns"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"

export const Bankruptcy = () => {
  const badge = <MiddeskBadge status={MIDDESK_FOUND_STATUS.NONE_FOUND} />
  const headerTitle = <>Bankruptcies {badge}</>
  const headerRight = (
    <div className="text-text-tertiary">
      Last updated on {format(new Date(), FORMAT_DATE_MM_DD_YYYY)}
    </div>
  )

  const content = (
    <div className="mt-4">
      <NotFoundAlert>
        <div className="flex items-center">
          <Dot
            variantColor={getBadgeVariantByMiddeskStatus(
              MIDDESK_FOUND_STATUS.NONE_FOUND
            )}
          />
          No Bankruptcies Found
        </div>
      </NotFoundAlert>
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
