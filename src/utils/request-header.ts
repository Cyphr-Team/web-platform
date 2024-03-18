import { getSubdomain } from "./domain.utils"

enum CustomHeaderKey {
  InstitutionSubdomain = "X-FS-Institution-Subdomain",
  RememberMe = "X-FS-Remember-Me",
  Authorization = "Authorization"
}

type CustomHeader = {
  [key in CustomHeaderKey]?: string
}

class CustomRequestHeader {
  customHeaders: CustomHeader = {}

  constructor() {
    this.addInstitution()
  }

  addInstitution = () => {
    this.customHeaders[CustomHeaderKey.InstitutionSubdomain] = getSubdomain()
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

const headerWithRememberMe = (days: number) => {
  return {
    ...customRequestHeader.customHeaders,
    [CustomHeaderKey.RememberMe]: days
  }
}

export { customRequestHeader, headerWithRememberMe, headerWithTemporaryToken }
