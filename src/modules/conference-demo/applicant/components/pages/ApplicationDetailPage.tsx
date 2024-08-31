import { ApplicationDetailTemplate } from "@/modules/conference-demo/applicant/components/templates"
import { isEnableConferenceDemo } from "@/utils/feature-flag.utils.ts"
import useRouter from "@/hooks/useRouter.ts"
import { APP_PATH } from "@/constants"
import { useEffect } from "react"

const ApplicationDetailPage = () => {
  const { replace } = useRouter()

  useEffect(() => {
    // if flag is disable, we navigate user to APP_PATH.LOAN_APPLICATION.INDEX
    if (!isEnableConferenceDemo()) {
      replace(APP_PATH.LOAN_APPLICATION.INDEX)
    }
  }, [replace])

  return (
    <div className="w-full p-4 md:p-8 flex-1 overflow-auto">
      <ApplicationDetailTemplate />
    </div>
  )
}
export default ApplicationDetailPage
