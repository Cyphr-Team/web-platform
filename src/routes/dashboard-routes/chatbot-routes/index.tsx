import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

const chatbotRoutes = (
  <Route path={APP_PATH.CHAT.all}>
    {/* SESSION HISTORY MANAGEMENT */}
    <Route
      lazy={() => import("@/modules/admin/user/session-history-page")}
      path={APP_PATH.CHAT.sessionHistory(":id")}
    />

    {/* CONVERSATIONS MANAGEMENT */}
    <Route
      lazy={() => import("@/modules/admin/user/conversation-page")}
      path={APP_PATH.CHAT.conversations(":id")}
    />
  </Route>
)

export { chatbotRoutes }
