import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"

interface Props {
  handleOpenSignalDetails: () => void
  isOpenSignalDetails: boolean
}

function ViewSignalsDetails({
  handleOpenSignalDetails,
  isOpenSignalDetails
}: Props) {
  const { visualizationDetails } = useLoanDocumentDetailsContext()

  if (!visualizationDetails || isOpenSignalDetails) return null

  return (
    <p
      className="bg-error-100 p-3 text-xs"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(130, 94, 1, 0.25) 0px -2px 0px inset"
      }}
    >
      Detect signals found.
      <span
        className="ml-0.5 cursor-pointer underline"
        onClick={handleOpenSignalDetails}
      >
        View details
      </span>
    </p>
  )
}

export default ViewSignalsDetails
