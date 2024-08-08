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
import {
  ILaunchKCApplicationAssignScore,
  IScoreInfo
} from "@/types/application/application-assign.type"
import { useSendNudge } from "../../hooks/useMutation/useSendNudge"

interface IScorecardStatusBadgeProps {
  assignedJudges: IScoreInfo<ILaunchKCApplicationAssignScore>[]
  completedScorecardJudges: IScoreInfo<ILaunchKCApplicationAssignScore>[]
  applicationId: string
}

interface INudgeJudges {
  id: string
  avatar: string | undefined
  name: string
  email: string
}

const NudgeIcon = Icons.nudge

export const NudgeJudgesPopover = ({
  assignedJudges,
  completedScorecardJudges,
  applicationId
}: IScorecardStatusBadgeProps) => {
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
        key={index}
        className="flex w-full justify-between bg-transparent text-black items-center space-x-1 h-10 cursor-pointer hover:bg-gray-100 px-2 rounded-lg disabled:bg-transparent"
        disabled={isPending || isActive || isCompleted}
        onClick={handleSendNudge(item)}
      >
        <div className="flex items-center space-x-2 ">
          <ToolTipJudgeAvatar
            key={index}
            avatar={item?.avatar}
            name={item?.name}
            email={item?.email}
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
        <PopoverContent className="p-1 rounded-lg" side="bottom" align="start">
          {isPending && (
            <Loader2
              className={cn(
                "top-1/2 left-1/2 absolute transition-all ease-out animate-spin text-gray-300"
              )}
            />
          )}
          <Accordion
            type="multiple"
            className="w-full px-3"
            defaultValue={["nudge-judges", "completed-scorecard"]}
          >
            <AccordionItem value="active-nudges" className="border-none">
              <AccordionTrigger
                openIcon={<ChevronRightIcon className="w-4 h-4" />}
                closeIcon={<ChevronDownIcon className="w-4 h-4" />}
                className="text-xs font-semibold py-2"
              >
                Active Nudges
              </AccordionTrigger>
              <AccordionContent className="pb-0 px-0">
                {generateListNudge(activeNudgesInfo, true, false)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nudge-judges" className="border-none">
              <AccordionTrigger
                openIcon={<ChevronRightIcon className="w-4 h-4" />}
                closeIcon={<ChevronDownIcon className="w-4 h-4" />}
                className="text-xs font-semibold  py-2"
              >
                Nudge Judges
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {generateListNudge(nudgeJudgesInfo, false, false)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="completed-scorecard" className="border-none">
              <AccordionTrigger
                openIcon={<ChevronRightIcon className="w-4 h-4" />}
                closeIcon={<ChevronDownIcon className="w-4 h-4" />}
                className="text-xs font-semibold py-2"
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
