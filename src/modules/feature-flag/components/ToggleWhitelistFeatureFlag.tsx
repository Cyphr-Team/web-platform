import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import {
  FeatureFlag,
  FeatureFlagRolloutType,
  FeatureFlagStatus
} from "@/types/feature-flag.types.ts"
import { useToggleRolloutTypeFeatureFlagMutation } from "@/modules/feature-flag/hooks/useMutation/useToggleWhitelistFeatureFlagMutation.ts"

type Props = {
  featureFlag: FeatureFlag
}

export const ConfirmToggleWhitelistFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleRolloutTypeFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)

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
            : FeatureFlagRolloutType.WHITELIST
      },
      {
        onSuccess() {
          setIsOpen(false)
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
        disabled={featureFlag.status === FeatureFlagStatus.OFF}
        checked={featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST}
      />
    </CustomAlertDialog>
  )
}
