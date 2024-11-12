import { Icons } from "@/components/ui/icons"
import {
  SCORE_SYSTEMS,
  SCORE_SYSTEMS_EXPLAINS
} from "../../../constants/launchkc/scoreSystem"

export function ScoreCardRubric() {
  return (
    <div className="mt-4">
      <div className="mb-2 font-medium">Overall Scoring</div>

      <ul className="flex flex-col gap-3">
        {SCORE_SYSTEMS.map((score) => (
          <li
            key={score.describe}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="flex items-center gap-2">
              {score.rangeScore} <Icons.rocket className="w-4" />
            </span>
            <span className="font-semibold">{score.describe}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-col gap-3 text-xs">
        {SCORE_SYSTEMS_EXPLAINS.map((scoreExplain) => (
          <li key={scoreExplain.target}>
            <span className="block font-semibold uppercase">
              {scoreExplain.target}
            </span>
            <span className="text-text-tertiary">{scoreExplain.describe}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
