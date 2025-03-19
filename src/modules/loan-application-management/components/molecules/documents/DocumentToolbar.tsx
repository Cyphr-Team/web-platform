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
        documentType={capitalizeWords(
          snakeCaseToText(documentDetails?.documentType ?? "")
        )}
        verifiedDate={documentDetails?.verifiedDate ?? ""}
      />

      <div className="flex gap-6">
        <div className="flex gap-1">
          <Button
            className="size-10 bg-gray-100 p-0 disabled:opacity-50"
            disabled={scale < 0.5}
            variant="secondary"
            onClick={zoomOut}
          >
            <Minus className="size-6 text-gray-500" />
          </Button>
          <Button
            className="size-10 bg-gray-100 p-0 disabled:opacity-50"
            disabled={scale > 4}
            variant="secondary"
            onClick={zoomIn}
          >
            <Plus className="size-6 text-gray-500" />
          </Button>
        </div>
        <Pagination
          page={currentPage}
          total={total}
          onNextPage={onNextPage}
          onPageChange={onPageChange}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  )
}
