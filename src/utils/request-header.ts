import { APP_CONFIGS } from "@/configs"

export const DEMO_INSTITUTION_ID = APP_CONFIGS.DEMO_INSTITUTION_ID

enum CustomHeaderKey {
  Institution = "X-FS-Institution-Id",
  Authorization = "Authorization"
}

type CustomHeader = {
  [key in CustomHeaderKey]?: string
}

class CustomRequestHeader {
  customHeaders: CustomHeader = {}

  constructor() {
    this.addInstitution(DEMO_INSTITUTION_ID)
  }

  addInstitution = (institutionId: string) => {
    this.customHeaders[CustomHeaderKey.Institution] = institutionId
    return this
  }
}

const customRequestHeader = new CustomRequestHeader()

const headerWithTemporaryToken = (token: string) => {
  return {
    ...customRequestHeader.customHeaders,
    Authorization: `Bearer ${token}`
  }
}

export { customRequestHeader, headerWithTemporaryToken }
