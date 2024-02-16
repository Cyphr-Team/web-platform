import altCapLogo from "@/assets/altcap-logo.svg"
import altCapLogoText from "@/assets/altcap-text.svg"

interface LogoHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
}

export function LogoHeader(
  { isCollapsed, toggleCollapse }: LogoHeaderProps = { isCollapsed: false }
) {
  return (
    <div className="flex items-center gap-1 w-full">
      <button onClick={toggleCollapse} className="logo-button">
        <img src={altCapLogo} className="logo w-8 h-8" alt="altcap logo" />
      </button>
      {!isCollapsed && (
        <img src={altCapLogoText} alt="altcap logo" className="pt-1" />
      )}
    </div>
  )
}
