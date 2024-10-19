import { Rect } from "react-konva"
import { type SignalsCoordinatesType } from "../../constants/types/document"

interface Props {
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
      height={height}
      stroke="red"
      strokeWidth={2}
      width={width}
      x={x}
      y={y}
      zIndex={2}
    />
  )
}
