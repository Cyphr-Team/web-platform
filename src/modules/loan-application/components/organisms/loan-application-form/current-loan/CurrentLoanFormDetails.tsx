import React from "react"
import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { toCurrency } from "@/utils"
import {
  type CurrentLoanInformationResponse,
  type CurrentLoansInformationResponse
} from "@/modules/loan-application/constants/type.ts"

import { get } from "lodash"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { type QueryCurrentLoansFormV2Response } from "@/modules/loan-application/hooks/form-current-loan-v2/useQueryCurrentLoansFormV2.ts"

interface CurrentLoanFormDetailsProps {
  currentLoanFormData?:
    | QueryCurrentLoansFormV2Response
    | CurrentLoanInformationResponse[]
    | CurrentLoansInformationResponse
    | CurrentLoanFormsV2Value
}

export const CurrentLoanFormDetails: React.FC<CurrentLoanFormDetailsProps> = ({
  currentLoanFormData
}) => {
  const currentLoanForms =
    Array.isArray(currentLoanFormData) && currentLoanFormData.length > 0
      ? currentLoanFormData
      : get(currentLoanFormData, "currentLoanForms", [])

  const dataToUse = isEnableFormV2()
    ? (currentLoanFormData as CurrentLoanFormsV2Value)?.currentLoans ?? []
    : currentLoanForms

  return (
    <Card
      className="loan-application-item flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none"
      id="current-loans"
    >
      <h5 className="text-lg font-semibold">Current Loans</h5>
      {dataToUse?.length == 0 ? (
        <span className="text-sm text-muted-foreground">No results</span>
      ) : (
        dataToUse?.map((currentLoanForm, index) => (
          <Card
            key={currentLoanForm.id}
            className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none"
          >
            <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
              <div className="col-span-6 text-xl font-semibold">
                Loan #{index + 1}:
              </div>
              <TextInputDisplay
                className="col-span-3"
                label="Lender name"
                value={currentLoanForm.lenderName}
              />
              <TextInputDisplay
                className="col-span-2"
                label="Loan type"
                value={currentLoanForm.loanType}
              />
              <TextInputDisplay
                className="col-span-3"
                label="Outstanding loan balance"
                value={toCurrency(currentLoanForm.outstandingLoanBalance)}
              />
              <TextInputDisplay
                className="col-span-2"
                label="Monthly payment amount"
                value={toCurrency(currentLoanForm.monthlyPaymentAmount)}
              />
              <TextInputDisplay
                className="col-span-3"
                label="Loan term remaining (in months)"
                value={currentLoanForm.loanTermRemainingInMonths.toString()}
              />
              <TextInputDisplay
                className="col-span-2"
                label="Annual interest rate"
                value={currentLoanForm.annualInterestRate.toString()}
              />
            </div>
          </Card>
        ))
      )}
    </Card>
  )
}
