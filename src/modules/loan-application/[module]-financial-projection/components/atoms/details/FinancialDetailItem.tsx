import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, type ReactNode } from "react"

interface FinancialDetailItemProps {
  title: ReactNode
  content: ReactNode
  isLoading?: boolean
}

export function FinancialDetailItem(props: FinancialDetailItemProps) {
  const { title, content, isLoading } = props
  const renderContent = isLoading ? (
    <Skeleton className="h-4 w-40 bg-gray-300" />
  ) : (
    content
  )

  return (
    <Layout>
      <div className="flex min-w-20 items-center gap-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="ml-auto flex-1 text-right">{renderContent}</div>
      </div>
    </Layout>
  )
}

type LayoutProps = PropsWithChildren

function Layout({ children }: LayoutProps) {
  return <div className={cn("text-sm")}>{children}</div>
}
