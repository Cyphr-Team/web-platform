import { type Option } from "@/types/common.type"
import { type ReactNode } from "react"
import { JudgeAvatar } from "./JudgeAvatar"

interface IUserMultiSelectOptionParams {
  option: Option
  close: ReactNode
}

const CONCATENATE_CHAR = "$"

/**
 * The multiselect also contain avatar, therefore
 * We need to get it by concat the avatar to name and get it later
 */
export const buildUserMultiSelectLabelHelper = (
  name?: string,
  avatar?: string
) => {
  return [name, avatar].map((value) => value ?? "").join(CONCATENATE_CHAR)
}

export function UserMultiSelectOption({
  option,
  close
}: IUserMultiSelectOptionParams) {
  const [name, avatar] = option.label.split(CONCATENATE_CHAR)

  return (
    <div className="parent-border flex items-center">
      <JudgeAvatar
        avatar={avatar}
        className="size-5 text-xs"
        name={name ?? ""}
      />

      <div className="ml-1.5">
        <div className="text-sm group-[.selected]:font-medium">{name}</div>
      </div>

      <div className="flex h-4 items-center text-stone-400">{close}</div>
    </div>
  )
}
