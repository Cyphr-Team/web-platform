import assignJudgePlusIcon from "@/assets/assign-judge-plus.svg"
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
import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  AssigningJudgeFormValue,
  assigningJudgeFormSchema
} from "../../../constants/form"

import { JudgeAvatar } from "@/modules/loan-application-management/components/atoms/JudgeAvatar"
import { getStageScoreInfo } from "@/modules/loan-application-management/services/score.service"
import { X } from "lucide-react"
import { cn } from "../../../../../lib/utils"
import {
  JudgeInfo,
  convertUserDetailInfoToJudgeInfo
} from "../../../../../types/application/application-assign.type"
import { LoanStage } from "../../../../loan-application-management/constants/types/application"
import { UpdateAssignedJudgeRequest } from "../../../../loan-application-management/constants/types/judge"
import { useUpdateJudgesApplication } from "../../../../loan-application-management/hooks/useMutation/useUpdateJudgesApplication"
import { useQueryApplicationWithStageScoresResponse } from "../../../../loan-application-management/hooks/useQuery/useQueryApplicationWithStageScoresResponse"
import { useQueryGetAssignableJudgeList } from "../../../../loan-application-management/hooks/useQuery/useQueryGetAssignableList"
import { MultiSelect } from "./MultiSelectJudge"

type Props = {
  applicationId: string
  currentStage: LoanStage
  onCloseDialogContent: () => void
  disabled: boolean
}
/**
 * Logic flow:
 * - When the popup dialog open, get the "assignable online" -> "assignableOffline"; "applicationWithStageScoresResponse.stage online" -> "assignedOffline"
 * - Then the search popup open, we handle internally "search popup", then close it, will call the onClose to update assignedOffline and assignableOffline
 * - When submit, send the assignedOffline to server
 */
export const WrapperDialogModifyAssignedJudges = ({
  applicationId,
  currentStage,
  disabled
}: {
  applicationId: string
  currentStage: LoanStage
  disabled: boolean
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
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "p-0 h-auto w-auto flex-shrink-0 mr-1",
            disabled && "opacity-20"
          )}
          type="button"
          disabled={disabled}
        >
          <img
            src={assignJudgePlusIcon}
            className="logo w-5 h-5"
            alt="add-judge"
          />
        </Button>
      </DialogTrigger>

      {open && (
        <DialogModifyAssignedJudges
          disabled={disabled}
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

  const { mutate, isPending } = useUpdateJudgesApplication(applicationId)
  const [assignableOffline, setAssignableOffline] = useState<JudgeInfo[]>([])
  const [defaultAssignedOnline, setDefaultAssignedOnline] = useState<
    JudgeInfo[]
  >([])
  const [assignedOffline, setAssignedOffline] = useState<JudgeInfo[]>([])
  const [searchBarJudges, setSearchBarJudges] = useState<JudgeInfo[]>([])
  const [isSendButtonType, setIsSendButtonType] = useState<boolean>(false)

  const handledUpdateAssignedJudge = () => {
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

  const stageInfo = applicationWithStageScoresResponseQuery?.data?.stages
    ? getStageScoreInfo(
        applicationWithStageScoresResponseQuery.data.stages,
        currentStage
      )
    : null

  const checkIsSendOrSave = useCallback(
    ({
      offlineData,
      onlineData
    }: {
      offlineData: JudgeInfo[]
      onlineData: JudgeInfo[]
    }) => {
      const offlineDataId = offlineData.map((item) => item.id)
      const onlineDataId = onlineData.map((item) => item.id)

      const addingJudges = offlineDataId.filter(
        (judgeId) => onlineDataId.indexOf(judgeId) < 0
      )

      const removingJudges = onlineDataId.filter(
        (judgeId) => offlineDataId.indexOf(judgeId) < 0
      )

      const isSendButton =
        addingJudges.length > 0 && removingJudges.length === 0
      setIsSendButtonType(isSendButton)
    },
    [setIsSendButtonType] // Dependencies array
  )

  const onAddButtonTap = useCallback(
    (selectedJudges: JudgeInfo[]) => {
      const newAssignedOffline = [...selectedJudges, ...assignedOffline]
      const newAssignableOffline = assignableOffline.filter(
        (itemA) => !selectedJudges.some((itemB) => itemB.id === itemA.id)
      )
      setAssignedOffline(newAssignedOffline)
      setAssignableOffline(newAssignableOffline)

      checkIsSendOrSave({
        offlineData: newAssignedOffline,
        onlineData: defaultAssignedOnline
      })
      setSearchBarJudges([])
    },
    [
      assignableOffline,
      assignedOffline,
      defaultAssignedOnline,
      checkIsSendOrSave
    ]
  )

  useEffect(() => {
    if (applicationWithStageScoresResponseQuery.data) {
      const applicationScore =
        applicationWithStageScoresResponseQuery.data.stages.find(
          (e) => e.stage.toLowerCase() == currentStage.toLowerCase()
        )

      if (applicationScore) {
        const judges = applicationScore.scoreInfo.map((judge) => {
          const judgeInfo: JudgeInfo = {
            id: judge.judgeId,
            name: judge.judgeName,
            email: judge.judgeEmail,
            avatar: judge.judgeAvatar ?? ""
          }
          return judgeInfo
        })
        setDefaultAssignedOnline(judges)
        setAssignedOffline(judges)
      }
    }
  }, [applicationWithStageScoresResponseQuery.data, currentStage])

  useEffect(() => {
    if (assignableJudgesOnlineQuery.data) {
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

  return (
    <DialogContent className="min-w-[50%] h-[80%] p-0 overflow-hidden flex flex-col">
      <DialogHeader className="p-4 sm:p-6 pb-0 sm:pb-0">
        <DialogTitle className="font-semibold text-xl">
          Assign this Application
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="flex flex-col flex-1 overflow-hidden p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-start">
            <div className="flex lg:flex-row gap-3 w-full mt-1">
              <MultiSelect
                options={assignableOffline}
                defaultValue={searchBarJudges}
                placeholder="Invite others by name, email"
                onAddButtonTap={onAddButtonTap}
                onChangeValues={(value) => {
                  setSearchBarJudges(value)
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-row justify-between">
            <span className="text-lg font-semibold">People with Access</span>
            <span className="text-lg font-semibold">Role</span>
          </div>

          <Separator className="mt-3 shadow" />

          <div className="overflow-auto flex flex-col flex-1">
            {assignedOffline.map((judge) => {
              return (
                <div
                  className="flex flex-row items-center mt-3 mb-3"
                  key={judge.id}
                >
                  <Button
                    variant="ghost"
                    className="w-auto h-auto p-1 mr-1"
                    type="button"
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

                      checkIsSendOrSave({
                        offlineData: newAssignedOffline,
                        onlineData: defaultAssignedOnline
                      })
                    }}
                  >
                    <X
                      className="w-4 h-4 text-stone-300 flex-shrink-0"
                      strokeWidth={2.75}
                    />
                  </Button>

                  <div className="flex-shrink-0 relative">
                    <JudgeAvatar
                      avatar={judge?.avatar}
                      name={judge?.name}
                      email={judge?.name}
                      isScored={stageInfo?.scoredJudges?.some(
                        (scoredJudge) => scoredJudge?.judgeId === judge?.id
                      )}
                    />
                  </div>

                  <div className="ml-2 flex flex-col">
                    <span className="text-sm">{judge.name}</span>
                    <span className="text-xs text-text-tertiary">
                      {judge.email}
                    </span>
                  </div>
                  <div className="flex-1 flex-row justify-center"></div>
                  <span className="text-xs font-medium mr-2 text-zinc-700">
                    Judge
                  </span>
                </div>
              )
            })}
          </div>

          <div className="ml-auto mt-8 mb-4 font-semibold text-base mr-3">
            Total People Assigned:{" "}
            <span className="ml-1">{assignedOffline.length}</span>
          </div>

          <Separator className="-mx-8 w-[200%]" />

          <DialogFooter className="mt-4 ">
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
              {isSendButtonType ? "Send" : "Save"}
            </ButtonLoading>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
