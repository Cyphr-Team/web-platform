import { STATE_STATUS } from "../../constants"

type Props = {
  status: string
  amount?: number
}

export const CardStatus: React.FC<Props> = ({ status, amount = 0 }) => {
  switch (status) {
    case STATE_STATUS.ACTIVE:
      return (
        <div className="flex flex-col p-xl gap-y-lg bg-success-100">
          <p className="text-3xl text-success-600">{amount}</p>
          <p className="text-sm font-medium">Active</p>
        </div>
      )
    case STATE_STATUS.INACTIVE:
      return (
        <div className="flex flex-col p-xl gap-y-lg bg-warning-100">
          <p className="text-3xl text-warning-600">{amount}</p>
          <p className="text-sm font-medium">Inactive</p>
        </div>
      )
    default:
      return (
        <div className="flex flex-col p-xl gap-y-lg bg-gray-100">
          <p className="text-3xl text-gray-500">{amount}</p>
          <p className="text-sm font-medium">Unknown</p>
        </div>
      )
  }
}
