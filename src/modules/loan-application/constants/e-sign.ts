const ENDPOINTS = {
  all: "api/form/esign/documents",
  createDocument: `api/form/esign/documents`,
  createDocumentByFile: () => `${ENDPOINTS.all}/create-by-file`,
  getDocumentStatus: (id: string) => `${ENDPOINTS.all}/${id}`,
  getDocumentByAppId: () => `${ENDPOINTS.all}/by-application-id`,
  createSessionDocument: (id: string) => `${ENDPOINTS.all}/${id}/session`,
  downloadDocument: () => `${ENDPOINTS.all}/download`,
  linkDocument: () => `${ENDPOINTS.all}/link`
}

const E_SIGN_QUERY_KEYS = {
  documentStatus: "status",
  pdfDocument: "pdfDocument"
}

export const E_SIGN_CLIENT = {
  ENDPOINTS,
  E_SIGN_QUERY_KEYS
}
