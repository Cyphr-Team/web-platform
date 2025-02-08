import { type UserRoles } from "./user.type"

interface Invitation {
  id: string
  institutionId: string
  senderId: string
  senderName: string
  senderEmail: string
  recipientEmail: string
  roles: UserRoles[]
  status: string
  expirationDays: number
  sentAt: string
  updatedAt: string
  deletedAt: string
}

export type { Invitation }
