import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import {
  type IScoreFormValues,
  useScoreFormContext
} from "../../../providers/ScoreFormProvider"

interface IScoresProps {
  selectedScore: number
  setSelectedScore: (score: number) => void
  isScored?: boolean
}

function Scores({ selectedScore, setSelectedScore, isScored }: IScoresProps) {
  return (
    // Multiple peers work in reverse order
    // So i using flex-row-reverse to reverse the order again
    <div className="flex flex-row-reverse">
      {Array(5)
        .fill(null)
        .map((_, score) => (
          <Button
            key={5 - score}
            className={cn(
              // If the current score is hover, fill the color
              !isScored && "[&>.score-rocket-icon>path]:hover:fill-inherit",
              // If the current score is fill, fill all the previous score
              !isScored &&
                "peer [&>.score-rocket-icon>path]:peer-hover:fill-inherit",
              // If the scored true, fill the color
              "[&>.score-rocket-icon>path]:data-[scored=true]:fill-inherit",
              // Init state
              "[&>.score-rocket-icon>path]:fill-transparent",
              "h-auto p-0.5 mx-0.5"
            )}
            variant="ghost"
            onClick={() => setSelectedScore(5 - score)}
            type="button"
            // reverse score to normal order by using '5 - score'
            data-scored={selectedScore >= 5 - score}
          >
            <Icons.rocket className="score-rocket-icon" />
          </Button>
        ))}
    </div>
  )
}

export function ScoreCardForm() {
  const form = useScoreFormContext()
  const isScored = form.watch("isScored")

  const handleSelectedScore =
    (key: keyof IScoreFormValues) => (selectedScore: number) => {
      if (isScored) return

      const oldScore = form.getValues(key)
      const isUnselect = oldScore == selectedScore
      const finalSelectedScore = isUnselect ? 0 : selectedScore

      form.setValue(key, finalSelectedScore, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true
      })
    }

  const SCORE_TO_SUBMIT: {
    target: string
    selectedScore: number
    key: keyof IScoreFormValues
  }[] = [
    {
      target: "PRODUCT OR SERVICE",
      selectedScore: form.watch("productOrService"),
      key: "productOrService"
    },
    {
      target: "MARKET OPPORTUNITY",
      selectedScore: form.watch("marketOpportunity"),
      key: "marketOpportunity"
    },
    {
      target: "BUSINESS MODEL",
      selectedScore: form.watch("businessModel"),
      key: "businessModel"
    },
    {
      target: "EXECUTION",
      selectedScore: form.watch("execution"),
      key: "execution"
    },
    {
      target: "LAUNCHKC FIT",
      selectedScore: form.watch("launchKcfit"),
      key: "launchKcfit"
    }
  ]

  return (
    <div className="flex flex-col gap-2 mt-4">
      {SCORE_TO_SUBMIT.map((field) => (
        <div key={field.key} className="flex items-center justify-between">
          <span className="font-semibold text-text-tertiary text-xs">
            {field.target}
          </span>
          <Scores
            isScored={isScored}
            selectedScore={field.selectedScore}
            setSelectedScore={handleSelectedScore(field.key)}
          />
        </div>
      ))}
    </div>
  )
}
