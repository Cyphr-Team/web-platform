import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"

type Props = {
  handleOpenSignalDetails: () => void
  isOpenSignalDetails: boolean
}

export const ViewSignalsDetails: React.FC<Props> = ({
  handleOpenSignalDetails,
  isOpenSignalDetails
}) => {
  const { visualizationDetails } = useLoanDocumentDetailsContext()

  if (!visualizationDetails || isOpenSignalDetails) return null
  return (
    <p
      className="text-xs bg-error-100 p-3"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(130, 94, 1, 0.25) 0px -2px 0px inset"
      }}
    >
      Detect signals found.
      <span
        className="underline cursor-pointer ml-0.5"
        onClick={handleOpenSignalDetails}
      >
        View details
      </span>
    </p>
  )
}
