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
    <div className="flex flex-wrap gap-1">
      <div>
        <Badge
          isDot
          className="w-24 justify-center capitalize"
          variant="soft"
          variantColor={getSubscriptionStatusBadge(data?.status)}
        >
          {snakeCaseToText(data?.status ?? "")}
        </Badge>
      </div>
      <div>
        <span>{data?.plan?.name ?? "N/A"}</span> -{" "}
        <span className="mr-0.5 capitalize">
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
