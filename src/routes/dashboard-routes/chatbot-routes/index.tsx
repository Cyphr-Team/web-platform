import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

const chatbotRoutes = (
  <Route path={APP_PATH.CHAT.all}>
    {/* SESSION HISTORY MANAGEMENT */}
    <Route
      path={APP_PATH.CHAT.sessionHistory(":id")}
      lazy={() => import("@/modules/admin/user/session-history-page")}
    />

    {/* CONVERSATIONS MANAGEMENT */}
    <Route
      path={APP_PATH.CHAT.conversations(":id")}
      lazy={() => import("@/modules/admin/user/conversation-page")}
    />
  </Route>
)

export { chatbotRoutes }
