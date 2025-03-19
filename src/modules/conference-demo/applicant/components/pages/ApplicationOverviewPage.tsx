import { cn } from "@/lib/utils"
import { SidebarApplicationDetails } from "../organisms/SidebarApplicationDetails"
import { Header } from "../organisms"
import ApplicationDetails from "../organisms/ApplicationDetails"
import SignatureDetails from "../organisms/SignatureDetails"
import { Separator } from "@/components/ui/separator"
import DocumentationDetails from "../organisms/DocumentationDetails"

function ApplicationOverviewPage() {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-40 mt-14 flex size-full pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <SidebarApplicationDetails />
      <div className="flex w-full flex-col overflow-auto h-full shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),_0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
        <Header />
        <div
          className={cn(
            "flex size-full flex-1 flex-col gap-4 overflow-auto p-2xl",
            "md:gap-8 md:p-4xl"
          )}
        >
          <ApplicationDetails />
          <Separator />
          <DocumentationDetails />
          <Separator />
          <SignatureDetails />
        </div>
      </div>
    </div>
  )
}

export default ApplicationOverviewPage
