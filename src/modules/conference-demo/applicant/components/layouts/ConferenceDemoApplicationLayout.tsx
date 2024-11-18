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

function ConferenceDemoApplicationLayout() {
  const progress = useProgress.use.progress()

  return (
    <div className={cn("finovate z-40 size-full", "md:mt-0 md:pb-0")}>
      <div className="flex h-dvh w-full overflow-hidden">
        <div className="z-50 mb-3xl h-dvh w-96 shrink-0 flex-col overflow-auto bg-background-disabled md:flex">
          <div className="mb-4 flex h-20 items-center justify-between border-b bg-white pl-3xl pr-2xl">
            <LogoHeader className="justify-center" />
          </div>
          <Sidebar />
        </div>

        <div className="flex w-full flex-col overflow-auto">
          <Header />

          <Progress
            className="relative z-20 h-2 overflow-visible rounded-none bg-background-disabled"
            indicatorClassName="after:absolute after:bottom-2.5 after:right-0 after:hidden after:text-xs after:text-text-secondary after:content-[attr(data-percentvalue)] after:md:block"
            value={progress}
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
