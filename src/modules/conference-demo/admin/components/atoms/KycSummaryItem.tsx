interface Props {
  title: string
  subtitle1: string
  subtitle2?: string
}

function KycSummaryItem({ title, subtitle1, subtitle2 }: Props) {
  return (
    <div>
      <h1 className=" my-2 text-xs text-gray-500">{title}</h1>
      <div className=" text-base">{subtitle1}</div>
      {subtitle2 ? <div className="text-base">{subtitle2}</div> : null}
    </div>
  )
}

export default KycSummaryItem
