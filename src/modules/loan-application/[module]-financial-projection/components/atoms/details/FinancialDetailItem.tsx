import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type FinancialDetailItemProps = {
  title: ReactNode
  content: ReactNode
  isSubChildren?: boolean
}
export const FinancialDetailItem = ({
  title,
  content,
  isSubChildren
}: FinancialDetailItemProps) => {
  return (
    <Layout isSubChildren={isSubChildren}>
      <div className="flex items-center gap-2 min-w-20">
        <h3 className="font-semibold truncate min-w-20">{title}</h3>
        <div className="ml-auto text-right">{content}</div>
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
