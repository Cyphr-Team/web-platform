import { FC, PropsWithChildren } from "react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import { Separator } from "@/components/ui/separator.tsx"

interface Props extends PropsWithChildren {
  label: string
}

const FormItemAccordion: FC<Props> = ({ label, children }) => {
  return (
    <AccordionItem
      value={label}
      className="w-full bg-white rounded-lg shadow-md"
    >
      <AccordionTrigger
        id={`parent-step-${label.toLowerCase()}`}
        className="flex-row-reverse w-full px-4 py-2"
        isStartIcon
      >
        <div className="flex items-center justify-between flex-1 ml-3 font-semibold">
          <div>{label}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Separator />
        <ul className="px-2 py-4 gap-1 flex flex-col">{children}</ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default FormItemAccordion
