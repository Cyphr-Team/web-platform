import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

type VerificationItemProps = {
  title: string
  description?: string
  status: "warning" | "approved" | "rejected"
}

export const VerificationItem: React.FC<VerificationItemProps> = ({
  title,
  description,
  status
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-primary font-medium text-sm">{title}</p>
        <p className="text-text-secondary">{description}</p>
      </div>
      <div className="flex items-center">
        <div className="ml-lg">
          {status === "warning" && (
            <div className="w-12 h-12">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-warning-secondary">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </AspectRatio>{" "}
            </div>
          )}
          {status === "approved" && (
            <div className="w-12 h-12">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-success-secondary">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </AspectRatio>{" "}
            </div>
          )}
          {status === "rejected" && (
            <div className="w-12 h-12">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-error-secondary">
                  <AlertCircle className="w-6 h-6 text-error" />
                </div>
              </AspectRatio>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

VerificationItem.defaultProps = {
  status: "approved"
}
export default VerificationItem
