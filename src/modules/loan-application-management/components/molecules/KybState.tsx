import { Card } from "@/components/ui/card"
import { STATE_STATUS } from "../../constants"
import { CardStatus } from "../atoms/CardStatus"
import { KybDetailRegistrationStatus } from "../../constants/type"

type Props = {
  registrationStatus?: KybDetailRegistrationStatus
}

export const KybState: React.FC<Props> = ({ registrationStatus }) => {
  return (
    <Card className="h-fit p-4xl gap-y-4xl flex flex-col">
      <p className="text-2xl font-semibold">Secretary of State</p>
      <div className="flex flex-col gap-y-lg">
        <p className="text-lg font-medium">Registration Status</p>
        <div className="grid grid-cols-3 gap-x-lg">
          <CardStatus
            status={STATE_STATUS.ACTIVE}
            amount={registrationStatus?.active}
          />
          <CardStatus
            status={STATE_STATUS.INACTIVE}
            amount={registrationStatus?.inactive}
          />
          <CardStatus
            status={STATE_STATUS.UNKNOWN}
            amount={registrationStatus?.unknown}
          />
        </div>
      </div>
    </Card>
  )
}
