import { ExpirationDays } from "@/types/expiration-day.type.ts"

const EXPIRATION_DAYS = [
  {
    label: "7 Days",
    value: ExpirationDays.SEVEN_DAYS
  },
  {
    label: "30 Days",
    value: ExpirationDays.THIRTY_DAYS
  },
  {
    label: "60 Days",
    value: ExpirationDays.SIXTY_DAYS
  }
]

export { EXPIRATION_DAYS }
