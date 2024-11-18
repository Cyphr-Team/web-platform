import {
  PageList,
  PageViewer,
  PageViewerPanel
} from "@/modules/conference-demo/admin/components/atoms"
import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const DocumentViewer: React.FC = () => {
  const { visualizationDetails, selectedPage } = useLoanDocumentDetailsContext()

  if (!visualizationDetails)
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2
          className={cn(
            "m-2 size-8 animate-spin text-primary transition-all ease-out"
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

export default DocumentViewer
