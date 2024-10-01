import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

type FinancialDetailLayoutProps = {
  isSubChildren?: boolean
} & React.PropsWithChildren<HeaderProps>
export const FinancialDetailCard = ({
  title,
  subTitle,
  children,
  isSubChildren
}: FinancialDetailLayoutProps) => {
  const renderTitle = title ? (
    <Header title={title} subTitle={subTitle} />
  ) : null

  return (
    <Layout isSubChildren={isSubChildren}>
      {renderTitle}
      <Main>{children}</Main>
    </Layout>
  )
}

const Main = ({ children }: React.PropsWithChildren) => {
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

const Layout = ({
  children,
  isSubChildren
}: React.PropsWithChildren<
  Pick<FinancialDetailLayoutProps, "isSubChildren">
>) => {
  return (
    <section
      className={cn(
        "p-4 border rounded-xl",
        "md:p-8",
        isSubChildren && "p-0 md:p-0 border-none"
      )}
    >
      {children}
    </section>
  )
}
