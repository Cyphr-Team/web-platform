import { RatingLevel } from "@/modules/assessment/interface/Rating/type"
import { type ApplicationCriteriaResponse } from "@/modules/loan-application/constants/type"
import { type Option } from "@/types/common.type"
import { type SortingFnOption } from "@tanstack/react-table"

const CRITERIA_NOT_READY_STATUS = "not_ready"
const CRITERIA_NOT_AVAILABLE = "Not available"

const RATING_LEVELS: Option[] = [
  {
    label: "Poor",
    value: RatingLevel.POOR
  },
  {
    label: "Fair",
    value: RatingLevel.FAIR
  },
  {
    label: "Good",
    value: RatingLevel.GOOD
  },
  {
    label: "Very Good",
    value: RatingLevel.VERY_GOOD
  },
  {
    label: "Excellent",
    value: RatingLevel.EXCELLENT
  }
]

const getCriteriaScoreRangeClassName = (scoreRange: string) => {
  switch (scoreRange.toLowerCase()) {
    case RatingLevel.POOR:
      return "bg-[#E5B0A4] border-[#E5B0A4]"
    case RatingLevel.FAIR:
      return "bg-[#F2DF9D] border-[#F2DF9D]"
    case RatingLevel.GOOD:
      return "bg-[#9FD3F0] border-[#9FD3F0]"
    case RatingLevel.VERY_GOOD:
      return "bg-[#A9E3D1] border-[#A9E3D1]"
    case RatingLevel.EXCELLENT:
      return "bg-[#85CF85] border-[#85CF85]"
    default:
      return ""
  }
}

const getScoreByRatingLevel = (ratingLevel?: string) => {
  switch (ratingLevel) {
    case RatingLevel.EXCELLENT:
      return 5
    case RatingLevel.VERY_GOOD:
      return 4
    case RatingLevel.GOOD:
      return 3
    case RatingLevel.FAIR:
      return 2
    case RatingLevel.POOR:
      return 1
    default:
      return 0
  }
}

const customSortRatingLevel: SortingFnOption<ApplicationCriteriaResponse> = (
  rowA,
  rowB
) => {
  return (
    getScoreByRatingLevel(rowA.original?.ratingLevel) -
    getScoreByRatingLevel(rowB.original?.ratingLevel)
  )
}

export {
  CRITERIA_NOT_AVAILABLE,
  CRITERIA_NOT_READY_STATUS,
  customSortRatingLevel,
  getCriteriaScoreRangeClassName,
  RATING_LEVELS
}
