const ENDPOINTS = {
  all: "api/form/esign/documents",
  createDocument: `api/form/esign/documents`,
  createDocumentByFile: () => `${ENDPOINTS.all}/create-by-file`,
  getDocumentStatus: (id: string) => `${ENDPOINTS.all}/${id}`,
  createSessionDocument: (id: string) => `${ENDPOINTS.all}/${id}/session`,
  downloadDocument: (id: string) => `${ENDPOINTS.all}/${id}/download`
}

const E_SIGN_QUERY_KEYS = {
  documentStatus: "status"
}

export const E_SIGN_CLIENT = {
  ENDPOINTS,
  E_SIGN_QUERY_KEYS
}
