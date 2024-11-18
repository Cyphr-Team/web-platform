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
  assigningJudgeFormSchema,
  type AssigningJudgeFormValue
} from "../../../constants/form"

import { JudgeAvatar } from "@/modules/loan-application-management/components/atoms/JudgeAvatar"
import { getStageScoreInfo } from "@/modules/loan-application-management/services/score.service"
import { X } from "lucide-react"
import { cn } from "../../../../../lib/utils"
import {
  convertUserDetailInfoToJudgeInfo,
  type JudgeInfo
} from "../../../../../types/application/application-assign.type"
import { type LoanStage } from "../../../../loan-application-management/constants/types/application"
import { type UpdateAssignedJudgeRequest } from "../../../../loan-application-management/constants/types/judge"
import { useUpdateJudgesApplication } from "../../../../loan-application-management/hooks/useMutation/useUpdateJudgesApplication"
import { useQueryApplicationWithStageScoresResponse } from "../../../../loan-application-management/hooks/useQuery/useQueryApplicationWithStageScoresResponse"
import { useQueryGetAssignableJudgeList } from "../../../../loan-application-management/hooks/useQuery/useQueryGetAssignableList"
import { MultiSelect } from "./MultiSelectJudge"

interface Props {
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
export function WrapperDialogModifyAssignedJudges({
  applicationId,
  currentStage,
  disabled
}: {
  applicationId: string
  currentStage: LoanStage
  disabled: boolean
}) {
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
          className={cn(
            "mr-1 size-auto shrink-0 p-0",
            disabled && "opacity-20"
          )}
          disabled={disabled}
          size="icon"
          type="button"
          variant="ghost"
        >
          <img
            alt="add-judge"
            className="logo size-5"
            src={assignJudgePlusIcon}
          />
        </Button>
      </DialogTrigger>

      {open ? (
        <DialogModifyAssignedJudges
          applicationId={applicationId}
          currentStage={currentStage}
          disabled={disabled}
          onCloseDialogContent={() => {
            setOpen(false)
          }}
        />
      ) : null}
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
        currentStage,
        applicationWithStageScoresResponseQuery.data.stages
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
        (judgeId) => !onlineDataId.includes(judgeId)
      )

      const removingJudges = onlineDataId.filter(
        (judgeId) => !offlineDataId.includes(judgeId)
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
    <DialogContent className="flex h-4/5 min-w-[50%] flex-col overflow-hidden p-0">
      <DialogHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
        <DialogTitle className="text-xl font-semibold">
          Assign this Application
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="flex flex-1 flex-col overflow-hidden p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="flex flex-col items-start space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
            <div className="mt-1 flex w-full gap-3 lg:flex-row">
              <MultiSelect
                defaultValue={searchBarJudges}
                options={assignableOffline}
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

          <div className="flex flex-1 flex-col overflow-auto">
            {assignedOffline.map((judge) => {
              return (
                <div key={judge.id} className="my-3 flex flex-row items-center">
                  <Button
                    className="mr-1 size-auto p-1"
                    type="button"
                    variant="ghost"
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
                      className="size-4 shrink-0 text-stone-300"
                      strokeWidth={2.75}
                    />
                  </Button>

                  <div className="relative shrink-0">
                    <JudgeAvatar
                      avatar={judge?.avatar}
                      email={judge?.name}
                      isScored={stageInfo?.scoredJudges?.some(
                        (scoredJudge) => scoredJudge?.judgeId === judge?.id
                      )}
                      name={judge?.name}
                    />
                  </div>

                  <div className="ml-2 flex flex-col">
                    <span className="text-sm">{judge.name}</span>
                    <span className="text-xs text-text-tertiary">
                      {judge.email}
                    </span>
                  </div>
                  <div className="flex-1 flex-row justify-center" />
                  <span className="mr-2 text-xs font-medium text-zinc-700">
                    Judge
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mb-4 ml-auto mr-3 mt-8 text-base font-semibold">
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
              isLoading={isPending}
              type="submit"
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
