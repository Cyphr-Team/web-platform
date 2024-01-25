import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Props = {
  title: string
  content: string
}

export const LoanInformationCard: React.FC<Props> = ({ title, content }) => {
  return (
    <Card className="space-y-md rounded-xl flex-1">
      <CardHeader className="pb-0">
        <p className="text-sm text-text-tertiary">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{content}</p>
      </CardContent>
    </Card>
  )
}
