import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button, ButtonLoading } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoanSummaryDownloadType } from "@/modules/loan-application-management/constants/type"
import { useQueryDownloadBulkCsvInvitationTemplate } from "@/modules/loan-application-management/hooks/useQuery/useQueryDownloadBulkCsvInvitationTemplate"
import { type IMemberImport } from "@/types/upload.type"
import { downloadCSVFile } from "@/utils"
import { convertJsonArrayToCsv } from "@/utils/file.utils"
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Download,
  File,
  Trash2,
  UploadCloud,
  XIcon
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSendBulkCsvInvitation } from "../hooks/useSendInvitation"

import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { DETAILS_PERMISSION_BY_ROLE } from "../constants/permission.constants"
import { convertBytesToMB } from "@/utils/converter.utils"
import { APP_PATH } from "@/constants"
import { ExpirationDays } from "@/types/expiration-day.type"
import { UserRoles } from "@/types/user.type"

const UPLOAD_STATUS = {
  UPLOADING: {
    name: "UPLOADING",
    message: "Uploading...",
    color: "bg-blue",
    icon: <></>
  },
  SUCCESS: {
    name: "SUCCESS",
    message: "All records have been successfully added.",
    color: "bg-green-200",
    icon: <CheckCircle className="mr-2 text-green-600" />
  },
  VALIDATION_FAILED: {
    name: "VALIDATION_FAILED",
    message: "There were errors with your CSV. Please try again.",
    color: "bg-red-200",
    icon: <AlertOctagon className="mr-2 text-red-600" />
  },
  SENDING_FAILED: {
    name: "SENDING_FAILED",
    message: "All invitations are failed to send. Please review the errors.",
    color: "bg-red-200",
    icon: <AlertOctagon className="mr-2 text-red-600" />
  },
  SENDING_PARTIAL: {
    name: "SENDING_PARTIAL",
    message: "The CSV is partially uploaded. Please review the errors.",
    color: "bg-yellow-200",
    icon: <AlertTriangle className="mr-2 text-yellow-600" />
  },
  UNKNOWN: {
    name: "UNKNOWN",
    message: "Unknown status",
    color: "bg-white",
    icon: <></>
  }
}

interface DialogUploadCSVProps {
  onFileSelect: (files: FileList, field?: string) => void
  multiple?: boolean
  field?: string
  className?: string
}

export function DialogUploadCSV(props: DialogUploadCSVProps) {
  const { onFileSelect, field } = props

  const csvFileInputRef = useRef<HTMLInputElement>(null)
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.UNKNOWN)
  const [preventCacheCount, setPreventCacheCount] = useState(0)
  const { mutate: mutateSendCsv, data, isPending } = useSendBulkCsvInvitation()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true)
    } else if (event.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDragActive(false) // Reset the border style on drop
    const file = event.dataTransfer.files?.[0] // Using optional chaining

    if (file) {
      onFileSelect(event.dataTransfer.files, field) // Assuming this is still needed
      setSelectedFile(file) // Update the state with the dropped file
    }
  }

  const downloadCsv = useCallback(() => {
    if (!data?.data) return
    // Prepare CSV
    const headers: (keyof IMemberImport)[] = ["email", "role"]
    const csvString = convertJsonArrayToCsv(data.data.detail, headers)
    // Prepare download
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")

    downloadCSVFile(csvString, `invitation_details_${timestamp}.csv`)
  }, [data?.data])

  const handleClickDownload = () => {
    setPreventCacheCount((preState) => preState + 1)
  }

  const downloadFile = useQueryDownloadBulkCsvInvitationTemplate({
    type: LoanSummaryDownloadType.CSV,
    preventCacheCount
  })

  useEffect(() => {
    if (!data?.data) return
    const statuses = data?.data

    switch (true) {
      case statuses.totalInvitations === statuses.failedInvitations:
        setUploadStatus(UPLOAD_STATUS.SENDING_FAILED)
        break
      case statuses.totalInvitations === statuses.successfulInvitations:
        setUploadStatus(UPLOAD_STATUS.SUCCESS)
        break
      default:
        setUploadStatus(UPLOAD_STATUS.SENDING_PARTIAL)
        break
    }
  }, [data?.data])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]

      onFileSelect(event.target.files, field) // Assuming this is still needed
      setSelectedFile(file) // Store the selected file
    }

    event.target.value = "" // Reset the input
  }

  const handleSendInvitation = () => {
    if (selectedFile) {
      const baseUrl = `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`
      const expirationDays = ExpirationDays.SEVEN_DAYS.toUpperCase()

      setUploadStatus(UPLOAD_STATUS.UPLOADING)
      mutateSendCsv(
        { file: selectedFile, baseUrl, expirationDays },
        {
          onError: () => {
            setUploadStatus(UPLOAD_STATUS.VALIDATION_FAILED)
          }
        }
      )
    }
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <strong className="underline hover:cursor-pointer hover:opacity-80">
          Upload CSV
        </strong>
      </DialogTrigger>

      <DialogContent className="max-h-full overflow-y-auto sm:max-w-[700px] md:h-auto md:max-h-dvh">
        <DialogClose
          className="absolute top-0 right-0 p-6"
          onClick={() => setIsOpenDialog(false)}
        >
          <XIcon />
        </DialogClose>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="font-bold text-xl">
            Invite team members
          </DialogTitle>
        </DialogHeader>

        {[
          UPLOAD_STATUS.VALIDATION_FAILED,
          UPLOAD_STATUS.SENDING_FAILED,
          UPLOAD_STATUS.SENDING_PARTIAL,
          UPLOAD_STATUS.SUCCESS
        ].includes(uploadStatus) && (
          <div
            className={cn(
              "flex flex-row items-center rounded-md border border-dashed px-2 py-3 text-base font-light",
              uploadStatus.color
            )}
          >
            <div className="self-start">{uploadStatus?.icon}</div>

            <div className="flex flex-col self-start">
              <div className="flex flex-row self-start">
                <span className="mr-1 font-bold">CSV: </span>
                <span>
                  {uploadStatus.message}
                  {data ? (
                    <Button
                      className="h-7 items-start p-0 px-1 pt-0.5 font-medium underline"
                      variant="link"
                      onClick={downloadCsv}
                    >
                      View Details.
                    </Button>
                  ) : null}
                </span>
              </div>

              {[UPLOAD_STATUS.SENDING_PARTIAL, UPLOAD_STATUS.SUCCESS].includes(
                uploadStatus
              ) && (
                <div className="text-sm text-muted-foreground">
                  Please note that it will take a few minutes to add all new
                  team members to the system. We will notify you once the
                  process is complete.
                </div>
              )}
            </div>
          </div>
        )}

        <ol className="list-inside space-y-2 text-base">
          <li className="mt-2 flex w-full flex-col justify-between md:flex-row md:items-center">
            <span className="text-base font-semibold">
              Step 1: Download the template
            </span>

            <ButtonLoading
              className="my-2 ml-2 p-2 md:my-0"
              isLoading={downloadFile.isLoading}
              variant="outline"
              onClick={handleClickDownload}
            >
              <span className="inline-flex items-center" id="default-message">
                <Download size={15} />

                <span className="ml-2 text-sm font-medium">
                  Download template
                </span>
              </span>
            </ButtonLoading>
          </li>
          <li className="my-2 flex flex-col">
            <span className="text-base font-semibold">
              Step 2: Fill out the template
            </span>

            <ul className="mt-1 list-inside list-none space-y-1 text-base">
              <li className="ml-2 text-sm font-light">
                <span className="font-medium">Email: </span>
                Member’s Email Address
              </li>

              <li className="ml-2">
                <Accordion collapsible defaultValue="roles" type="single">
                  <AccordionItem className="border-0" value="roles">
                    <AccordionTrigger className="group flex w-full flex-auto items-start justify-start py-1 hover:no-underline md:items-center md:justify-between">
                      <span className="align-start text-wrap text-left font-light">
                        <span className="font-semibold">Role:</span> Add
                        member’s role based on the following roles
                      </span>
                    </AccordionTrigger>

                    <AccordionContent>
                      <ul className="list-inside space-y-1">
                        <li className="-mt-1 ml-4 font-light">
                          <span className="font-medium">
                            {UserRoles.WORKSPACE_ADMIN}:{" "}
                          </span>
                          {
                            DETAILS_PERMISSION_BY_ROLE[
                              UserRoles.WORKSPACE_ADMIN
                            ]
                          }
                        </li>

                        <li className="ml-4 font-light">
                          <span className="font-medium">
                            {UserRoles.REVIEWER}:{" "}
                          </span>
                          {DETAILS_PERMISSION_BY_ROLE[UserRoles.REVIEWER]}
                        </li>

                        <li className="ml-4 font-light">
                          <span className="font-medium">
                            {UserRoles.VIEWER}:{" "}
                          </span>
                          {DETAILS_PERMISSION_BY_ROLE[UserRoles.VIEWER]}
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            </ul>
          </li>

          <li className="mt-2 w-full">
            <span className="font-bold">
              Step 3: Upload your files to send out the invites
            </span>

            <form
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Card
                className={`
                   border-dashed mt-6 justify-content flex cursor-pointer flex-col items-center gap-lg p-xl shadow-none
                  ${dragActive ? "border-dashed border-primary" : ""}
                  data-drag='true'
                `}
                data-drag={dragActive}
                onClick={() => csvFileInputRef.current?.click()}
              >
                <div className="rounded-md border p-md">
                  <UploadCloud className="size-5" />
                </div>
                <div className="text-center text-sm text-text-tertiary">
                  <span className="font-semibold text-text-primary">
                    Click to upload
                  </span>
                  <span> or drag and drop</span>
                  <p className="text-xs">
                    (only CSV files are supported at this time)
                  </p>
                </div>
              </Card>

              <input
                ref={csvFileInputRef}
                accept=".csv"
                className="hidden"
                type="file"
                onChange={handleFileSelect}
              />

              {selectedFile ? (
                <div className="mt-4">
                  <div className="flex justify-between items-center border border-[#EAECF0] rounded-xl p-6">
                    <div className="flex gap-2">
                      <File size={20} />
                      <div>
                        <div className="text-sm"> {selectedFile.name}</div>
                        <div className="text-sm">
                          {convertBytesToMB(selectedFile.size, 4)} MB - 100%
                          uploaded
                        </div>
                      </div>
                    </div>
                    <div onClick={() => setSelectedFile(null)}>
                      <Trash2
                        className="hover hover:cursor-pointer hover:opacity-80"
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </form>
          </li>
        </ol>

        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpenDialog(false)}
          >
            Cancel
          </Button>
          <ButtonLoading
            disabled={!selectedFile}
            isLoading={isPending}
            type="button"
            onClick={handleSendInvitation}
          >
            Send
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
