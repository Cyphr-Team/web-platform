import { RatingLevel } from "@/modules/assessment/interface/Rating/type"
import { ApplicationCriteriaResponse } from "@/modules/loan-application/constants/type"
import { Option } from "@/types/common.type"
import { SortingFnOption } from "@tanstack/react-table"

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
      return "bg-[#E66262]"
    case RatingLevel.FAIR:
      return "bg-[#ECA336]"
    case RatingLevel.GOOD:
      return "bg-[#EBE446]"
    case RatingLevel.VERY_GOOD:
      return "bg-[#95DE7C]"
    case RatingLevel.EXCELLENT:
      return "bg-[#00C605]"
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
  }
  return 0
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
