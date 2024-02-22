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
      <p className="text-2xl font-semibold sticky -top-3xl bg-white py-2 -mt-2">
        {title}
      </p>
      <Card>{children}</Card>
    </div>
  )
}
