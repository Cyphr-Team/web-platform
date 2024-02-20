import { AuthenticityType } from "@/modules/loan-application-management/constants/type"
import { getClassNameFromStatus } from "@/modules/loan-application-management/services"
import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  authenticityData?: AuthenticityType
}

export const AuthenticityScore: React.FC<Props> = ({ authenticityData }) => {
  if (!authenticityData) {
    return null
  }
  const className = getClassNameFromStatus(authenticityData?.authenticityLevel)

  const backgroundByStatus = {
    success: "bg-success-50",
    error: "bg-error-50",
    warning: "bg-warning-50"
  }

  const borderColorByStatus = {
    success: "border-success",
    error: "border-error",
    warning: "border-warning"
  }

  return (
    <div
      className={cn(
        `flex flex-col rounded-xl border`,
        backgroundByStatus[className],
        borderColorByStatus[className]
      )}
    >
      <div
        className={`p-lg flex gap-xl border-b ${borderColorByStatus[className]}`}
      >
        <div>
          <div
            className="rounded-full h-6 w-6"
            style={{
              backgroundColor: authenticityData?.authenticityLevelColor
            }}
          ></div>
        </div>

        <div>
          <p className="text-sm font-normal">
            <b>{authenticityData?.title}: </b>
            {authenticityData?.description}
          </p>
        </div>
      </div>
      <ul className="p-xl pl-3xl list-disc text-sm font-normal">
        {authenticityData?.reasonCodeDescription?.map((reason, index) => (
          <li key={index}>
            <span
              className="data-[highlighted=true]:text-text-error first-letter:capitalize block"
              data-highlighted={reason.shouldHighlight}
            >
              {reason.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
