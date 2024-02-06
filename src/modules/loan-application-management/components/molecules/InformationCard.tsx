import { Card } from "@/components/ui/card"

type Props = {
  title: string
}

export const InformationCard = ({
  title,
  children
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col gap-y-lg">
      <p className="text-3xl font-semibold sticky top-0 bg-white pb-2">
        {title}
      </p>
      <Card>{children}</Card>
    </div>
  )
}
