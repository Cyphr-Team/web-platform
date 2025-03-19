import { Card } from "@/components/ui/card"

interface Props {
  title: string
}

export function InformationCard({
  title,
  children
}: React.PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-y-lg">
      <p className="sticky -top-3xl -mt-2 bg-white py-2 text-2xl font-semibold">
        {title}
      </p>
      <Card>{children}</Card>
    </div>
  )
}
