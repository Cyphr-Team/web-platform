import { API_PATH } from "@/constants"
import { subscriptionKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { ListResponse, PaginateParams } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"
import {
  PlanType,
  Subscription,
  SubscriptionStatus
} from "../../types/subscription.types"

type ListSubscriptionsResponse = ListResponse<Subscription>

type Params = PaginateParams

export const useQueryListSubscription = ({ limit, offset }: Params) => {
  return useQuery<ListSubscriptionsResponse>({
    queryKey: subscriptionKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      try {
        const response = await getRequest<Params, ListSubscriptionsResponse>({
          path: API_PATH.subscriptions.list(),
          params: { limit, offset }
        })
        return response
      } catch {
        const subscriptions: Subscription[] = [
          {
            type: PlanType.ANNUAL_RECURRING,
            planName: "SAAS/Usage - Tier III",
            institutionName: "Capsight",
            status: SubscriptionStatus.ACTIVE,
            createdAt: "2024-01-19T02:28:10.672837Z",
            nextRenewal: "2025-01-19T02:40:10.672837Z",
            price: 50000,
            currency: "USD",
            limit: [
              {
                unit: "Seat",
                limit: "Unlimited",
                currentUsage: 68
              },
              {
                unit: "Application",
                limit: "Unlimited",
                currentUsage: 575
              }
            ]
          },
          {
            type: PlanType.ANNUAL_RECURRING,
            planName: "SAAS/Usage - Tier II",
            institutionName: "Capsight",
            status: SubscriptionStatus.CANCELLED,
            createdAt: "2023-08-01T10:10:10.672837Z",
            price: 25000,
            currency: "USD"
          },
          {
            type: PlanType.ANNUAL_RECURRING,
            planName: "SAAS/Usage - Tier I",
            institutionName: "Capsight",
            status: SubscriptionStatus.ENDED,
            createdAt: "2022-11-20T05:35:10.672837Z",
            price: 15000,
            currency: "USD"
          },
          {
            type: PlanType.ONE_TIME,
            planName: "Implementation - Tier I",
            institutionName: "Capsight",
            status: SubscriptionStatus.ACTIVE,
            createdAt: "2022-11-20T05:35:10.672837Z",
            price: 10000,
            currency: "USD"
          }
        ]

        return {
          total: subscriptions.length,
          currentOffset: 0,
          data: subscriptions
        }
      }
    },
    placeholderData: keepPreviousData
  })
}
