import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"
import { PageList } from "../molecules/documents/PageList"
import { PageViewer } from "../molecules/documents/PageViewer"
import { PageViewerPanel } from "../molecules/documents/PageViewerPanel"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const DocumentViewer: React.FC = () => {
  const { visualizationDetails, selectedPage } = useLoanDocumentDetailsContext()
  if (!visualizationDetails)
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2
          className={cn(
            "m-2 h-8 w-8 transition-all ease-out animate-spin text-primary"
          )}
        />
      </div>
    )
  return (
    <div className="flex bg-gray-100 p-3 w-full overflow-auto gap-2">
      <PageList
        visualizationsByPage={visualizationDetails.visualizationsByPage}
      />
      <div className="flex flex-col w-full overflow-auto">
        <PageViewer />
        {selectedPage?.visualizations?.length &&
          selectedPage?.visualizations?.length > 1 && <PageViewerPanel />}
      </div>
    </div>
  )
}
