import { SortOrder } from "@/types/common.type.ts"
import { MOCK_APPLICATIONS } from "@/modules/conference-demo/admin/constants/application-data.ts"
import { type AssessmentResponse } from "@/modules/loanready/types/assessment.ts"
import { RatingLevel } from "@/modules/assessment/interface/Rating/type.ts"

// Define response type

interface WorkspaceAdminLoanReadyAssessmentSort {
  scoreLevel?: SortOrder
  applicationIdNumber?: SortOrder
  businessName?: SortOrder
  email?: SortOrder
  status?: SortOrder
  requestedAmount?: SortOrder
  plan?: SortOrder
  createdAt?: SortOrder
  submittedAt?: SortOrder
}

export interface WorkspaceAdminListAssessmentParams {
  sort?: WorkspaceAdminLoanReadyAssessmentSort
}

const sortCustom = (
  a: string | number | null,
  b: string | number | null,
  order: SortOrder
): number => {
  if (!a) return order === SortOrder.ASC_NULLS_FIRST ? -1 : 1
  if (!b) return order === SortOrder.ASC_NULLS_FIRST ? 1 : -1
  if (a < b) return order === SortOrder.ASC_NULLS_FIRST ? -1 : 1
  if (a > b) return order === SortOrder.ASC_NULLS_FIRST ? 1 : -1

  return 0
}

const scoreMap = {
  [RatingLevel.POOR]: 1,
  [RatingLevel.FAIR]: 2,
  [RatingLevel.GOOD]: 3,
  [RatingLevel.VERY_GOOD]: 4,
  [RatingLevel.EXCELLENT]: 5
} as Record<string, number>

export const useListAssessmentForAdmin = ({
  sort
}: WorkspaceAdminListAssessmentParams) => {
  const sortedData = [...MOCK_APPLICATIONS] as AssessmentResponse[]

  // Sort mock data
  if (sort) {
    sortedData.sort((a, b) => {
      for (const key in sort) {
        const order = sort[key as keyof WorkspaceAdminLoanReadyAssessmentSort]

        if (order) {
          const aValue = a[key as keyof AssessmentResponse] ?? null
          const bValue = b[key as keyof AssessmentResponse] ?? null

          // Special handling for scoreLevel
          if (key === "scoreLevel") {
            const aScore = scoreMap[aValue as string] ?? 0
            const bScore = scoreMap[bValue as string] ?? 0

            return sortCustom(aScore, bScore, order)
          } else {
            return sortCustom(aValue, bValue, order)
          }
        }
      }

      return 0
    })
  }

  return {
    data: sortedData,
    total: sortedData.length,
    currentOffset: 0
  }
}
