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
    <div className="max-h-[50vh] flex-1 flex-col overflow-y-scroll px-xl pb-4 md:flex md:max-h-full">
      <Accordion
        className="flex w-full flex-col gap-2"
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
      className="w-full rounded-lg bg-white shadow-md"
      value={label}
    >
      <AccordionTrigger
        className="w-full flex-row-reverse px-4 py-2"
        id={`parent-step-${label.toLowerCase()}`}
      >
        <div className="ml-3 flex flex-1 items-center justify-between font-semibold">
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
        <ul className="flex flex-col gap-1 px-2 py-4">
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
        "flex cursor-pointer items-center gap-3 rounded p-2 text-base",
        active && "bg-nav-active"
      )}
      id={`step-${step}`}
      onClick={handleChangeStep}
    >
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md border bg-white",
          active && "ring-4 ring-stone-400/[.14]",
          finished && "border-0 bg-primary"
        )}
      >
        <Check className={cn("w-5 text-white", !finished && "hidden")} />
      </div>
      {step}
    </li>
  )
}
