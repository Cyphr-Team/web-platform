import { getSubdomain } from "./domain.utils"

enum CustomHeaderKey {
  InstitutionSubdomain = "X-FS-Institution-Subdomain",
  RememberMe = "X-FS-Remember-Me",
  Authorization = "Authorization",
  ContentType = "Content-Type"
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

const headerWithContentType = (contentType: string) => {
  return {
    ...customRequestHeader.customHeaders,
    [CustomHeaderKey.ContentType]: contentType
  }
}

export {
  customRequestHeader,
  headerWithRememberMe,
  headerWithTemporaryToken,
  headerWithContentType
}
