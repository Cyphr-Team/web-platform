import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type PropsWithChildren } from "react"

interface InsightsProps {
  passedStep: number
  totalStep: number
}

function Insights({
  passedStep,
  totalStep,
  children
}: PropsWithChildren<InsightsProps>) {
  return (
    <Card className="top-0 z-10 mb-4 h-fit shrink-0 lg:sticky">
      <CardHeader className="px-0 !pb-0 md:px-0">
        <CardTitle className="flex items-center justify-between px-4 text-base font-bold">
          <div>Insights</div>
          <div>
            {passedStep}/{totalStep}
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full !p-4 !py-0 lg:w-[300px]">
        {children}
      </CardContent>
    </Card>
  )
}

export default Insights
