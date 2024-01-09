import foresightLogo from "/foresight.svg"

interface LogoHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
}

export function LogoHeader(
  { isCollapsed, toggleCollapse }: LogoHeaderProps = { isCollapsed: false }
) {
  return (
    <div className="flex justify-between items-center gap-2.5">
      <button onClick={toggleCollapse} className="logo-button">
        <img src={foresightLogo} className="logo" alt="Foresight logo" />
      </button>
      {!isCollapsed && <h2 className="text-xl font-bold">Foresight</h2>}
    </div>
  )
}
