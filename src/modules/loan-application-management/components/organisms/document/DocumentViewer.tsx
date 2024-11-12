import { useLoanDocumentDetailsContext } from "../../../providers/LoanDocumentDetailsProvider"
import { PageList } from "../../molecules/documents/PageList"
import { PageViewer } from "../../molecules/documents/PageViewer"
import { PageViewerPanel } from "../../molecules/documents/PageViewerPanel"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const DocumentViewer: React.FC = () => {
  const { visualizationDetails, selectedPage } = useLoanDocumentDetailsContext()

  if (!visualizationDetails)
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2
          className={cn(
            "m-2 h-8 w-8 transition-all ease-out animate-spin text-primary"
          )}
        />
      </div>
    )
  if (visualizationDetails.visualizationsByPage.length === 0)
    return (
      <div className="flex w-full items-center justify-center">
        <p className="font-medium text-primary">No visualizations found</p>
      </div>
    )

  return (
    <div className="flex w-full gap-2 overflow-auto bg-gray-100 p-3">
      <PageList
        visualizationsByPage={visualizationDetails.visualizationsByPage}
      />
      <div className="flex w-full flex-col overflow-auto">
        <PageViewer />
        {selectedPage?.visualizations?.length &&
        selectedPage?.visualizations?.length > 1 ? (
          <PageViewerPanel />
        ) : null}
      </div>
    </div>
  )
}
