import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { SkeletonCard } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { snakeCaseToText, toPercent } from "@/utils"
import { FC, PropsWithChildren } from "react"
import {
  CRITERIA_NOT_AVAILABLE,
  getCriteriaScoreRangeClassName
} from "../../services/loan-readiness.service"

type FinancialApplicationAssessmentProps = ApplicationFeedBackProps &
  ApplicationScoreProps
export const FinancialApplicationAssessment: FC<
  FinancialApplicationAssessmentProps
> = ({ isLoading, category, actionPlan, ratingLevel, score }) => {
  return (
    <MainLayout>
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
    </MainLayout>
  )
}

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-10 flex-wrap">
    {children}
  </div>
)

interface AssessmentLayoutProps {
  className?: string
}

const AssessmentLayout: FC<PropsWithChildren<AssessmentLayoutProps>> = ({
  children,
  className
}) => (
  <div
    className={cn(
      "bg-[#F2F8F8] rounded-3xl lg:rounded-[40px] border border-[#EAECF0] shadow-[0px_4px_12px_0px_#00000026]",
      className
    )}
  >
    <div className="px-4 py-3 pb-2.5 lg:pb-3.5 lg:px-8 lg:py-4 border-b font-semibold flex gap-2">
      <span>{<Icons.scoreLevel />}</span>
      <span className="whitespace-nowrap">Loan Readiness Score</span>
    </div>
    <div className="flex flex-col gap-2 lg:gap-4 text-center p-4 lg:p-8">
      {children}
    </div>
  </div>
)

interface ApplicationFeedBackProps {
  isLoading: boolean
  category?: string
  actionPlan?: string
}

const ApplicationFeedBack: FC<ApplicationFeedBackProps> = ({
  isLoading,
  category,
  actionPlan
}) => (
  <AssessmentLayout className="flex-[2.25]">
    {isLoading ? (
      <SkeletonCard className="w-full" />
    ) : (
      <>
        <span className="text-lg lg:text-xl font-semibold uppercase">
          {category
            ? snakeCaseToText(category.toLowerCase())
            : CRITERIA_NOT_AVAILABLE}
        </span>
        <span className="text-sm">{actionPlan}</span>
      </>
    )}
  </AssessmentLayout>
)

interface ApplicationScoreProps {
  score?: number
  ratingLevel?: string
  category?: string
}

const ApplicationScore: FC<ApplicationScoreProps> = ({
  score,
  ratingLevel,
  category
}) => (
  <AssessmentLayout className="flex-[1.5]">
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <span className="text-lg lg:text-xl font-semibold uppercase">
        Your score
      </span>
      <span className="font-semibold text-3xl md:text-5xl lg:text-6xl">
        {toPercent(score ?? 0) / 100}%
      </span>
      <div className="flex gap-2 my-0.5 flex-wrap justify-center">
        {!!ratingLevel && (
          <Badge
            variant="outline"
            className={cn(
              getCriteriaScoreRangeClassName(ratingLevel),
              "bg-opacity-100 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center border-0"
            )}
          >
            {snakeCaseToText(ratingLevel.toLowerCase())}
          </Badge>
        )}
        <Badge
          variant="outline"
          className="bg-opacity-0 capitalize whitespace-nowrap font-normal py-1.5 px-3 min-w-20 justify-center"
        >
          {category
            ? snakeCaseToText(category.toLowerCase())
            : CRITERIA_NOT_AVAILABLE}
        </Badge>
      </div>
    </div>
  </AssessmentLayout>
)
