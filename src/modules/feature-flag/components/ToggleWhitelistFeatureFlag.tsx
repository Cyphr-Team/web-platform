import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import {
  type FeatureFlag,
  FeatureFlagRolloutType
} from "@/types/feature-flag.types.ts"
import { useToggleRolloutTypeFeatureFlagMutation } from "@/modules/feature-flag/hooks/useMutation/useToggleWhitelistFeatureFlagMutation.ts"
import { Input } from "@/components/ui/input"

interface Props {
  featureFlag: FeatureFlag
}

export const ConfirmToggleWhitelistFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleRolloutTypeFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState<string | undefined>()

  const confirmToggleWhitelist = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
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
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </span>
      }
      isOpen={isOpen}
      title="Toggle feature flag rollout type?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={confirmToggleWhitelist}
    >
      <Switch
        checked={featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST}
        data-state={
          featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST
            ? "checked"
            : "unchecked"
        }
        disabled={!featureFlag.enabled}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      />
    </CustomAlertDialog>
  )
}
