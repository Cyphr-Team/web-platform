export const DEMO_INSTITUTION_ID = "00000000-0000-0000-0000-000000000000"

enum CustomHeaderKey {
  Institution = "X-FS-Institution-Id"
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

export { customRequestHeader }
