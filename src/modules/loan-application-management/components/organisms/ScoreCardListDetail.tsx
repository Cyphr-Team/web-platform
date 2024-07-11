import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { ScoreCardBox } from "../atoms/ScoreCardBox"
import { LoanApplicationStatus } from "@/types/loan-application.type"

import { useQueryScoreApplicationDetails } from "../../hooks/useQuery/useQueryScoreApplicationDetails"
import { useParams } from "react-router-dom"
import {
  calculateAvgScorePerRound,
  calculateTotalScore
} from "@/utils/score.utils"
import { ScoreCardListDetailByJudge } from "./ScoreCardListDetailByJudge"
import { StatusRoundBadge } from "../atoms/StatusRoundBadge"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"

// TODO: Integrate API to get current status for an application

export const ScoreCardListDetail = () => {
  const params = useParams()
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
  const totalScore = calculateTotalScore(avgScoreRound1, avgScoreRound2)

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
          <span className="text-xs">Application round</span>
          <StatusRoundBadge round={(statusData ?? "") as LoanApplicationStatus}>
            {capitalizeWords(snakeCaseToText(statusData ?? ""))}
          </StatusRoundBadge>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["scored-card-round-1", "scored-card-round-2"]}
        >
          {/* ROUND 2 */}
          {avgScoreRound2 > 0 && (
            <AccordionItem
              value="scored-card-round-2"
              key="scored-card-round-2"
              className="border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "justify-between w-full hover:no-underline text-base font-medium text-left data-[state=open]:border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
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
                    data &&
                    data.scores
                      .find(
                        (item) =>
                          item.stage ===
                          LoanApplicationStatus.ROUND_2.toLowerCase()
                      )
                      ?.scoreInfo.map((item, index) => (
                        <ScoreCardListDetailByJudge
                          key={`${LoanApplicationStatus.ROUND_2}_${index}_${item.judgeName}`}
                          id={`${LoanApplicationStatus.ROUND_2}_${index}_${item.judgeName}`}
                          name={item.judgeName}
                          scoreData={item.score}
                        />
                      ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ROUND 1 */}
          {avgScoreRound1 > 0 && (
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
                    data &&
                    data.scores
                      .find(
                        (item) =>
                          item.stage ===
                          LoanApplicationStatus.ROUND_1.toLowerCase()
                      )
                      ?.scoreInfo.map((item, index) => (
                        <ScoreCardListDetailByJudge
                          key={`${LoanApplicationStatus.ROUND_1}_${index}_${item.judgeName}`}
                          id={`${LoanApplicationStatus.ROUND_1}_${index}_${item.judgeName}`}
                          name={item.judgeName}
                          scoreData={item.score}
                        />
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
