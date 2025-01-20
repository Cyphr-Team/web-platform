import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import {
  type FeatureFlag,
  FeatureFlagRolloutType
} from "@/types/feature-flag.types.ts"
import { useToggleRolloutTypeFeatureFlagMutation } from "@/modules/feature-flag/hooks/useMutation/useToggleWhitelistFeatureFlagMutation.ts"
import { useForm } from "react-hook-form"
import { type ToggleFeatureFlagFormValue } from "@/modules/feature-flag/constants/form"
import { cn } from "@/lib/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import { RHFTextInput } from "@/modules/form-template/components/molecules"

interface Props {
  featureFlag: FeatureFlag
}

export const ConfirmToggleWhitelistFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleRolloutTypeFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)
  const method = useForm<ToggleFeatureFlagFormValue>({
    mode: "onBlur",
    defaultValues: {
      author: "",
      msg: ""
    }
  })

  const confirmToggleWhitelist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!method.formState.isDirty || !method.formState.isValid) {
      return
    }

    mutate(
      {
        rolloutType:
          featureFlag.rolloutType === FeatureFlagRolloutType.WHITELIST
            ? FeatureFlagRolloutType.FULL
            : FeatureFlagRolloutType.WHITELIST,
        reason: `${method.watch("author")} - ${method.watch("msg")}`
      },
      {
        onSuccess() {
          method.reset()
          setIsOpen(false)
        }
      }
    )
  }

  return (
    <CustomAlertDialog
      actionClassName={cn(
        "bg-red-500 text-white hover:bg-red-900",
        method.formState.isDirty && method.formState.isValid
          ? ""
          : "cursor-not-allowed opacity-50"
      )}
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <RHFProvider methods={method}>
          <span>
            Toggle rollout type of this feature flag? Please be aware that
            toggling the whitelist of this feature flag will initiate changes in
            the system.
            <RHFTextInput
              className="mt-6 space-y-2"
              label="Author"
              name="author"
              placeholder="Type your name"
            />
            <RHFTextInput
              className="mt-6 space-y-2"
              label="Reason for change"
              name="msg"
              placeholder="Type a reason for change"
            />
          </span>
        </RHFProvider>
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
