import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { TopNav } from "../molecules/TopNav"
import { BasicInformation } from "../organisms/BasicInformation"

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden w-full max-w-screen-2xl space-y-3xl">
      <Breadcrumbs />
      <div className="flex flex-col space-y-3xl border-b">
        <BasicInformation />
        <TopNav />
      </div>
      <div className="p-4xl flex-1 flex">{children}</div>
    </div>
  )
}
