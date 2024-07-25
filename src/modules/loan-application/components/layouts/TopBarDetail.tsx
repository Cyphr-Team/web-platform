interface Props {
  leftFooter: React.ReactNode
  rightFooter: React.ReactNode
}

export const TopBarDetail: React.FC<Props> = ({ leftFooter, rightFooter }) => {
  return (
    <nav className="w-full h-16 md:h-20 shrink-0 flex justify-end md:justify-between items-center pr-2 md:pr-5 sticky top-0 bg-white border-b border-t md:border-t-0 z-20 gap-4">
      {leftFooter}

      {rightFooter}
    </nav>
  )
}
