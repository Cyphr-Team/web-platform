import { TopNav } from "../molecules/TopNav"
import { BasicInformation } from "../organisms/BasicInformation"
import { cn } from "@/lib/utils"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full md:pt-4">
      <div className="flex flex-col space-y-3xl border-b mt-xl">
        <BasicInformation />
        <TopNav />
      </div>
      <div
        className={cn(
          "p-4xl pt-3xl flex-1 overflow-auto",
          isEnableCashFlowV2() && "bg-gray-50"
        )}
      >
        {children}
      </div>
    </div>
  )
}
