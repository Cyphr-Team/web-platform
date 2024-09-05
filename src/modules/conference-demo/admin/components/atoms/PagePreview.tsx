import { cn } from "@/lib/utils"
import { useLoanDocumentDetailsContext } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import {
  Visualization,
  VisualizationPage
} from "@/modules/loan-application-management/constants/type"

type Props = {
  pagePreview: VisualizationPage
}
export const PagePreview = ({ pagePreview }: Props) => {
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
        data-selected={isSelected}
        className="relative data-[selected=true]:border border-black"
        style={{
          filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)"
        }}
      >
        <img
          src={pagePreview.visualizations[0].thumbnailMediumUrl}
          alt="page"
          onClick={() => handleSelectPage(pagePreview)}
          className="w-48"
        />
        <div className="flex justify-between text-xs text-text-secondary absolute bottom-0 p-2 opacity-80 w-full bg-white">
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
              src={visualization.thumbnailSmallUrl}
              alt="page"
              className="w-8 data-[selected=true]:border border-black"
              data-selected={selectedVisualization === visualization}
              onClick={() => onClickVisualization(visualization)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PagePreview
