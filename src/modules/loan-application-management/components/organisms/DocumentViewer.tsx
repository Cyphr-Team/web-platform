import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"
import { PageList } from "../molecules/documents/PageList"
import { PageViewer } from "../molecules/documents/PageViewer"
import { PageViewerPanel } from "../molecules/documents/PageViewerPanel"

export const DocumentViewer: React.FC = () => {
  const { visualizationDetails, selectedPage } = useLoanDocumentDetailsContext()
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
