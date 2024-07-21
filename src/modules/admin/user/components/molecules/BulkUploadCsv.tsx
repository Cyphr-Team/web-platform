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
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload
} from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { useSendBulkCsvInvitation } from "../../hooks/useSendInvitation"
import { APP_PATH } from "@/constants"
import { IMemberImport } from "@/types/upload.type"
import { convertJsonArrayToCsv } from "@/utils/file.utils"
import { downloadCSVFile } from "@/utils"

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
    icon: <CheckCircle className="text-green-600 mr-2" />
  },
  VALIDATION_FAILED: {
    name: "VALIDATION_FAILED",
    message: "There were errors with your CSV. Please try again.",
    color: "bg-red-200",
    icon: <AlertOctagon className="text-red-600 mr-2" />
  },
  SENDING_FAILED: {
    name: "SENDING_FAILED",
    message: "All invitations are failed to send. Please review the errors.",
    color: "bg-red-200",
    icon: <AlertOctagon className="text-red-600 mr-2" />
  },
  SENDING_PARTIAL: {
    name: "SENDING_PARTIAL",
    message: "The CSV is partially uploaded. Please review the errors.",
    color: "bg-yellow-200",
    icon: <AlertTriangle className="text-yellow-600 mr-2" />
  },
  UNKNOWN: {
    name: "UNKNOWN",
    message: "Unknown status",
    color: "bg-white",
    icon: <></>
  }
}

export function BulkUploadCsv() {
  const csvFileInputRef = useRef<HTMLInputElement>(null)
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.UNKNOWN)
  const [preventCacheCount, setPreventCacheCount] = useState(0)
  const { mutate: mutateSendCsv, data } = useSendBulkCsvInvitation()

  const downloadCsv = useCallback(() => {
    if (!data?.data) return
    // Prepare CSV
    const headers: (keyof IMemberImport)[] = ["email", "role", "reason"]
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
    if (statuses.totalInvitations === statuses.successfulInvitations) {
      setUploadStatus(UPLOAD_STATUS.SUCCESS)
    } else if (statuses.totalInvitations === statuses.failedInvitations) {
      setUploadStatus(UPLOAD_STATUS.SENDING_FAILED)
    } else {
      setUploadStatus(UPLOAD_STATUS.SENDING_PARTIAL)
    }
  }, [data?.data])

  const handleCsvFileInputClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setUploadStatus(UPLOAD_STATUS.UNKNOWN)
    if (csvFileInputRef.current) {
      csvFileInputRef.current.click()
      // Reset currentRef for the next upload processes to be executed.
      csvFileInputRef.current.value = ""
    }
  }

  const handleCsvFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const baseUrl = `${window.location.origin}${APP_PATH.ACCEPT_INVITE}`
      const expirationDays = "SEVEN_DAYS"
      mutateSendCsv(
        { file, baseUrl, expirationDays },
        {
          onError: () => {
            setUploadStatus(UPLOAD_STATUS.VALIDATION_FAILED)
          }
        }
      )
    }
  }

  return (
    <>
      {[
        UPLOAD_STATUS.VALIDATION_FAILED,
        UPLOAD_STATUS.SENDING_FAILED,
        UPLOAD_STATUS.SENDING_PARTIAL,
        UPLOAD_STATUS.SUCCESS
      ].includes(uploadStatus) && (
        <div
          className={cn(
            "border border-dashed px-2 py-3 rounded-md flex text-base items-center font-light",
            uploadStatus.color
          )}
        >
          {uploadStatus?.icon}
          <span className="font-bold mr-1">CSV: </span>
          {uploadStatus.message}
          {data && (
            <Button
              onClick={downloadCsv}
              variant="link"
              className="p-1 font-medium underline"
            >
              View Details.
            </Button>
          )}
        </div>
      )}
      <Accordion
        type="single"
        collapsible
        className="border border-dashed px-2 rounded-md"
      >
        <AccordionItem value="csv-upload-instructions" className="border-0">
          <AccordionTrigger className="flex flex-1 w-full items-center justify-between group hover:no-underline">
            <div className="flex text-base items-center font-light">
              <span className="text-base font-light align-start text-wrap text-left">
                <span className="font-semibold">Tip:</span> Inviting more than
                10 people at once?{" "}
                <span className="underline font-semibold">Upload CSV</span>
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ol className="text-base list-decimal list-inside space-y-2">
              <li className="md:items-center flex flex-col md:flex-row mt-2 w-full justify-between">
                <span className="font-semibold text-base">
                  Step 1: Download the template
                </span>
                <ButtonLoading
                  variant="outline"
                  className="ml-2 my-2 md:my-0 p-2"
                  isLoading={downloadFile.isLoading}
                  onClick={handleClickDownload}
                >
                  <span
                    id="default-message"
                    className="items-center inline-flex"
                  >
                    <Download size={15} />
                    <span className="text-sm font-medium ml-2">
                      Download template
                    </span>
                  </span>
                </ButtonLoading>
              </li>
              <li className="flex flex-col my-2">
                <span className="font-semibold text-base">
                  Step 2: Fill out the template
                </span>
                <ul className="list-none list-inside space-y-1 text-base mt-1">
                  <li className="ml-2 font-light text-sm">
                    <span className="font-medium">Email:</span> Member’s Email
                    Address
                  </li>
                  <li className="ml-2">
                    <Accordion type="single" collapsible defaultValue="roles">
                      <AccordionItem value="roles" className="border-0">
                        <AccordionTrigger className="py-1 flex flex-auto w-full items-start md:items-center justify-start md:justify-between group hover:no-underline">
                          <span className="align-start text-wrap text-left font-light">
                            <span className="font-semibold">Role:</span> Add
                            member’s role based on the following roles
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-inside space-y-1">
                            <li className="ml-4 font-light -mt-1">
                              <span className="font-medium">
                                Workspace Admin:
                              </span>{" "}
                              The Workspace Admin can invite users, oversee
                              applications, and maintain comprehensive control
                              over the system, ensuring its smooth operation and
                              security.
                            </li>
                            <li className="ml-4 font-light">
                              <span className="font-medium">Judge:</span> The
                              Judge has limited access, allowing them to review
                              and score only the applications assigned to them,
                              ensuring an unbiased evaluation process.
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                </ul>
              </li>
              <li className="md:items-center flex flex-col md:flex-row mt-2 w-full justify-between">
                <span className="font-bold">
                  Step 3: Upload your files to send out the invites
                </span>
                <Button
                  variant="outline"
                  // type="submit"
                  className="ml-2 my-2 md:my-0 p-2"
                  onClick={handleCsvFileInputClick}
                >
                  <span
                    id="default-message"
                    className="items-center inline-flex"
                  >
                    <Upload size={15} />
                    <span className="text-sm font-medium ml-2">
                      Begin import
                    </span>
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvFileChange}
                  ref={csvFileInputRef}
                  className="hidden"
                />
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
