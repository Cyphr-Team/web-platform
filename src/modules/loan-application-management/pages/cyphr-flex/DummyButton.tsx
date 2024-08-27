import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { FC } from "react"
import { RATING_LEVELS } from "../../services/loan-readiness.service"
import { useLoanReadinessStore } from "./store/useLoanReadinessStore"

interface DummyButtonProps {
  handleRefetch: VoidFunction
}
export const DummyButton: FC<DummyButtonProps> = ({ handleRefetch }) => {
  const dummyLevel = useLoanReadinessStore.use.dummyLevel()
  const { setDummyLevel } = useLoanReadinessStore.use.action()

  return (
    <div className="flex gap-2">
      <Button onClick={handleRefetch}>Refresh</Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Level</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Specific Level</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={dummyLevel}
            onValueChange={setDummyLevel}
          >
            {RATING_LEVELS.map((level) => (
              <DropdownMenuRadioItem value={level.value} key={level.value}>
                {level.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
