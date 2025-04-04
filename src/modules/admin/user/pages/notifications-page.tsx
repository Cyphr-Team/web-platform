import React from "react"

export function NotificationsPage(): JSX.Element {
  return (
    <div className="flex-1 overflow-auto pt-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold">Notification Settings</h2>
        <p className="mt-2 text-muted-foreground">
          Manage your notification preferences and alerts
        </p>
        {/* Aquí irá el contenido de notificaciones */}
      </div>
    </div>
  )
}

export default NotificationsPage 