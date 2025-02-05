import type { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button, ButtonLoading } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useBoolean } from "@/hooks"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { type Subscription } from "@/modules/subscriptions/types/subscription.types"
import { useAssociateSubscriptionMutation } from "@/modules/subscriptions/hooks/useMutation/useAssociateSubscription"
import { useCancelSubscriptionMutation } from "@/modules/subscriptions/hooks/useMutation/useCancelSubscription"
import { useQueryGetListAllInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListAllInstitution"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import { cn } from "@/lib/utils"

interface SubscriptionActionProps {
  row: Row<Subscription>
}

const enum SubscriptionActionEnum {
  ASSOCIATE_PLAN = "ASSOCIATE_PLAN",
  CANCEL_SUBSCRIPTION = "CANCEL_SUBSCRIPTION"
}

function SubscriptionTableAction(props: SubscriptionActionProps) {
  const { value: openAlert, setValue, onTrue, onFalse } = useBoolean(false)
  const [institutionId, setInstitutionId] = useState<string>()
  const [subscriptionAction, setSubscriptionAction] =
    useState<SubscriptionActionEnum>()
  const { row } = props

  const { mutate: cancelSubscription, isPending: isPendingCancel } =
    useCancelSubscriptionMutation()
  const { mutate: associateSubscription, isPending: isPendingAssociate } =
    useAssociateSubscriptionMutation()

  const listInstitution = useQueryGetListAllInstitution({
    enabled: checkIsForesightAdmin()
  })

  const institutionOptions =
    listInstitution.data?.map((institution) => ({
      value: institution.id,
      label: institution.name
    })) ?? []

  const handleSubscriptionAction = () => {
    if (!subscriptionAction) return
    if (subscriptionAction === SubscriptionActionEnum.ASSOCIATE_PLAN) {
      if (!institutionId) return
      associateSubscription(
        {
          planId: row.original.id,
          institutionId
        },
        {
          onSettled: onFalse
        }
      )
    } else {
      cancelSubscription(
        {
          planId: row.original.id
        },
        {
          onSettled: onFalse
        }
      )
    }
  }

  const handleSelectInstitution = (institution: string) => {
    setInstitutionId(institution)
  }

  const handleOpenDialog = (status: SubscriptionActionEnum) => {
    onTrue()
    setSubscriptionAction(status)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            className="text-center size-5 align-middle"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem
            role="button"
            onClick={() =>
              handleOpenDialog(SubscriptionActionEnum.ASSOCIATE_PLAN)
            }
          >
            Associate plan
          </DropdownMenuItem>
          <DropdownMenuItem
            role="button"
            onClick={() =>
              handleOpenDialog(SubscriptionActionEnum.CANCEL_SUBSCRIPTION)
            }
          >
            Cancel subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert} onOpenChange={setValue}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">
              {subscriptionAction === SubscriptionActionEnum.ASSOCIATE_PLAN
                ? "Associate plan"
                : "Cancel subscription"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-[#252828]">
            Click 'Confirm' to proceed with requesting your action. Please note
            that this action is irreversible.
          </div>
          {subscriptionAction === SubscriptionActionEnum.ASSOCIATE_PLAN ? (
            <Select onValueChange={handleSelectInstitution}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Please select institution" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(institutionOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <ButtonLoading
              className={cn(
                subscriptionAction === SubscriptionActionEnum.ASSOCIATE_PLAN
                  ? null
                  : "bg-red-500 text-white hover:bg-red-600"
              )}
              disabled={
                subscriptionAction == SubscriptionActionEnum.ASSOCIATE_PLAN &&
                !institutionId
              }
              isLoading={isPendingAssociate || isPendingCancel}
              onClick={handleSubscriptionAction}
            >
              Confirm
            </ButtonLoading>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SubscriptionTableAction
