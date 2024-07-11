import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { ButtonLoading } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import {
  IScoreFormValues,
  useScoreFormProvider
} from "../../providers/ScoreFormProvider"
import { ScoreCardForm } from "../molecules/ScoreCardForm"
import { ScoreCardInfo } from "../molecules/ScoreCardInfo"
import { ScoreCardRubric } from "../molecules/ScoreCardRubric"
import { useSubmitScore } from "../../hooks/useMutation/useSubmitScore"
import { useParams } from "react-router-dom"
import { roundToOneDecimalPlace } from "@/utils"

export const ScoreCard = () => {
  const { id: applicationId } = useParams()
  const form = useScoreFormProvider()

  const applicationStage = form.getValues("applicationCaptureStage")

  const submitScore = useSubmitScore({
    applicationId: applicationId
  })

  const formSubmit = form.handleSubmit((data: IScoreFormValues) => {
    submitScore.mutate(data)
  })

  const LAUNCH_KC_TARGET_SCORES: (keyof IScoreFormValues)[] = [
    "productOrService",
    "marketOpportunity",
    "businessModel",
    "execution",
    "launchKcfit"
  ]

  // Round with one decimal
  const avgScore = roundToOneDecimalPlace(
    LAUNCH_KC_TARGET_SCORES.reduce((totalScore, targetScore) => {
      const score = form.getValues(targetScore)

      if (typeof score != "number") return totalScore

      return totalScore + score
    }, 0) / LAUNCH_KC_TARGET_SCORES.length
  )

  return (
    <Card className="h-fit max-h-full top-0 z-10 mb-4 flex-shrink-0">
      <Form {...form}>
        <form onSubmit={formSubmit} className="flex flex-col">
          <CardHeader className="!pb-0 px-0 md:px-0">
            <CardTitle className="font-semibold text-lg px-4 tracking-wide">
              <div>Scorecard</div>
            </CardTitle>
          </CardHeader>

          <CardContent className="w-full lg:w-[400px] !p-4 !pt-0">
            <div>
              <ScoreCardInfo
                name="Total Score"
                score={avgScore}
                stage={applicationStage}
              />
            </div>

            <Accordion
              type="multiple"
              defaultValue={["card-rubric", "scored-card"]}
            >
              <AccordionItem
                value="card-rubric"
                key="card-rubric"
                className="border-b-0"
              >
                <AccordionTrigger
                  className={cn(
                    "justify-between w-full hover:no-underline text-base font-medium text-left border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
                  )}
                >
                  Scorecard Rubric
                </AccordionTrigger>

                <AccordionContent>
                  <ScoreCardRubric />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="scored-card"
                key="scored-card"
                className="border-b-0"
              >
                <AccordionTrigger
                  className={cn(
                    "justify-between w-full hover:no-underline text-base font-medium text-left data-[state=open]:border-b pb-0.5 [&>.lucide-chevron-down]:w-5"
                  )}
                >
                  <div className="w-full flex justify-between items-center">
                    <span>Scorecard</span>

                    <span
                      className={cn(
                        "flex items-center text-xs font-semibold",
                        avgScore == 0 && "text-gray-200"
                      )}
                    >
                      <span>
                        {avgScore}
                        <span className="text-black">/5</span>
                      </span>
                      <Icons.rocket className="w-4 ml-1" />
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mt-4 text-xs text-text-tertiary">
                    Please click on each rocket to choose your score. You can
                    deselect a rocket by clicking on it again.
                  </div>
                  <ScoreCardForm />

                  <div className="flex flex-col mt-4">
                    {!form.watch("isScored") && (
                      <>
                        <ButtonLoading
                          className="self-end"
                          isLoading={submitScore.isPending}
                          disabled={!form.formState.isDirty}
                          type="submit"
                        >
                          Submit
                        </ButtonLoading>

                        <div className="mt-4 text-xs text-text-tertiary">
                          Please note once you hit submit you’ll no longer be
                          able to make changes to your scorecard.
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
