import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type FinancialDetailItemProps = {
  title: ReactNode
  content: ReactNode
  isSubChildren?: boolean
  isLoading?: boolean
}
export const FinancialDetailItem = ({
  title,
  content,
  isSubChildren,
  isLoading
}: FinancialDetailItemProps) => {
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

const Layout = ({
  children,
  isSubChildren
}: React.PropsWithChildren<
  Pick<FinancialDetailItemProps, "isSubChildren">
>) => {
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
