export enum ASSET_TYPE {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE"
}

export interface IUploadPhotoReqParams {
  file: File
  type: ASSET_TYPE
  subdomain: string
}

export interface InvitationDetail {
  data: { success: string[]; failed: string[] }
  failedInvitations: number
  successfulInvitations: number
  totalInvitations: number
}
