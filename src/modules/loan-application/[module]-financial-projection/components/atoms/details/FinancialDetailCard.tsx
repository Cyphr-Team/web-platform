import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { PropsWithChildren, ReactNode } from "react"

interface FinancialDetailLayoutProps extends PropsWithChildren<HeaderProps> {
  hasSubChildren?: boolean
  isPdf?: boolean
}

export const FinancialDetailCard = (props: FinancialDetailLayoutProps) => {
  const { title, subTitle, children, hasSubChildren, isPdf = false } = props

  const renderTitle = title ? (
    <Header title={title} subTitle={subTitle} />
  ) : null

  return (
    <Layout isPdf={isPdf} hasSubChildren={hasSubChildren}>
      {renderTitle}
      <Main>{children}</Main>
    </Layout>
  )
}

const Main = ({ children }: PropsWithChildren) => {
  return <main className="flex flex-col">{children}</main>
}

interface HeaderProps {
  title?: ReactNode
  subTitle?: ReactNode
}

const Header = ({ title, subTitle }: HeaderProps) => {
  const renderSubTitle = subTitle ? (
    <div className="text-sm mt-1">{subTitle}</div>
  ) : null

  return (
    <nav>
      <div className="flex justify-center min-w-20 flex-col">
        <h2
          className={cn(
            "text-base font-semibold truncate min-w-20",
            "md:text-lg"
          )}
        >
          {title}
        </h2>
        {renderSubTitle}
      </div>

      <Separator className={cn("mt-2", "md:mt-5")} />
    </nav>
  )
}

interface LayoutProps extends FinancialDetailLayoutProps {}

const Layout = (props: LayoutProps) => {
  const { children, hasSubChildren, isPdf = false } = props
  return (
    <section
      className={cn(
        isPdf && ["p-4 md:p-8", EXPORT_CLASS.FINANCIAL],
        hasSubChildren && "pb-0 md:pb-0"
      )}
    >
      {children}
    </section>
  )
}
