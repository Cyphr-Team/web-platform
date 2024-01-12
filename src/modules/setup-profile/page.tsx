import { SetupProfileSection } from "./components/setup-profile-section"

export default function SetupProfilePage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <SetupProfileSection />
    </div>
  )
}
