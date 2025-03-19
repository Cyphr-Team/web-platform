import type { NavigateFunction } from "react-router-dom"
import type { Row } from "@tanstack/react-table"
import { EDITABLE_STATUSES } from "@/types/loan-application.type.ts"
import { APP_PATH } from "@/constants"
import { type OrderLoanApplication } from "@/modules/loanready/types/order-application.ts"

interface NavigationConfig {
  path: string
  state?: object
}

export const loanReadyApplicationHandleClickDetail =
  (navigate: NavigateFunction) => (detail: Row<OrderLoanApplication>) => {
    const { id, loanProgram } = detail.original
    const { id: loanProgramId } = loanProgram
    const navigationConfigs: Record<string, NavigationConfig> = {
      editable: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(id, loanProgramId),
        state: { backUrl: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index }
      },
      loanReady: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.financialApplicationDetails(
          id,
          loanProgramId
        )
      }
    }

    let configKey = "loanReady"

    if (EDITABLE_STATUSES.includes(detail.original.status)) {
      configKey = "editable"
    }

    const { path, state } = navigationConfigs[configKey]

    navigate(path, {
      state: {
        ...state,
        loanProgramDetails: loanProgram
      }
    })
  }
