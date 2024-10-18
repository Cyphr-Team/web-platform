import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface FormLayoutProps {
  wrapperClassName?: string
}
export const FormLayout = ({
  children,
  wrapperClassName
}: PropsWithChildren<FormLayoutProps>) => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm",
        wrapperClassName
      )}
    >
      {children}
    </Card>
  )
}
