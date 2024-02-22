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
      <div className="pl-xl xl:pl-3xl py-xl xl:py-3xl flex items-center">
        <p className="text-sm text-text-tertiary">{label}</p>
      </div>

      <div
        className="py-xl xl:py-3xl pl-xl xl:pl-3xl flex items-center data-[action=true]:xl:col-span-2 col-span-1 break-words"
        data-action={!hasAction}
      >
        <p className="font-medium text-sm">{value}</p>
      </div>

      {hasAction && (
        <div className="flex gap-x-lg items-center pl-xl xl:pl-3xl py-xl xl:py-3xl">
          <Switch />
          <p className="text-sm font-medium">resolve manually</p>
        </div>
      )}

      <div className="pr-3xl py-xl xl:py-3xl flex xl:justify-end pl-xl xl:pl-0 items-center">
        {isBadge && badgeText && <BadgeStatus status={badgeText} />}
      </div>
    </div>
  )
}
