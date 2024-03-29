export enum ASSET_TYPE {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE"
}

export interface IUploadPhotoReqParams {
  file: File
  type: ASSET_TYPE
}
