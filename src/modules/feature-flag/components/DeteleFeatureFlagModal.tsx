import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useState } from "react"
import { type FeatureFlag } from "../../../types/feature-flag.types"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useDeleteFeatureFlagMutation } from "../hooks/useMutation/useDeleteFeatureFlagMutation"

interface Props {
  featureFlag: FeatureFlag
}

export const DeleteFeatureFlagModal: React.FC<Props> = ({ featureFlag }) => {
  const { mutate } = useDeleteFeatureFlagMutation(featureFlag.id)
  const [isOpen, setIsOpen] = useState(false)

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    mutate(undefined)
    setIsOpen(false)
  }

  return (
    <CustomAlertDialog
      actionClassName="bg-red-500 text-white hover:bg-red-600"
      cancelText="Cancel"
      confirmText="Confirm"
      description={
        <span>
          Delete this feature flag? This action is permanent and cannot be
          undone.
        </span>
      }
      isOpen={isOpen}
      title="Delete this feature flag?"
      onCanceled={(e) => {
        e.stopPropagation()
        setIsOpen(false)
      }}
      onConfirmed={confirmDelete}
    >
      <Button
        className="bg-error"
        size="sm"
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
