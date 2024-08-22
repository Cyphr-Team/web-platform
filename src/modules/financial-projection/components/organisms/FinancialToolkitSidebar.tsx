import { cn } from "@/lib/utils.ts"
import { FC, memo, PropsWithChildren, useCallback, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import {
  GROUPED_FINANCIAL_ITEM,
  INPUT_GROUP,
  SCREEN
} from "@/modules/financial-projection/constants"
import { Separator } from "@/components/ui/separator.tsx"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

interface Props {}

const FinancialToolkitSidebar: FC<Props> = () => {
  const [accordionValue, setAccordionValue] = useState<INPUT_GROUP[]>([
    INPUT_GROUP.REVENUE
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
        {Object.keys(GROUPED_FINANCIAL_ITEM).map((section) => (
          <CollapsibleItem label={section} key={section}>
            {GROUPED_FINANCIAL_ITEM[section as INPUT_GROUP].map((inner) => (
              <FormTabItem label={inner} />
            ))}
          </CollapsibleItem>
        ))}
      </Accordion>
    </div>
  )
}

export default memo(FinancialToolkitSidebar)

interface CollapsibleItemProps extends PropsWithChildren {
  label: string
}

const CollapsibleItem: FC<CollapsibleItemProps> = ({ label, children }) => {
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

const FormTabItem = ({ label }: { label: string }) => {
  const currentScreen = useFinancialToolkitStore.use.currentScreen()
  const { setCurrentScreen } = useFinancialToolkitStore.use.action()

  const active = currentScreen === label

  const handleChangeStep = () => {
    if (!active) {
      setCurrentScreen(label as SCREEN)
    }
  }

  return (
    <li
      className={cn(
        "flex items-center px-2 text-base py-2 pl-4 gap-3 rounded cursor-pointer hover:bg-nav-active",
        active && "bg-nav-active"
      )}
      onClick={handleChangeStep}
    >
      {label}
    </li>
  )
}
