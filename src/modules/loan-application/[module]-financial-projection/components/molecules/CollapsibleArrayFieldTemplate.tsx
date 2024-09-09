import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {}

export const CollapsibleArrayFieldTemplate: FC<Props> = (props) => {
  const { children } = props
  const label = "test"

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
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Separator />
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}
