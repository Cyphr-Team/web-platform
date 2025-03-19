import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { ChevronDownIcon, ChevronRightIcon, Loader2 } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { ScorecardStatusBadge } from "../atoms/score/ScorecardStatusBadge"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ToolTipJudgeAvatar } from "../atoms/JudgeAvatar"
import { useQueryGetActiveNudges } from "../../hooks/useQuery/useQueryGetActiveNudges"
import { type IScoreInfo } from "@/types/application/application-assign.type"
import { useSendNudge } from "../../hooks/useMutation/useSendNudge"

interface IScorecardStatusBadgeProps {
  assignedJudges: IScoreInfo[]
  completedScorecardJudges: IScoreInfo[]
  applicationId: string
}

interface INudgeJudges {
  id: string
  avatar: string | undefined
  name: string
  email: string
}

const NudgeIcon = Icons.nudge

export function NudgeJudgesPopover({
  assignedJudges,
  completedScorecardJudges,
  applicationId
}: IScorecardStatusBadgeProps) {
  const [open, setOpen] = useState(false)

  const { data } = useQueryGetActiveNudges({ applicationId })
  const { mutate, isPending } = useSendNudge(applicationId)

  const handleSendNudge = (judge: INudgeJudges) => () => {
    mutate({
      applicationId: applicationId,
      judgeId: judge.id,
      email: judge.email
    })
  }

  // Map active nudges data
  const activeNudgesInfo =
    data?.users?.map((user) => ({
      id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email
    })) ?? []

  // Map completed scorecard judges data
  const completedScorecardJudgesInfo = completedScorecardJudges.map(
    (judge) => ({
      id: judge?.judgeId,
      avatar: judge?.judgeAvatar,
      name: judge?.judgeName,
      email: judge?.judgeEmail
    })
  )

  // Map nudge judges data (who are not in active nudges and completed scorecard)
  const nudgeJudgesInfo = assignedJudges
    .filter(
      (judge) =>
        !completedScorecardJudgesInfo.some(({ id }) => id === judge.judgeId) &&
        !activeNudgesInfo.some(({ id }) => id === judge.judgeId)
    )
    .map((judge) => ({
      id: judge.judgeId,
      avatar: judge.judgeAvatar,
      name: judge.judgeName,
      email: judge.judgeEmail
    }))

  const generateListNudge = (
    list: INudgeJudges[],
    isActive: boolean,
    isCompleted: boolean
  ) => {
    return list.map((item, index) => (
      <Button
        key={item.name}
        className="flex h-10 w-full cursor-pointer items-center justify-between space-x-1 rounded-lg bg-transparent px-2 text-black hover:bg-gray-100 disabled:bg-transparent"
        disabled={isPending || isActive || isCompleted}
        onClick={handleSendNudge(item)}
      >
        <div className="flex items-center space-x-2 ">
          <ToolTipJudgeAvatar
            key={index}
            avatar={item?.avatar}
            email={item?.email}
            name={item?.name}
          />
          <span className={cn("text-xs", isCompleted && "text-gray-300")}>
            {item.name}
          </span>
        </div>

        <NudgeIcon
          className={isActive || isCompleted ? "fill-gray-300" : "fill-black"}
        />
      </Button>
    ))
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent">
            <ScorecardStatusBadge
              numberOfJudge={assignedJudges.length}
              numberOfScoredJudge={completedScorecardJudges.length}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="rounded-lg p-1" side="bottom">
          {isPending ? (
            <Loader2
              className={cn(
                "absolute left-1/2 top-1/2 animate-spin text-gray-300 transition-all ease-out"
              )}
            />
          ) : null}
          <Accordion
            className="w-full px-3"
            defaultValue={["nudge-judges", "completed-scorecard"]}
            type="multiple"
          >
            <AccordionItem className="border-none" value="active-nudges">
              <AccordionTrigger
                className="py-2 text-xs font-semibold"
                closeIcon={<ChevronDownIcon className="size-4" />}
                openIcon={<ChevronRightIcon className="size-4" />}
              >
                Active Nudges
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                {generateListNudge(activeNudgesInfo, true, false)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-none" value="nudge-judges">
              <AccordionTrigger
                className="py-2 text-xs  font-semibold"
                closeIcon={<ChevronDownIcon className="size-4" />}
                openIcon={<ChevronRightIcon className="size-4" />}
              >
                Nudge Judges
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {generateListNudge(nudgeJudgesInfo, false, false)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-none" value="completed-scorecard">
              <AccordionTrigger
                className="py-2 text-xs font-semibold"
                closeIcon={<ChevronDownIcon className="size-4" />}
                openIcon={<ChevronRightIcon className="size-4" />}
              >
                Completed Scorecard
              </AccordionTrigger>
              <AccordionContent>
                {generateListNudge(completedScorecardJudgesInfo, false, true)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </PopoverContent>
      </Popover>
    </div>
  )
}
