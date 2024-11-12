interface Props {
  leftFooter: React.ReactNode
  rightFooter: React.ReactNode
}

export const TopBarDetail: React.FC<Props> = ({ leftFooter, rightFooter }) => {
  return (
    <nav className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-end gap-4 border-y bg-white pr-2 md:h-20 md:justify-between md:border-t-0 md:pr-5">
      {leftFooter}

      {rightFooter}
    </nav>
  )
}
