import { Rect } from "react-konva"
import { SignalsCoordinatesType } from "../../constants/types/document"

type Props = {
  coordinates: SignalsCoordinatesType
  scale: number
}

export const RectangleComponent: React.FC<Props> = ({ coordinates, scale }) => {
  const { left, top, right, bottom } = coordinates
  const x = left * scale
  const y = top * scale
  const width = Math.abs(right - left) * scale
  const height = Math.abs(bottom - top) * scale

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="red"
      strokeWidth={2}
      zIndex={2}
    />
  )
}
