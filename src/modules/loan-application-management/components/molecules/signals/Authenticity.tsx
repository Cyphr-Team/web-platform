import {
  getAuthenticityDataByScore,
  getClassNameFromStatus
} from "@/modules/loan-application-management/services"
import React from "react"
import { cn } from "@/lib/utils"
import { AuthenticityType } from "@/modules/loan-application-management/constants/types/document"

type Props = {
  authenticity?: AuthenticityType
}

export const AuthenticityScore: React.FC<Props> = ({ authenticity }) => {
  if (!authenticity) {
    return null
  }

  const authenticityData = getAuthenticityDataByScore(authenticity?.score)

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
            <b>{`Authenticity score ${authenticity.score}/100`}: </b>
            {authenticityData?.description}
          </p>
        </div>
      </div>
      <ul className="p-xl pl-3xl list-disc text-sm font-normal">
        {authenticity?.reasonCode?.map((reason, index) => (
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
