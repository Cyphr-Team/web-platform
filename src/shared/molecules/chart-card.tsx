import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChartCardProps extends React.PropsWithChildren {
  title: string | React.ReactNode
  className?: string
}

const ChartCard = ({ children, title, className }: ChartCardProps) => {
  return (
    <Card className={cn("flex flex-col border-none", className)}>
      <CardHeader className="md:p-10 md:pb-8">
        <CardTitle className="text-sm tracking-wider font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex-1 md:p-10 md:pt-0">
        {children}
      </CardContent>
    </Card>
  )
}

export default ChartCard
