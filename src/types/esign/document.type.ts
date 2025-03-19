enum PandaDocDocumentStatus {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
  SENT = "SENT",
  UPLOADED = "UPLOADED",
  VIEWED = "VIEWED",
  UNKNOWN = "UNKNOWN"
}

const sessionAbleDocumentStatus = [
  PandaDocDocumentStatus.SENT,
  PandaDocDocumentStatus.VIEWED,
  PandaDocDocumentStatus.COMPLETED
]

export { PandaDocDocumentStatus, sessionAbleDocumentStatus }

interface IESignDocument {
  documentId: string
  documentName?: string
  status?: PandaDocDocumentStatus
  dateCreated?: string
  dateModified?: string
  expirationDate?: string
  version?: string
  uuid?: string
  signSession?: IESignSession
  recipient?: IESignRecipient
  updatedAt?: string
}

interface IESignSession {
  id: string
  expiresAt: string
}

interface IESignRecipient {
  id?: string
  email?: string
  name?: string
}

export type { IESignDocument, IESignRecipient, IESignSession }
