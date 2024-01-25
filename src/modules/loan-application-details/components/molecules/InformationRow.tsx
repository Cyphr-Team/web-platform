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
    <div className="grid grid-cols-4">
      <div className="pl-3xl py-xl flex items-center">
        <p className="text-sm text-text-tertiary font-medium">{label}</p>
      </div>
      <div
        className="pl-3xl py-xl flex items-center data-[action=true]:col-span-2 col-span-1"
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

      <div className="px-3xl py-xl flex justify-end items-center">
        {isBadge && badgeText && <BadgeStatus status={badgeText} />}
      </div>
    </div>
  )
}
