import { cn } from "@/lib/utils.ts"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { FC, memo } from "react"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "../../../../../constants"
import { CloseWithoutSave } from "../molecules/CloseWithoutSave"

interface Props {}

const Header: FC<Props> = () => {
  const navigate = useNavigate()
  return (
    <nav
      className={cn(
        "w-full flex justify-between items-center sticky top-0 bg-white border-b border-t",
        "md:h-20 md:pr-8 md:border-t-0"
      )}
    >
      <div className="text-lg font-semibold truncate min-w-20 md:text-2xl">
        SBA Micro Loans
      </div>
      <div className="flex gap-2">
        <CloseWithoutSave />
        <CustomAlertDialog
          onConfirmed={() => {
            navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
          }}
          actionClassName="finovate"
          title="Save & Close?"
          cancelText="Cancel"
          confirmText="Save & Close"
          description="Are you sure you want to save and close this loan application?"
        >
          <ButtonLoading isLoading={false}>Save & Close</ButtonLoading>
        </CustomAlertDialog>
      </div>
    </nav>
  )
}

export default memo(Header)
