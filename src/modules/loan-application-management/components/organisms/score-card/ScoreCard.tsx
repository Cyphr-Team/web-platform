import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import {
  type IScoreFormValues,
  useScoreFormProvider
} from "../../../providers/ScoreFormProvider"
import { ScoreCardForm } from "../../molecules/score-card/ScoreCardForm"
import { ScoreCardInfo } from "../../molecules/score-card/ScoreCardInfo"
import { ScoreCardRubric } from "../../molecules/score-card/ScoreCardRubric"
import { useSubmitScore } from "../../../hooks/useMutation/useSubmitScore"
import { useParams } from "react-router-dom"
import { roundToOneDecimalPlace } from "@/utils"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput.tsx"

export function ScoreCard() {
  const { id: applicationId } = useParams()
  const form = useScoreFormProvider()

  const applicationStage = form.getValues("applicationCaptureStage")

  const submitScore = useSubmitScore({
    applicationId: applicationId
  })

  const isScored = form.watch("isScored")

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
    <Card className="top-0 z-10 mb-4 h-fit max-h-full shrink-0">
      <Form {...form}>
        <form className="flex flex-col" onSubmit={formSubmit}>
          <CardHeader className="px-0 !pb-0 md:px-0">
            <CardTitle className="px-4 text-lg font-semibold tracking-wide">
              <div>Scorecard</div>
            </CardTitle>
          </CardHeader>

          <CardContent className="w-full !p-4 !pt-0 lg:w-[400px]">
            <div>
              <ScoreCardInfo
                name="Total Score"
                score={avgScore}
                stage={applicationStage}
              />
            </div>

            <Accordion
              defaultValue={[
                "card-rubric",
                "scored-card",
                "feedback-card-form"
              ]}
              type="multiple"
            >
              <AccordionItem
                key="card-rubric"
                className="border-b-0"
                value="card-rubric"
              >
                <AccordionTrigger
                  className={cn(
                    "w-full justify-between border-b pb-0.5 text-left text-base font-medium hover:no-underline [&>.lucide-chevron-down]:w-5"
                  )}
                >
                  Scorecard Rubric
                </AccordionTrigger>

                <AccordionContent>
                  <ScoreCardRubric />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                key="scored-card"
                className="border-b-0"
                value="scored-card"
              >
                <AccordionTrigger
                  className={cn(
                    "w-full justify-between pb-0.5 text-left text-base font-medium hover:no-underline data-[state=open]:border-b [&>.lucide-chevron-down]:w-5"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
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
                      <Icons.rocket className="ml-1 w-4" />
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mt-4 text-xs text-text-tertiary">
                    Please click on each rocket to choose your score. You can
                    deselect a rocket by clicking on it again.
                  </div>
                  <ScoreCardForm />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                key="feedback-card-form"
                className="border-b-0"
                value="feedback-card-form"
              >
                <AccordionTrigger
                  className={cn(
                    "w-full justify-between border-b pb-0.5 text-left text-base font-medium hover:no-underline [&>.lucide-chevron-down]:w-5"
                  )}
                >
                  Feedback to applicant
                </AccordionTrigger>
                <AccordionContent>
                  {/* Render comment if this application is scored, else render text input */}
                  {isScored ? (
                    <div className="mt-4 text-xs text-text-tertiary">
                      {form.watch("comment")}
                    </div>
                  ) : null}
                  {/* If not scored, render input */}
                  {!isScored && (
                    <>
                      <div className="mt-4 text-xs text-text-tertiary">
                        Please provide your feedback on the applicant’s
                        application. Note this feedback will be shared with the
                        applicant to help them understand their strengths and
                        areas of improvement.
                      </div>
                      <TextAreaInput
                        className="p-2"
                        control={form.control}
                        inputClassName="placeholder:text-sm focus-within:shadow-lg"
                        label=""
                        name="comment"
                        placeholder="Leave feedback..."
                      />
                    </>
                  )}

                  <div className="mt-4 flex flex-col">
                    {!isScored && (
                      <>
                        <ButtonLoading
                          className="self-end"
                          disabled={!form.formState.isDirty}
                          isLoading={submitScore.isPending}
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
