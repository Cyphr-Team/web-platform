import { Badge } from "@/components/ui/badge"
import { snakeCaseToText } from "@/utils"
import { getSubscriptionStatusBadge } from "../services/subscription.services"
import {
  PlanType,
  Subscription,
  SubscriptionStatus
} from "../types/subscription.types"
import { SubscriptionLimitTable } from "./SubscriptionLimitTable"

type SubscriptionInfoProps = {
  data: Subscription
}

export const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  return (
    <div className="flex gap-1 flex-wrap">
      <div>
        <Badge
          isDot
          variant="soft"
          variantColor={getSubscriptionStatusBadge(data?.status)}
          className="capitalize w-24 justify-center"
        >
          {snakeCaseToText(data?.status ?? "")}
        </Badge>
      </div>
      <div>
        <span>{data?.plan?.name ?? "N/A"}</span> -{" "}
        <span className="capitalize mr-0.5">
          {snakeCaseToText(data?.plan?.type ?? "") || "N/A"}
        </span>
        {data?.plan?.type === PlanType.ANNUAL_RECURRING &&
          data?.status === SubscriptionStatus.ACTIVE && (
            <SubscriptionLimitTable />
          )}
        <div className="text-xs text-text-tertiary">
          {data?.plan?.description}
        </div>
      </div>
    </div>
  )
}
