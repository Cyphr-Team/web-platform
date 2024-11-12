import { cn } from "@/lib/utils"
import { useLoanDocumentDetailsContext } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import {
  type Visualization,
  type VisualizationPage
} from "@/modules/loan-application-management/constants/type"

interface Props {
  pagePreview: VisualizationPage
}

export function PagePreview({ pagePreview }: Props) {
  const {
    selectedPage,
    selectedVisualization,
    handleSelectVisualization,
    handleSelectPage
  } = useLoanDocumentDetailsContext()

  const isSelected = selectedPage?.pageDocPk === pagePreview.pageDocPk

  const onClickVisualization = (visualization: Visualization) => {
    handleSelectVisualization(visualization)
  }

  return (
    <div
      className={cn(
        "rounded-lg p-2 bg-gray-50 border border-text-senary flex flex-col gap-y-2 ",
        "data-[signals=true]:border-error",
        "data-[signals=true]:bg-error-50",
        "data-[selected=true]:bg-gray-200"
      )}
      data-selected={isSelected}
      data-signals={pagePreview.pageSignalCount > 0}
    >
      <div
        className="relative border-black data-[selected=true]:border"
        data-selected={isSelected}
        style={{
          filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)"
        }}
      >
        <img
          alt="page"
          className="w-48"
          src={pagePreview.visualizations[0].thumbnailMediumUrl}
          onClick={() => handleSelectPage(pagePreview)}
        />
        <div className="absolute bottom-0 flex w-full justify-between bg-white p-2 text-xs text-text-secondary opacity-80">
          <p>Page {pagePreview.pageNumber}</p>
          {pagePreview.pageSignalCount > 0 && (
            <p>{pagePreview.pageSignalCount} Signals</p>
          )}
        </div>
      </div>
      {pagePreview.visualizations.length > 1 && (
        <div className="flex gap-1 overflow-auto">
          {pagePreview.visualizations.map((visualization, index) => (
            <img
              key={index}
              alt="page"
              className="w-8 border-black data-[selected=true]:border"
              data-selected={selectedVisualization === visualization}
              src={visualization.thumbnailSmallUrl}
              onClick={() => onClickVisualization(visualization)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PagePreview
