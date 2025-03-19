export enum ASSET_TYPE {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE"
}

export interface IUploadPhotoReqParams {
  file: File
  type: ASSET_TYPE
  subdomain: string
}

export interface IMemberImport {
  email: string
  role: string
  reason?: string
}

export interface InvitationDetail {
  detail: IMemberImport[]
  failedInvitations: number
  successfulInvitations: number
  totalInvitations: number
}
