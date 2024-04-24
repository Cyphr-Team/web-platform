import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import { FeatureFlag } from "../../../types/feature-flag.types"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useDeleteFeatureFlagMutation } from "../hooks/useMutation/useDeleteFeatureFlagMutation"

type Props = {
  featureFlag: FeatureFlag
}

export const DeleteFeatureFlagModal: React.FC<Props> = ({ featureFlag }) => {
  const { mutate } = useDeleteFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)

  const confirmDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    mutate(undefined)
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onConfirmed={confirmDelete}
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      title="Delete this feature flag?"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Delete this feature flag? This action is permanent and cannot be
          undone.
        </span>
      }
      actionClassName="bg-red-500 hover:bg-red-600 text-white"
    >
      <Button
        size="sm"
        className="btn-error"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Trash size={16} />
      </Button>
    </CustomAlertDialog>
  )
}
