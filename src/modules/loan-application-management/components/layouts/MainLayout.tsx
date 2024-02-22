import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { TopNav } from "../molecules/TopNav"
import { BasicInformation } from "../organisms/BasicInformation"
import { APP_PATH } from "@/constants"

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full max-w-screen-2xl pt-4xl">
      <Breadcrumbs
        breads={[
          {
            to: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
            label: "Applications"
          },
          { to: "#", label: "Latte Larry" }
        ]}
      />
      <div className="flex flex-col space-y-3xl border-b mt-3xl">
        <BasicInformation />
        <TopNav />
      </div>
      <div className="p-4xl pt-3xl flex-1 overflow-auto">{children}</div>
    </div>
  )
}
