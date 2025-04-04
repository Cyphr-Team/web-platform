import { Switch } from "@/components/ui/switch"

export function NotificationsPage(): JSX.Element {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6">
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Email Notifications</h3>
          
          <div className="mt-6 space-y-6">
            {/* Announcements and update emails */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Announcements and update emails</h4>
                <p className="text-sm text-muted-foreground">
                  Receive occasional emails about product launches and new features from Cyphr
                </p>
              </div>
              <Switch />
            </div>

            {/* Activity in your platform */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Activity in your platform</h4>
                <p className="text-sm text-muted-foreground">
                  Receive emails when you get comments, mentions, reminders, access requests
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage 