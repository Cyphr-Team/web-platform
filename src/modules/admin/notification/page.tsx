import { AppAlert } from "@/components/ui/alert"
import { APP_PATH } from "@/constants"
import { useNotification } from "@/hooks/useNotification"
import { format } from "date-fns"
import { Clock } from "lucide-react"
import { Link } from "react-router-dom"

export function Component() {
  const { data } = useNotification()

  return (
    <div className="container mx-auto py-4xl">
      <h1 className="text-3xl font-semibold mb-4">Notifications</h1>
      {data?.map(
        (
          noti: {
            createdAt: string
            id: string
            loanProgram: { name: string }
          },
          index: number
        ) => {
          return (
            <AppAlert
              key={noti?.id ?? index}
              variant="success"
              title="A new loan application has been submitted!"
              description={
                <div className="flex flex-col gap-2">
                  <Link
                    to={`${APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYB.detail(
                      noti.id
                    )}`}
                    className="underline"
                  >
                    Click to view detail
                  </Link>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <p>
                      {format(
                        noti?.createdAt ?? new Date(),
                        "hh:mm a - LLL dd, y"
                      )}
                    </p>
                  </div>
                </div>
              }
            />
          )
        }
      )}
    </div>
  )
}

Component.displayName = "LoanApplication"
