import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx"
import { Form } from "@/components/ui/form.tsx"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  AssigningJudgeFormValue,
  assigningJudgeFormSchema
} from "../../../constants/form"
import assignJudgePlusIcon from "@/assets/assign-judge-plus.svg"

import { cn } from "../../../../../lib/utils"
import { MultiSelect } from "./MultiSelectJudge"
import { useUpdateJudgesApplication } from "../../../../loan-application-management/hooks/useMutation/useUpdateJudgesApplication"
import { LoanStage } from "../../../../loan-application-management/constants/types/application"
import { UpdateAssignedJudgeRequest } from "../../../../loan-application-management/constants/types/judge"
import { toastError } from "../../../../../utils"
import { useQueryApplicationWithStageScoresResponse } from "../../../../loan-application-management/hooks/useQuery/useQueryApplicationWithStageScoresResponse"
import { useQueryGetAssignableJudgeList } from "../../../../loan-application-management/hooks/useQuery/useQueryGetAssignableList"
import { ChevronDown, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  JudgeInfo,
  convertUserDetailInfoToJudgeInfo
} from "../../../../../types/application/application-assign.type"

type Props = {
  applicationId: string
  currentStage: LoanStage
  onCloseDialogContent: () => void
}
/**
 * Logic flow:
 * - When the popup dialog open, get the "assignable online" -> "assignableOffline"; "applicationWithStageScoresResponse.stage online" -> "assignedOffline"
 * - Then the search popup open, we handle internally "search popup", then close it, will call the onClose to update assignedOffline and assignableOffline
 * - When submit, send the assignedOffline to server
 */

export const WrapperDialogModifyAssignedJudges = ({
  applicationId,
  currentStage
}: {
  applicationId: string
  currentStage: LoanStage
}) => {
  const [open, setOpen] = useState(false)
  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <img
          src={assignJudgePlusIcon}
          className="logo w-5 h-5 mr-2"
          alt="add-judge"
        />
      </DialogTrigger>
      {open && (
        <DialogModifyAssignedJudges
          applicationId={applicationId}
          currentStage={currentStage}
          onCloseDialogContent={() => {
            setOpen(false)
          }}
        />
      )}
    </Dialog>
  )
}

const DialogModifyAssignedJudges: React.FC<Props> = ({
  applicationId,
  currentStage,
  onCloseDialogContent
}) => {
  const MAXIMUM_JUDGES_IN_ONE_APPLICATION_STAGE = 8

  const form = useForm<AssigningJudgeFormValue>({
    resolver: zodResolver(assigningJudgeFormSchema),
    defaultValues: {
      user: { value: "", label: "" }
    }
  })

  const assignableJudgesOnlineQuery = useQueryGetAssignableJudgeList({
    applicationId: applicationId,
    enabled: !!applicationId
  })

  const applicationWithStageScoresResponseQuery =
    useQueryApplicationWithStageScoresResponse({
      applicationId: applicationId,
      enabled: !!applicationId
    })

  useEffect(() => {
    if (assignableJudgesOnlineQuery.data) {
      // Make a copy of the data to sort
      const judgeInfosOnline = assignableJudgesOnlineQuery.data.map((e) => {
        return convertUserDetailInfoToJudgeInfo(e)
      })
      const sortedData = [...judgeInfosOnline].sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
      setAssignableOffline(sortedData)
    }
  }, [assignableJudgesOnlineQuery.data])

  useEffect(() => {
    if (applicationWithStageScoresResponseQuery.data) {
      const currentStage =
        applicationWithStageScoresResponseQuery.data.stage ?? LoanStage.ROUND_1 // TODO: Remove mock data
      const applicationScore =
        applicationWithStageScoresResponseQuery.data.stages.find(
          (e) => e.stage.toLowerCase() == currentStage.toLowerCase()
        )
      if (applicationScore) {
        const judges = applicationScore.scoreInfo.map((e) => {
          const judgeInfo: JudgeInfo = {
            id: e.judgeId,
            name: e.judgeName,
            email: e.judgeEmail,
            avatar: e.judgeAvatar ?? ""
          }
          return judgeInfo
        })
        setAssignedOffline(judges)
      }
    }
  }, [applicationWithStageScoresResponseQuery.data]) // Assigned

  const { mutate, isPending } = useUpdateJudgesApplication(applicationId)
  const [assignableOffline, setAssignableOffline] = useState<JudgeInfo[]>([])
  const [assignedOffline, setAssignedOffline] = useState<JudgeInfo[]>([])

  const handledUpdateAssignedJudge = () => {
    if (assignedOffline.length > MAXIMUM_JUDGES_IN_ONE_APPLICATION_STAGE) {
      toastError({
        title: "Error",
        description: `The assigned judge maximum is ${MAXIMUM_JUDGES_IN_ONE_APPLICATION_STAGE}`
      })
      return
    }
    const updateRequest: UpdateAssignedJudgeRequest = {
      userIds: assignedOffline.map((e) => e.id),
      applicationId: applicationId,
      stage: currentStage
    }
    mutate(updateRequest, {
      onSuccess() {
        onCloseDialogContent()
      }
    })
  }
  return (
    <DialogContent className="min-w-[50%] h-[80%] p-0 overflow-hidden flex flex-col">
      <DialogHeader className="p-4 sm:p-6 pb-0 sm:pb-0">
        <DialogTitle>Assign this Application</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="flex flex-col flex-1 overflow-hidden p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-start">
            <div className="flex lg:flex-row gap-3 w-full">
              <MultiSelect
                options={assignableOffline}
                defaultValue={[]}
                placeholder="Invite others by name, email"
                maxCount={8}
                onClose={(selectedJudges) => {
                  const newAssignedOffline = [
                    ...selectedJudges,
                    ...assignedOffline
                  ]
                  const newAssignableOffline = assignableOffline.filter(
                    (itemA) =>
                      !selectedJudges.some((itemB) => itemB.id === itemA.id)
                  )
                  setAssignedOffline(newAssignedOffline)
                  setAssignableOffline(newAssignableOffline)
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-row justify-between">
            <span className="text-base font-bold">People with Access</span>
            <span className="text-base font-bold">Role</span>
          </div>
          <Separator className="mt-3" />
          <div className="overflow-auto flex-1">
            {assignedOffline.map((judge) => {
              return (
                <div className=" flex flex-row items-center mt-4 mb-4">
                  <X
                    className="w-5 h-5 mr-4"
                    color="#CCCCCC"
                    strokeWidth={3}
                    onClick={() => {
                      const newAssignableOffline = [
                        judge,
                        ...assignableOffline
                      ].sort((a, b) => {
                        if (a.name < b.name) return -1
                        if (a.name > b.name) return 1
                        return 0
                      })
                      const newAssignedOffline = assignedOffline.filter(
                        (assigned) => judge.id != assigned.id
                      )
                      setAssignedOffline(newAssignedOffline)
                      setAssignableOffline(newAssignableOffline)
                    }}
                  />
                  <Avatar
                    className={cn(
                      "h-8 w-8 rounded-full overflow-hidden outline outline-slate-400 bg-white"
                    )}
                  >
                    <AvatarImage src={judge.avatar} alt={judge.name ?? ""} />
                    <AvatarFallback className="flex flex-row align-middle items-center justify-center h-full">
                      {judge.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex flex-col">
                    <span className="text-sm">{judge.name}</span>
                    <span className="text-xs text-slate-400	">
                      {judge.email}
                    </span>
                  </div>
                  <div className="flex-1 flex-row justify-center"></div>
                  <span className="text-sm">Judge</span>
                  <ChevronDown className="w-6 h-6 ml-9 mr-2" color="#344054" />
                </div>
              )
            })}
          </div>
          <Separator className="-mx-8 w-[200%]" />
          <DialogFooter className="mt-6 ">
            <Button
              variant="outline"
              onClick={() => {
                onCloseDialogContent()
              }}
            >
              Cancel
            </Button>
            <ButtonLoading
              type="submit"
              isLoading={isPending}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handledUpdateAssignedJudge()
              }}
            >
              Submit
            </ButtonLoading>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
