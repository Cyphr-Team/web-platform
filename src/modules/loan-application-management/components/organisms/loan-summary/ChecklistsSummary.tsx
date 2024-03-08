import { Separator } from "@/components/ui/separator"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { camelCaseToText } from "@/utils"
import { Fragment } from "react"
import { useLoanApplicationDetailContext } from "../../../providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../molecules/InformationRow"

export const ChecklistsSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const checkLists = loanSummary?.checkLists ?? {}

  return (
    <>
      {Object.entries(checkLists).map(([label, value], index) => {
        return (
          <Fragment key={label}>
            <InformationRow
              label={
                <span className="capitalize">{camelCaseToText(label)}</span>
              }
              value={value?.message ?? UNKNOWN_VALUE}
              status={value?.status}
              subLabel={value?.subLabel}
            />

            {index != Object.entries(checkLists).length - 1 && <Separator />}
          </Fragment>
        )
      })}
    </>
  )
}
