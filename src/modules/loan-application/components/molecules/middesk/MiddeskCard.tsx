import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ReactNode } from "react"

interface MiddeskCardProps {
  content: ReactNode
  headerTitle: ReactNode
  headerRight?: ReactNode
  id?: string
}

export function MiddeskCard({
  content,
  headerTitle,
  headerRight,
  id
}: MiddeskCardProps) {
  return (
    <div id={id}>
      <Card className="shadow-none">
        <CardHeader className="border-b px-8 md:py-4">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
              {headerTitle}
            </CardTitle>

            {headerRight}
          </div>
        </CardHeader>

        <CardContent className="px-5">
          <div className="mb-5">{content}</div>
        </CardContent>
      </Card>
    </div>
  )
}
