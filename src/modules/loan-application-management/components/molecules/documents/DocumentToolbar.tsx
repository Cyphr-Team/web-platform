import { Pagination } from "@/shared/molecules/Pagination"
import { DocumentTitle } from "./DocumentTitle"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useLoanDocumentDetailsContext } from "@/modules/loan-application-management/providers/LoanDocumentDetailsProvider"
import { capitalizeWords, snakeCaseToText } from "@/utils"

export const DocumentToolbar: React.FC = () => {
  const {
    zoomIn,
    zoomOut,
    handleSelectPage,
    scale,
    visualizationDetails,
    selectedPage,
    documentDetails
  } = useLoanDocumentDetailsContext()

  if (!visualizationDetails?.visualizationsByPage) return null

  const total = visualizationDetails.visualizationsByPage.length
  const currentPage =
    visualizationDetails.visualizationsByPage.findIndex(
      (page) => page === selectedPage
    ) + 1
  const onNextPage = () => {
    const index = visualizationDetails.visualizationsByPage.findIndex(
      (page) => page === selectedPage
    )
    if (index === -1) return
    const nextPage = visualizationDetails.visualizationsByPage[index + 1]
    if (nextPage) handleSelectPage(nextPage)
  }

  const onPreviousPage = () => {
    const index = visualizationDetails.visualizationsByPage.findIndex(
      (page) => page === selectedPage
    )
    if (index === -1) return
    const previousPage = visualizationDetails.visualizationsByPage[index - 1]
    if (previousPage) handleSelectPage(previousPage)
  }

  const onPageChange = (page: number) => {
    const newPage = visualizationDetails.visualizationsByPage[page - 1]
    if (newPage) handleSelectPage(newPage)
  }

  return (
    <div className="flex w-full justify-between pb-3">
      <DocumentTitle
        verifiedDate="-"
        documentType={capitalizeWords(
          snakeCaseToText(documentDetails?.documentType ?? "")
        )}
      />

      <div className="flex gap-6">
        <div className="flex gap-1">
          <Button
            className="bg-gray-100 w-10 h-10 p-0 disabled:opacity-50"
            variant="secondary"
            onClick={zoomOut}
            disabled={scale < 0.5}
          >
            <Minus className="w-6 h-6 text-gray-500" />
          </Button>
          <Button
            className="bg-gray-100 w-10 h-10 p-0 disabled:opacity-50"
            variant="secondary"
            onClick={zoomIn}
            disabled={scale > 4}
          >
            <Plus className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
        <Pagination
          total={total}
          page={currentPage}
          onPageChange={onPageChange}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  )
}
