import { Badge } from "@/components/ui/badge"
import { SkeletonCard } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { snakeCaseToText, toPercent } from "@/utils"
import { FC } from "react"
import {
  CRITERIA_NOT_AVAILABLE,
  getCriteriaScoreRangeClassName
} from "../../services/loan-readiness.service"
import { ApplicationCircularProgress } from "./ApplicationCircularProgress"

type ApplicationAssessmentProps = ApplicationFeedBackProps &
  ApplicationScoreProps

export const ApplicationAssessment: FC<ApplicationAssessmentProps> = ({
  isLoading,
  category,
  actionPlan,
  ratingLevel,
  score
}) => {
  return (
    <div className="flex gap-10">
      <ApplicationFeedBack
        isLoading={isLoading}
        category={category}
        actionPlan={actionPlan}
      />

      <ApplicationScore
        ratingLevel={ratingLevel}
        score={score}
        category={category}
      />
    </div>
  )
}

interface ApplicationFeedBackProps {
  isLoading: boolean
  category?: string
  actionPlan?: string
}
const ApplicationFeedBack: FC<ApplicationFeedBackProps> = ({
  isLoading,
  category,
  actionPlan
}) => {
  return (
    <div className="flex-[3] bg-[#F2F8F8] rounded-[40px] border border-black shadow-[8px_8px_12px_0px_#052B1540]">
      <div className="px-8 py-4 mt-6 border-b font-semibold">
        Loan Readiness Score
      </div>
      <div className="flex flex-col gap-4 text-center p-8">
        {isLoading ? (
          <SkeletonCard className="w-full" />
        ) : (
          <>
            <span className="text-4xl font-semibold capitalize">
              {category
                ? snakeCaseToText(category.toLowerCase())
                : CRITERIA_NOT_AVAILABLE}
            </span>
            <span>{actionPlan}</span>
          </>
        )}
      </div>
    </div>
  )
}

interface ApplicationScoreProps {
  score?: number
  ratingLevel?: string
  category?: string
}
const ApplicationScore: FC<ApplicationScoreProps> = ({
  score,
  ratingLevel,
  category
}) => {
  return (
    <div className="bg-[#002615] flex relative overflow-hidden flex-[5] p-8 rounded-[2.5rem] shadow-[8px_8px_12px_0px_#052B1540]">
      <div className="w-[70%] h-full -translate-y-3/4 absolute bg-[#B3F00D] left-1/2 -translate-x-1/2 rounded-full blur-[184px]" />
      <div className="text-white mt-auto flex flex-col gap-6">
        <span className="text-4xl font-semibold">Readiness</span>
        <span>
          Evaluates multiple criteria to assess loan approval readiness.
        </span>
      </div>

      <div className="ml-auto">
        <ApplicationCircularProgress
          percent={(score ?? 0) / 100}
          text={
            <div className="flex flex-col items-center justify-center gap-2 text-white">
              <span className="font-semibold text-6xl">
                {toPercent(score ?? 0) / 100}%
              </span>
              <div className="flex gap-2">
                {!!ratingLevel && (
                  <Badge
                    variant="outline"
                    className={cn(
                      getCriteriaScoreRangeClassName(ratingLevel),
                      "bg-opacity-100 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center"
                    )}
                  >
                    {snakeCaseToText(ratingLevel.toLowerCase())}
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className={cn(
                    "bg-opacity-0 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center text-white border-white"
                  )}
                >
                  {category
                    ? snakeCaseToText(category.toLowerCase())
                    : CRITERIA_NOT_AVAILABLE}
                </Badge>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
