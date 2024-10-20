import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import { Route } from "react-router-dom"

/**
 * Document routes ("/application/:loanApplicationId/document"), List of loan application's documents.
 */
const documentRoutes = (
  <Route
    handle={handleCrumb(APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index)}
    path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index}
  >
    {/* LIST LOAN APPLICATION' DOCUMENTS */}
    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application-management/components/pages/Document"
        )
      }
    />

    {/* DETAIL DOCUMENT */}
    <Route
      handle={handleCrumb(APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.index)}
      lazy={() =>
        import(
          "@/modules/loan-application-management/components/pages/DocumentDetails"
        )
      }
      path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.index}
    />
  </Route>
)

export { documentRoutes }
