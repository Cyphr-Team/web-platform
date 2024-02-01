import { Switch } from "@/components/ui/switch"
import { BadgeStatus } from "../atoms/BadgeStatus"

type Props = {
  label: string
  value?: string
  hasAction?: boolean
  isBadge?: boolean
  badgeText?: string
}

export const InformationRow: React.FC<Props> = ({
  label,
  value,
  isBadge,
  badgeText,
  hasAction
}) => {
  return (
    <div className="grid-cols-2 grid xl:grid-cols-4 grid-flow-row">
      <div className="pl-3xl py-xl flex items-center">
        <p className="text-sm text-text-tertiary font-medium">{label}</p>
      </div>

      <div
        className="pl-3xl py-xl flex items-center data-[action=true]:xl:col-span-2 col-span-1 break-words"
        data-action={!hasAction}
      >
        <p>{value}</p>
      </div>

      {hasAction && (
        <div className="flex gap-x-lg items-center pl-3xl py-xl">
          <Switch />
          <p className="text-sm font-medium">resolve manually</p>
        </div>
      )}

      <div className="px-3xl py-xl flex xl:justify-end items-center">
        {isBadge && badgeText && <BadgeStatus status={badgeText} />}
      </div>
    </div>
  )
}
