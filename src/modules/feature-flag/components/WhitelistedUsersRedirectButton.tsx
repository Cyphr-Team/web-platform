import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { isEnableWhitelistedUsers } from "@/utils/feature-flag.utils"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {
  id: string
}

export const WhitelistedUsersRedirectButton: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate()

  if (!isEnableWhitelistedUsers()) {
    return null
  }

  return (
    <Button
      size="sm"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(APP_PATH.FEATURE_FLAGS.whitelisted(id))
      }}
    >
      <User size={16} />
    </Button>
  )
}
