import { cn } from "@/lib/utils.ts"
import { FC, memo, PropsWithChildren, useCallback, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  getStepFromLabel,
  GROUPED_STEP_ITEM,
  INPUT_GROUP,
  STEP,
  StepStatus
} from "@/modules/conference-demo/applicant/constants"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { CircularProgress } from "@/components/ui/circular-progress.tsx"
import { Check } from "lucide-react"

interface Props {}

const Sidebar: FC<Props> = () => {
  const [accordionValue, setAccordionValue] = useState<INPUT_GROUP[]>([
    INPUT_GROUP.APPLICATION
  ])

  const handleSetAccordion = useCallback(
    (opens: string[]) => {
      setAccordionValue(opens as INPUT_GROUP[])
    },
    [setAccordionValue]
  )

  return (
    <div className="px-xl flex-col flex-1 md:flex overflow-y-scroll pb-4 max-h-[50vh] md:max-h-full">
      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-2"
        value={accordionValue}
        onValueChange={handleSetAccordion}
      >
        {/* Iterate over group */}
        {Object.keys(GROUPED_STEP_ITEM).map((section) => (
          <CollapsibleItem label={section as INPUT_GROUP} key={section}>
            {/* Map each item to component */}
            {GROUPED_STEP_ITEM[section as INPUT_GROUP].map((inner) => (
              <FormTabItem key={inner} label={inner as STEP} />
            ))}
          </CollapsibleItem>
        ))}
      </Accordion>
    </div>
  )
}

export default memo(Sidebar)

interface CollapsibleItemProps extends PropsWithChildren {
  label: INPUT_GROUP
}

const CollapsibleItem: FC<CollapsibleItemProps> = ({ label, children }) => {
  const progressDetail = useProgress.use.progressDetail()

  const grouped = Object.values(progressDetail).filter(
    (value) => value.group === label
  ) as StepStatus[]

  const completed = grouped.filter((value) => value.isFinish).length
  const overall = grouped.length

  return (
    <AccordionItem
      value={label}
      className="w-full bg-white rounded-lg shadow-md"
    >
      <AccordionTrigger
        className="flex-row-reverse w-full px-4 py-2"
        id={`parent-step-${label.toLowerCase()}`}
      >
        <div className="flex items-center justify-between flex-1 ml-3 font-semibold">
          <div>{label}</div>
          <div>
            <CircularProgress
              percent={completed / overall}
              text={`${completed}/${overall}`}
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Separator />
        <ul className="px-2 py-4 gap-1 flex flex-col">
          {/* Render each step in the loan application */}
          {children}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

const FormTabItem = ({ label }: { label: STEP }) => {
  const currentScreen = useProgress.use.currentStep()
  const progressDetail = useProgress.use.progressDetail()

  const { goToStep } = useProgress.use.action()

  const active = currentScreen === label

  const finished = progressDetail[getStepFromLabel(label)].isFinish

  const handleChangeStep = () => {
    if (!active) {
      goToStep(label)
    }
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer",
        active && "bg-nav-active"
      )}
      onClick={handleChangeStep}
      id={`step-${label}`}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-md bg-white flex justify-center items-center border flex-shrink-0",
          active && "ring-4 ring-stone-400/[.14]",
          finished && "bg-primary border-0"
        )}
      >
        <Check className={cn("w-5 text-white", !finished && "hidden")} />
      </div>
      {label}
    </li>
  )
}
