import { TopNav } from "../molecules/TopNav"
import { BasicInformation } from "../organisms/BasicInformation"
import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <BasicInformation />
        <TopNav />
      </div>
      <div className={cn("flex-1 overflow-auto bg-gray-50 p-4xl pt-3xl")}>
        {children}
      </div>
    </div>
  )
}
