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
    <Card className="h-fit lg:sticky top-0 z-10 mb-4 flex-shrink-0">
      <CardHeader className="!pb-0 px-0 md:px-0">
        <CardTitle className="font-bold text-base flex justify-between items-center px-4">
          <div>Insights</div>
          <div>
            {passedStep}/{totalStep}
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full lg:w-[300px] !p-4 !py-0">
        {children}
      </CardContent>
    </Card>
  )
}

export default Insights
