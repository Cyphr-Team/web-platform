import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { ScoreCardBox } from "../atoms/ScoreCardBox"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import {
  calculateAvgScorePerRound,
  calculateTotalScore
} from "@/utils/score.utils"
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"
import { useQueryScoreApplicationDetails } from "../../hooks/useQuery/useQueryScoreApplicationDetails"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"
import { ScoreCardListDetailByJudge } from "./ScoreCardListDetailByJudge"
import {
  isAbleToViewScoreRound1,
  isAbleToViewScoreRound2
} from "../../services/status.service"

export const ScoreCardListDetail = () => {
  const params = useParams()

  const LIST_FILTER_STATUS = [
    LoanApplicationStatus.ROUND_1.toLowerCase(),
    LoanApplicationStatus.ROUND_2.toLowerCase()
  ]

  const [selectedFilterStatus, setSelectedFilterStatus] =
    useState<LoanApplicationStatus>()

  // Get Application Detail
  const { data, isFetching } = useQueryScoreApplicationDetails({
    applicationId: params.id!
  })

  // Get Application Status
  const { data: statusData } = useQueryGetLoanApplicationDetailStatus({
    applicationId: params.id!
  })

  const avgScoreRound1 = calculateAvgScorePerRound(
    data,
    LoanApplicationStatus.ROUND_1
  )

  const avgScoreRound2 = calculateAvgScorePerRound(
    data,
    LoanApplicationStatus.ROUND_2
  )

  const scoresRound1 =
    data?.scores?.find(
      (item) => item.stage === LoanApplicationStatus.ROUND_2.toLowerCase()
    )?.scoreInfo || []

  const scoreRound2 =
    data?.scores?.find(
      (item) => item.stage === LoanApplicationStatus.ROUND_1.toLowerCase()
    )?.scoreInfo || []

  const totalScore = calculateTotalScore(avgScoreRound1, avgScoreRound2)

  const isSelectedRound1 =
    selectedFilterStatus?.toUpperCase() == LoanApplicationStatus.ROUND_1

  const isSelectedRound2 =
    selectedFilterStatus?.toUpperCase() == LoanApplicationStatus.ROUND_2

  const ableToViewRound1 =
    (!selectedFilterStatus && isAbleToViewScoreRound1(statusData)) ||
    isSelectedRound1

  const ableToViewRound2 =
    (!selectedFilterStatus && isAbleToViewScoreRound2(statusData)) ||
    isSelectedRound2

  return (
    <Card className="h-fit max-h-full top-0 z-10 mb-4 flex-shrink-0 mt-6 lg:mt-0">
      <CardHeader className="!pb-0 px-0 md:px-0">
        <CardTitle className="font-semibold text-lg px-4 tracking-wide">
          <div>Scorecard</div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full lg:w-[400px] !p-4 !pt-0">
        <div className="flex justify-between items-stretch space-x-2">
          <ScoreCardBox
            name="Total score"
            score={totalScore}
            multiple={true}
            hasBorder={true}
          />
          <ScoreCardBox
            name="Round 2"
            score={avgScoreRound2}
            multiple={true}
            hasBorder={true}
          />
          <ScoreCardBox
            name="Round 1"
            score={avgScoreRound1}
            multiple={true}
            hasBorder={true}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-tertiary">Application Round</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-auto h-auto p-1 rounded-full"
              >
                <StatusRoundBadge
                  round={
                    (selectedFilterStatus ??
                      statusData ??
                      "") as LoanApplicationStatus
                  }
                >
                  {capitalizeWords(
                    snakeCaseToText(selectedFilterStatus ?? statusData ?? "")
                  )}
                </StatusRoundBadge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel className="text-xs">
                Toggle filter by stage
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedFilterStatus}
                onValueChange={(value) => {
                  setSelectedFilterStatus((preState) =>
                    preState === value
                      ? undefined
                      : (value as LoanApplicationStatus)
                  )
                }}
              >
                {LIST_FILTER_STATUS.map((filterStatus) => (
                  <DropdownMenuRadioItem
                    value={filterStatus}
                    className="cursor-pointer"
                  >
                    <StatusRoundBadge
                      round={(filterStatus ?? "") as LoanApplicationStatus}
                    >
                      {capitalizeWords(snakeCaseToText(filterStatus ?? ""))}
                    </StatusRoundBadge>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["scored-card-round-1", "scored-card-round-2"]}
        >
          {ableToViewRound2 && (
            <AccordionItem
              value="scored-card-round-2"
              key="scored-card-round-2"
              className="border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "justify-between w-full hover:no-underline text-base font-medium text-left border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
                )}
              >
                <div className="w-full flex justify-between items-center">
                  <span>Round 2 Total Score</span>

                  <span
                    className={cn(
                      "flex items-center text-xs font-semibold",
                      avgScoreRound2 == 0 && "text-gray-200"
                    )}
                  >
                    <span>
                      {avgScoreRound2}
                      <span className="text-black">/5</span>
                    </span>
                    <Icons.rocket className="w-4 ml-1" />
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <Accordion type="multiple">
                  {!isFetching &&
                    (scoresRound1.length > 0 ? (
                      scoresRound1.map((item, index) => (
                        <ScoreCardListDetailByJudge
                          key={`${LoanApplicationStatus.ROUND_2}_${index}_${item.judgeName}`}
                          id={`${LoanApplicationStatus.ROUND_2}_${index}_${item.judgeName}`}
                          name={item.judgeName}
                          scoreData={item.score}
                        />
                      ))
                    ) : (
                      <div className="mt-2 text-xs text-text-tertiary">
                        No judge has been assigned for this loan application.
                      </div>
                    ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          )}

          {ableToViewRound1 && (
            <AccordionItem
              value="scored-card-round-1"
              key="scored-card-round-1"
              className="border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "justify-between w-full hover:no-underline text-base font-medium text-left data-[state=open]:border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
                )}
              >
                <div className="w-full flex justify-between items-center">
                  <span>Round 1 Total Score</span>

                  <span
                    className={cn(
                      "flex items-center text-xs font-semibold",
                      avgScoreRound1 == 0 && "text-gray-200"
                    )}
                  >
                    <span>
                      {avgScoreRound1}
                      <span className="text-black">/5</span>
                    </span>
                    <Icons.rocket className="w-4 ml-1" />
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <Accordion type="multiple">
                  {!isFetching &&
                    (scoreRound2?.length > 0 ? (
                      scoreRound2.map((item, index) => (
                        <ScoreCardListDetailByJudge
                          key={`${LoanApplicationStatus.ROUND_1}_${index}_${item.judgeName}`}
                          id={`${LoanApplicationStatus.ROUND_1}_${index}_${item.judgeName}`}
                          name={item.judgeName}
                          scoreData={item.score}
                        />
                      ))
                    ) : (
                      <div className="mt-2 text-xs text-text-tertiary">
                        No judge has been assigned for this loan application.
                      </div>
                    ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}
