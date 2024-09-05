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
      <div className="w-full flex justify-center items-center">
        <Loader2
          className={cn(
            "m-2 h-8 w-8 transition-all ease-out animate-spin text-primary"
          )}
        />
      </div>
    )

  if (visualizationDetails.visualizationsByPage.length === 0)
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-primary font-medium">No visualizations found</p>
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

export default DocumentViewer
