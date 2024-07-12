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
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { ScorecardStatusBadge } from "../atoms/ScorecardStatusBadge"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ToolTipJudgeAvatar } from "../atoms/JudgeAvatar"

interface IScorecardStatusBadgeProps {
  numberOfJudge: number
  numberOfScoredJudge: number
}

interface Nudge {
  avatar?: string
  name: string
  email: string
}

export const NudgeJudgesPopover = ({
  numberOfJudge,
  numberOfScoredJudge
}: IScorecardStatusBadgeProps) => {
  const [open, setOpen] = useState(false)
  const mock = {
    active: [
      {
        name: "John Doe",
        email: "john@gmail.com"
      },
      {
        name: "Beck Smith",
        email: "beck@gmail.com"
      },
      {
        name: "Annie Andrew",
        email: "annie@gmail.com"
      },
      {
        name: "Jane Doe",
        email: "jane@gmail.com"
      }
    ],
    nudgeJudges: [
      {
        name: "John Doe",
        email: "john@gmail.com"
      },
      {
        name: "Beck Smith",
        email: "beck@gmail.com"
      }
    ],
    completedScorecard: [
      {
        name: "Annie Andrew",
        email: "annie@gmail.com"
      },
      {
        name: "Jane Doe",
        email: "jane@gmail.com"
      }
    ]
  }
  const NudgeIcon = Icons.nudge
  const generateListNudge = (
    list: Nudge[],
    isActive: boolean,
    isCompleted: boolean
  ) => {
    return list.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center space-x-1 h-10 cursor-pointer hover:bg-gray-100 px-2 rounded-lg"
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
      </div>
    ))
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent">
            <ScorecardStatusBadge
              numberOfJudge={numberOfJudge}
              numberOfScoredJudge={numberOfScoredJudge}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 rounded-lg" side="bottom" align="start">
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
                {generateListNudge(mock.active, true, false)}
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
                {generateListNudge(mock.nudgeJudges, false, false)}
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
                {generateListNudge(mock.completedScorecard, false, true)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </PopoverContent>
      </Popover>
    </div>
  )
}
