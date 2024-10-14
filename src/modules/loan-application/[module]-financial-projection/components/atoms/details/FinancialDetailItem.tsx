import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { PropsWithChildren, ReactNode } from "react"

interface FinancialDetailItemProps {
  title: ReactNode
  content: ReactNode
  isSubChildren?: boolean
  isLoading?: boolean
}

export const FinancialDetailItem = (props: FinancialDetailItemProps) => {
  const { title, content, isSubChildren, isLoading } = props
  const renderContent = isLoading ? (
    <Skeleton className="h-4 w-40 bg-gray-300" />
  ) : (
    content
  )

  return (
    <Layout isSubChildren={isSubChildren}>
      <div className="flex items-center gap-2 min-w-20">
        <h3 className="font-semibold truncate min-w-20">{title}</h3>
        <div className="ml-auto text-right">{renderContent}</div>
      </div>
    </Layout>
  )
}

interface LayoutProps extends PropsWithChildren {
  isSubChildren?: boolean
}

const Layout = ({ children, isSubChildren }: LayoutProps) => {
  return (
    <div
      className={cn(
        "py-2 text-sm",
        "md:py-4",
        isSubChildren && "py-1.5 md:py-2.5"
      )}
    >
      {children}
    </div>
  )
}
