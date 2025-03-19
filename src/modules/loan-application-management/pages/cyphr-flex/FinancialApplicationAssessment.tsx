import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { snakeCaseToText, toPercent } from "@/utils"
import { type FC, type PropsWithChildren } from "react"
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
        actionPlan={actionPlan}
        category={category}
        isLoading={isLoading}
      />
      <ApplicationScore
        category={category}
        isLoading={isLoading}
        ratingLevel={ratingLevel}
        score={score}
      />
    </MainLayout>
  )
}

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col flex-wrap gap-3 md:flex-row md:gap-6 lg:gap-10">
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
      "rounded-3xl border border-[#EAECF0] bg-[#F2F8F8] shadow-[0px_4px_12px_0px_#00000026] lg:rounded-[40px]",
      className
    )}
  >
    <div className="flex gap-2 border-b px-4 py-3 pb-2.5 font-semibold lg:px-8 lg:py-4 lg:pb-3.5">
      <span>
        <Icons.scoreLevel />
      </span>
      <span className="whitespace-nowrap">Loan Readiness Score</span>
    </div>
    <div className="flex flex-col gap-2 p-4 text-center lg:gap-4 lg:p-8">
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
        <span className="text-lg font-semibold uppercase lg:text-xl">
          {category
            ? snakeCaseToText(category.toLowerCase())
            : CRITERIA_NOT_AVAILABLE}
        </span>
        <span className="text-sm leading-6">{actionPlan}</span>
      </>
    )}
  </AssessmentLayout>
)

interface ApplicationScoreProps {
  score?: number
  ratingLevel?: string
  category?: string
  isLoading?: boolean
}

const ApplicationScore: FC<ApplicationScoreProps> = ({
  score,
  ratingLevel,
  category,
  isLoading
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <span className="text-lg font-semibold uppercase lg:text-xl">
        Your score
      </span>
      <span className="text-3xl font-semibold md:text-5xl lg:text-6xl">
        {toPercent(score ?? 0) / 100}%
      </span>
      <div className="my-0.5 flex flex-wrap justify-center gap-2">
        {!!ratingLevel && (
          <Badge
            className={cn(
              getCriteriaScoreRangeClassName(ratingLevel),
              "min-w-20 justify-center whitespace-nowrap border-0 bg-opacity-100 px-3 py-1.5 font-normal capitalize"
            )}
            variant="outline"
          >
            {snakeCaseToText(ratingLevel.toLowerCase())}
          </Badge>
        )}
        <Badge
          className="min-w-20 justify-center whitespace-nowrap bg-opacity-0 px-3 py-1.5 font-normal capitalize"
          variant="outline"
        >
          {category
            ? snakeCaseToText(category.toLowerCase())
            : CRITERIA_NOT_AVAILABLE}
        </Badge>
      </div>
    </div>
  )

  return (
    <AssessmentLayout className="flex-[1.5]">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="mt-2 h-20 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ) : (
        content
      )}
    </AssessmentLayout>
  )
}
