import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import {
  FeatureFlag,
  FeatureFlagRolloutType
} from "@/types/feature-flag.types.ts"
import { useToggleRolloutTypeFeatureFlagMutation } from "@/modules/feature-flag/hooks/useMutation/useToggleWhitelistFeatureFlagMutation.ts"
import { Input } from "@/components/ui/input"

type Props = {
  featureFlag: FeatureFlag
}

export const ConfirmToggleWhitelistFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleRolloutTypeFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState<string | undefined>()

  const confirmToggleWhitelist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate(
      {
        rolloutType:
          featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST
            ? FeatureFlagRolloutType.FULL
            : FeatureFlagRolloutType.WHITELIST,
        reason: msg
      },
      {
        onSuccess() {
          setIsOpen(false)
          setMsg("")
        }
      }
    )
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={confirmToggleWhitelist}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Toggle feature flag rollout type?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Toggle rollout type of this feature flag? Please be aware that
          toggling the whitelist of this feature flag will initiate changes in
          the system.
          <Input
            className="mt-3"
            placeholder="Reason for change"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Switch
        data-state={
          featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST
            ? "checked"
            : "unchecked"
        }
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        disabled={!featureFlag.enabled}
        checked={featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST}
      />
    </CustomAlertDialog>
  )
}
