interface Invitation {
  id: string
  institutionId: string
  senderId: string
  senderName: string
  senderEmail: string
  recipientEmail: string
  status: string
  expirationDays: number
  sentAt: string
  updatedAt: string
  deletedAt: string
}

export type { Invitation }
