interface ApplicationUsage {
  currentApplicationUsage?: number
  currentApplicationLimit?: number
  isExceeded?: false
}

interface SeatUsage {
  currentSeatUsage?: number
  currentSeatLimit?: number
  isExceeded?: false
}

interface Usage {
  application?: ApplicationUsage
  seat?: SeatUsage
}

export type { Usage }
