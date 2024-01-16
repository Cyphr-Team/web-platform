import foresightLogo from "/foresight.svg"
import foresightLogoText from "@/assets/foresight-text.svg"

interface LogoHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
}

export function LogoHeader(
  { isCollapsed, toggleCollapse }: LogoHeaderProps = { isCollapsed: false }
) {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <button onClick={toggleCollapse} className="logo-button">
        <img
          src={foresightLogo}
          className="logo w-8 h-8"
          alt="Foresight logo"
        />
      </button>
      {!isCollapsed && <img src={foresightLogoText} alt="Foresight logo" />}
    </div>
  )
}
