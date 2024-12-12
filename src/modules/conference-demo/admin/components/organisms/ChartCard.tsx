import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ChartCardProps = React.PropsWithChildren<{
  title: string | React.ReactNode
}>
const ChartCard = ({ children, title }: ChartCardProps) => {
  return (
    <Card className="border-none flex flex-col">
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
