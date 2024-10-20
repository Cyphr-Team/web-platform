import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import { CircularProgress } from "@/components/ui/circular-progress.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { cn } from "@/lib/utils.ts"
import {
  INPUT_GROUP,
  type STEP
} from "@/modules/conference-demo/applicant/constants"
import {
  useProgress,
  useProgressSteps
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import groupBy from "lodash.groupby"
import { Check } from "lucide-react"
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

function Sidebar() {
  const currentStep = useProgress.use.currentStep()
  const steps = useProgressSteps()
  const stepDetail = useMemo(() => {
    const step = steps.find(([step]) => step === currentStep)

    if (!step) return
    const [, stepDetail] = step

    return stepDetail
  }, [currentStep, steps])
  const groups = useMemo(() => {
    return groupBy(
      steps.map(([step, stepDetail]) => ({
        key: step as STEP,
        detail: stepDetail
      })),
      (step) => {
        return step.detail.group
      }
    )
  }, [steps])

  const [accordionValue, setAccordionValue] = useState<INPUT_GROUP[]>([
    INPUT_GROUP.APPLICATION
  ])

  const handleSetAccordion = useCallback(
    (opens: string[]) => {
      setAccordionValue(opens as INPUT_GROUP[])
    },
    [setAccordionValue]
  )

  /**
   * Listen the step change, if the next step is inside next parent, toggle down the parent
   */
  useEffect(() => {
    setAccordionValue((preOpens) =>
      !stepDetail?.group || preOpens.includes(stepDetail.group)
        ? preOpens
        : [...preOpens, stepDetail.group]
    )
  }, [stepDetail?.group])

  return (
    <div className="px-xl flex-col flex-1 md:flex overflow-y-scroll pb-4 max-h-[50vh] md:max-h-full">
      <Accordion
        className="w-full flex flex-col gap-2"
        type="multiple"
        value={accordionValue}
        onValueChange={handleSetAccordion}
      >
        {/* Iterate over group */}
        {Object.keys(groups).map(
          (group) =>
            !!groups[group].length && (
              <CollapsibleItem key={group} label={group as INPUT_GROUP}>
                {/* Map each item to component */}
                {groups[group].map((step) => (
                  <FormTabItem key={step.key} step={step.key} />
                ))}
              </CollapsibleItem>
            )
        )}
      </Accordion>
    </div>
  )
}

export default memo(Sidebar)

interface CollapsibleItemProps extends PropsWithChildren {
  label: INPUT_GROUP
}

function CollapsibleItem({ label, children }: CollapsibleItemProps) {
  const progressDetail = useProgress.use.progressDetail()

  const grouped = Object.values(progressDetail).filter(
    (value) => value.group === label
  )

  const completed = grouped.filter((value) => value.isFinish).length
  const overall = grouped.length

  return (
    <AccordionItem
      className="w-full bg-white rounded-lg shadow-md"
      value={label}
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

function FormTabItem({ step }: { step: STEP }) {
  const currentScreen = useProgress.use.currentStep()
  const progressDetail = useProgress.use.progressDetail()

  const { goToStep } = useProgress.use.action()

  const active = currentScreen === step

  const finished = progressDetail[step].isFinish

  const handleChangeStep = () => {
    if (!active) {
      goToStep(step)
    }
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 gap-3 rounded cursor-pointer",
        active && "bg-nav-active"
      )}
      id={`step-${step}`}
      onClick={handleChangeStep}
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
      {step}
    </li>
  )
}
