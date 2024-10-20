import { Icons } from "@/components/ui/icons"
import {
  SCORE_SYSTEMS,
  SCORE_SYSTEMS_EXPLAINS
} from "../../../constants/launchkc/scoreSystem"

export function ScoreCardRubric() {
  return (
    <div className="mt-4">
      <div className="font-medium mb-2">Overall Scoring</div>

      <ul className="flex gap-3 flex-col">
        {SCORE_SYSTEMS.map((score) => (
          <li
            key={score.describe}
            className="flex gap-2 items-center justify-between text-xs"
          >
            <span className="flex gap-2 items-center">
              {score.rangeScore} <Icons.rocket className="w-4" />
            </span>
            <span className="font-semibold">{score.describe}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-col gap-3 text-xs">
        {SCORE_SYSTEMS_EXPLAINS.map((scoreExplain) => (
          <li key={scoreExplain.target}>
            <span className="uppercase block font-semibold">
              {scoreExplain.target}
            </span>
            <span className="text-text-tertiary">{scoreExplain.describe}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
