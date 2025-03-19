import { useLoanDocumentDetailsContext } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import { useEffect, useRef, useState } from "react"
import { Image, Layer, Stage } from "react-konva"
import useImage from "use-image"

function PageViewer() {
  const { scale, selectedVisualization } = useLoanDocumentDetailsContext()
  const [image] = useImage(selectedVisualization?.imageUrl ?? "")
  // Ref for the parent container
  const parentRef = useRef<HTMLDivElement>(null)

  const [initScale, setInitScale] = useState(1)

  useEffect(() => {
    if (parentRef.current && image?.width && image?.height) {
      const scaleX = parentRef.current.offsetWidth / (image?.width || 1)
      const scaleY = parentRef.current.offsetHeight / (image?.height || 1)
      const scale = Math.min(scaleX, scaleY)

      setInitScale(scale)
    }
  }, [image?.height, image?.width])

  return (
    <div ref={parentRef} className="flex-1 overflow-auto">
      <Stage
        className="flex items-center justify-center"
        height={(image?.height ?? 0) * scale * initScale}
        width={(image?.width ?? 0) * scale * initScale}
      >
        <Layer>
          <Image
            image={image}
            scaleX={scale * initScale}
            scaleY={scale * initScale}
            x={0}
            y={0}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default PageViewer
