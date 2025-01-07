import { APP_PATH } from "@/constants"
import { lazy } from "react"
import { Route } from "react-router-dom"

const LoanApplicationDocument = lazy(
  () =>
    import(
      "@/modules/loan-application/capital-collab/components/pages/ApplicationDocument"
    )
)

/**
 * Document routes ("/loan/:loanProgramId/applications/:id/documents").
 */
const documentRoutes = (
  <Route path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.documents.index}>
    <Route
      index
      element={<LoanApplicationDocument />}
      path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.documents.details(
        ":loanProgramId",
        ":id"
      )}
    />
    <Route
      lazy={() =>
        import(
          "@/modules/loan-application-management/components/pages/DocumentDetails"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.documents.byDocumentId(
        ":loanProgramId",
        ":id",
        ":documentId"
      )}
    />
  </Route>
)

export { documentRoutes }
