import { cn } from "@/lib/utils.ts"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { CloseWithoutSave } from "@/modules/loan-application/components/atoms/CloseWithoutSave.tsx"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { FC, memo, useCallback } from "react"
import { SCREEN } from "@/modules/financial-projection/constants"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

interface Props {}

const FinancialToolkitHeader: FC<Props> = () => {
  const { setCurrentScreen } = useFinancialToolkitStore.use.action()

  const handleSetCurrentScreen = useCallback(
    (target: SCREEN) => () => {
      setCurrentScreen(target)
    },
    [setCurrentScreen]
  )

  return (
    <nav
      className={cn(
        "w-full flex justify-between items-center sticky top-0 bg-white border-b border-t ",
        "md:h-20 md:pr-8 md:border-t-0 "
      )}
    >
      <div className="flex items-center gap-2 min-w-20">
        <Button
          variant="outline"
          onClick={handleSetCurrentScreen(SCREEN.ASSUMPTIONS)}
        >
          Assumptions
        </Button>
        <Button
          variant="outline"
          onClick={handleSetCurrentScreen(SCREEN.INCOME)}
        >
          Income
        </Button>
        <Button
          variant="outline"
          onClick={handleSetCurrentScreen(SCREEN.BALANCE)}
        >
          Balance
        </Button>
        <Button
          variant="outline"
          onClick={handleSetCurrentScreen(SCREEN.CASH_FLOW)}
        >
          Cash Flow
        </Button>
      </div>
      <div className="flex gap-2">
        <CloseWithoutSave />
        <CustomAlertDialog
          // TODO: do something bro
          onConfirmed={() => {}}
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

export default memo(FinancialToolkitHeader)
