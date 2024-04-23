import { Switch } from "@/components/ui/switch"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import { useToggleStatusFeatureFlagMutation } from "../hooks/useMutation/useToggleStatusFeatureFlagMutation"
import React, { useState } from "react"
import {
  FeatureFlag,
  FeatureFlagStatus
} from "../../../types/feature-flag.types"

export const ToggleStatusFeatureFlag = () => {
  return <Switch />
}

type Props = {
  featureFlag: FeatureFlag
}

export const ConfirmToggleStatusFeatureFlag: React.FC<Props> = ({
  featureFlag
}) => {
  const { mutate } = useToggleStatusFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)

  const confirmToggleStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      status:
        featureFlag.status === FeatureFlagStatus.ON
          ? FeatureFlagStatus.OFF
          : FeatureFlagStatus.ON
    })
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={confirmToggleStatus}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Toggle status feature flag?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Toggle status of this feature flag? Please be aware that toggling the
          status of this feature flag will initiate changes in the system.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Switch
        data-state={
          featureFlag.status === FeatureFlagStatus.ON ? "checked" : "unchecked"
        }
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        checked={featureFlag.status === FeatureFlagStatus.ON}
      />
    </CustomAlertDialog>
  )
}
