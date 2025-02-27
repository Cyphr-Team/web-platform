import { EnumConnectedAppStatus } from "@/modules/settings/types/enum.ts"

const mappedStatusLabel = {
  [EnumConnectedAppStatus.CONNECTED]: "Connected",
  [EnumConnectedAppStatus.DISCONNECTED]: "Disconnected"
}

export default mappedStatusLabel
