import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.tsx"
import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  label: string
  id: string
}

export const CollapsibleArrayFieldTemplate: FC<Props> = (props) => {
  const { children, label, id } = props

  return (
    <AccordionItem value={id} className="w-full">
      <AccordionTrigger
        id={id}
        className="flex-row-reverse w-full px-4 py-2 hover:no-underline"
      >
        <div className="flex items-center justify-between flex-1 ml-3 font-semibold cursor-pointer">
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">{children}</AccordionContent>
    </AccordionItem>
  )
}
