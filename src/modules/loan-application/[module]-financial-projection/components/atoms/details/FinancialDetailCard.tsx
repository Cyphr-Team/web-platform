import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

type FinancialDetailLayoutProps = React.PropsWithChildren<HeaderProps>
export const FinancialDetailCard = ({
  title,
  subTitle,
  children
}: FinancialDetailLayoutProps) => {
  return (
    <Layout>
      <Header title={title} subTitle={subTitle} />
      <Main>{children}</Main>
    </Layout>
  )
}

const Main = ({ children }: React.PropsWithChildren) => {
  return <main className="flex flex-col">{children}</main>
}

interface HeaderProps {
  title: ReactNode
  subTitle?: ReactNode
}
const Header = ({ title, subTitle }: HeaderProps) => {
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
        {!!subTitle && <p className="text-sm mt-1">{subTitle}</p>}
      </div>

      <Separator className={cn("mt-2", "md:mt-5")} />
    </nav>
  )
}

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <section className={cn("p-4 border rounded-xl", "md:p-8")}>
      {children}
    </section>
  )
}
