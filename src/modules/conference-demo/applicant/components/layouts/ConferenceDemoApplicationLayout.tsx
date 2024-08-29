import { memo, Suspense } from "react"
import { LogoHeader } from "@/shared/atoms/LogoHeader.tsx"
import { Loader2 } from "lucide-react"
import { Outlet } from "react-router-dom"
import { cn } from "@/lib/utils.ts"
import {
  Header,
  Sidebar
} from "@/modules/conference-demo/applicant/components/organisms"
import { Progress } from "@/components/ui/progress.tsx"
import { useProgress } from "@/modules/conference-demo/applicant/stores/useProgress.ts"

const ConferenceDemoApplicationLayout = () => {
  const progress = useProgress.use.progress()

  return (
    <div className={cn("absolute h-full w-full z-40", "md:mt-0 md:pb-0")}>
      <div className="flex flex-row w-full">
        <div className="flex-col md:flex bg-background-disabled w-72 flex-shrink-0 mb-3xl overflow-auto h-dvh z-50">
          <div className="pl-3xl pr-2xl items-center mb-4 justify-between flex bg-white border-b h-20">
            <LogoHeader className="justify-center" />
          </div>
          <Sidebar />
        </div>

        <div className="w-full flex-col">
          <Header />

          <Progress
            value={progress}
            className="h-2 rounded-none overflow-visible bg-background-disabled z-20 relative"
            indicatorClassName="after:hidden after:md:block after:content-[attr(data-percentvalue)] after:absolute after:right-0 after:bottom-2.5 after:text-xs after:text-text-secondary"
          />

          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default memo(ConferenceDemoApplicationLayout)
