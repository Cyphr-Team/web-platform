import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useToggleStatusFeatureFlagMutation } from "../hooks/useMutation/useToggleStatusFeatureFlagMutation"
import React, { useState } from "react"
import { type FeatureFlag } from "@/types/feature-flag.types.ts"
import { RHFTextInput } from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { useForm } from "react-hook-form"
import { type ToggleFeatureFlagFormValue } from "@/modules/feature-flag/constants/form"
import { cn } from "@/lib/utils"

interface Props {
  featureFlag: FeatureFlag
}

export const ConfirmToggleStatusFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleStatusFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)
  const method = useForm<ToggleFeatureFlagFormValue>({
    mode: "onBlur",
    defaultValues: {
      author: "",
      msg: ""
    }
  })

  const confirmToggleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!method.formState.isDirty || !method.formState.isValid) {
      return
    }

    mutate(
      {
        enabled: !featureFlag.enabled,
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
            Toggle status of this feature flag? Please be aware that toggling
            the status of this feature flag will initiate changes in the system.
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
      title="Toggle status feature flag?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={confirmToggleStatus}
    >
      <Switch
        checked={featureFlag.enabled}
        data-state={featureFlag.enabled ? "checked" : "unchecked"}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      />
    </CustomAlertDialog>
  )
}
