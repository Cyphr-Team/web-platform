import { cn } from "@/lib/utils.ts"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { APP_PATH } from "../../../../../constants"
import { DiscardApplication } from "../molecules/DiscardApplication"
import { Icons } from "@/components/ui/icons"

function Header() {
  const navigate = useNavigate()

  const description = `Are you sure you want to save and continue with this loan application?`

  return (
    <nav
      className={cn(
        "w-full flex justify-between items-center sticky top-0 bg-white border-b border-t",
        "md:h-20 md:pr-8 md:border-t-0"
      )}
    >
      <div className="min-w-20 truncate text-lg font-semibold md:text-2xl">
        SBA Micro Loans
      </div>
      <div className="flex gap-2">
        <DiscardApplication />
        <CustomAlertDialog
          actionClassName="finovate"
          cancelText="Cancel"
          confirmText="Save & Continue"
          description={<span className="break-keep">{description}</span>}
          title="Save and continue?"
          onConfirmed={() => {
            navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
          }}
        >
          <ButtonLoading isLoading={false} variant="outline">
            <Icons.saveApplication className="mr-1" />
            Save and continue
          </ButtonLoading>
        </CustomAlertDialog>
      </div>
    </nav>
  )
}

export default memo(Header)
