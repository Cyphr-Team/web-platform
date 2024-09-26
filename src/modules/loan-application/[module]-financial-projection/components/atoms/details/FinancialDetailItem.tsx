import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type FinancialDetailItemProps = {
  title: ReactNode
  content: ReactNode
}
export const FinancialDetailItem = ({
  title,
  content
}: FinancialDetailItemProps) => {
  return (
    <Layout>
      <div className="flex items-center gap-2 min-w-20">
        <h3 className="text-sm font-semibold truncate min-w-20">{title}</h3>
        <div className="ml-auto text-sm">{content}</div>
      </div>
    </Layout>
  )
}

const Layout = ({ children }: React.PropsWithChildren) => {
  return <div className={cn("py-2", "md:py-4")}>{children}</div>
}
