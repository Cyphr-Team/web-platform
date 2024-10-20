import { Badge } from "@/components/ui/badge"
import { snakeCaseToText } from "@/utils"
import { getSubscriptionStatusBadge } from "../services/subscription.services"
import {
  PlanType,
  type Subscription,
  SubscriptionStatus
} from "../types/subscription.types"
import { SubscriptionLimitTable } from "./SubscriptionLimitTable"

interface SubscriptionInfoProps {
  data: Subscription
}

export function SubscriptionInfo({ data }: SubscriptionInfoProps) {
  return (
    <div className="flex gap-1 flex-wrap">
      <div>
        <Badge
          isDot
          className="capitalize w-24 justify-center"
          variant="soft"
          variantColor={getSubscriptionStatusBadge(data?.status)}
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
            <SubscriptionLimitTable institutionId={data?.institution?.id} />
          )}
        <div className="text-xs text-text-tertiary">
          {data?.plan?.description}
        </div>
      </div>
    </div>
  )
}
