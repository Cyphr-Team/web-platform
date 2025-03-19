import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { type PropsWithChildren, type ReactNode } from "react"

interface FinancialDetailLayoutProps extends PropsWithChildren<HeaderProps> {
  hasSubChildren?: boolean
  isPdf?: boolean
  isSubChildren?: boolean
}

export function FinancialDetailCard(props: FinancialDetailLayoutProps) {
  const {
    title,
    subTitle,
    children,
    hasSubChildren,
    isPdf = false,
    isSubChildren
  } = props

  const renderTitle = title ? (
    <Header subTitle={subTitle} title={title} />
  ) : null

  return (
    <Layout
      hasSubChildren={hasSubChildren}
      isPdf={isPdf}
      isSubChildren={isSubChildren}
    >
      {renderTitle}
      <Main>{children}</Main>
    </Layout>
  )
}

function Main({ children }: PropsWithChildren) {
  return <main className="flex flex-col">{children}</main>
}

interface HeaderProps {
  title?: ReactNode
  subTitle?: ReactNode
}

function Header({ title, subTitle }: HeaderProps) {
  const renderSubTitle = subTitle ? (
    <div className="mt-1 text-sm">{subTitle}</div>
  ) : null

  return (
    <nav>
      <div className="flex min-w-20 flex-col justify-center">
        <h2
          className={cn(
            "min-w-20 truncate text-base font-semibold",
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

type LayoutProps = FinancialDetailLayoutProps

function Layout(props: LayoutProps) {
  const { children, hasSubChildren, isSubChildren, isPdf = false } = props

  return (
    <section
      className={cn(
        !isSubChildren && "p-4 md:p-8",
        isPdf && EXPORT_CLASS.FINANCIAL,
        hasSubChildren && "pb-0 md:pb-0"
      )}
    >
      {children}
    </section>
  )
}
