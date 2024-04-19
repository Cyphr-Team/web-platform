type ApplicationUsage = {
  currentApplicationUsage?: number
  currentApplicationLimit?: number
  isExceeded?: false
}

type SeatUsage = {
  currentSeatUsage?: number
  currentSeatLimit?: number
  isExceeded?: false
}

type Usage = {
  application?: ApplicationUsage
  seat?: SeatUsage
}

export type { Usage }
