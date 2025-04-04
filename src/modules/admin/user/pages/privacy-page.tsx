import React from "react"

export function PrivacyPage(): JSX.Element {
  return (
    <div className="flex-1 overflow-auto pt-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold">Privacy & Data Settings</h2>
        <p className="mt-2 text-muted-foreground">
          Manage your privacy preferences and data settings
        </p>
        {/* Aquí irá el contenido de privacidad */}
      </div>
    </div>
  )
}

export default PrivacyPage 