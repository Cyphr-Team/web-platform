import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip"
import { useState } from "react"

type ImageProps = {
  src?: string
  alt: string
  className?: string
} & PlaceholderImageProps

interface PlaceholderImageProps {
  width?: number
  height?: number
  placeholderClassName?: string
  alt: string
}

function PlaceholderImage({
  width,
  height,
  placeholderClassName,
  alt
}: PlaceholderImageProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className={placeholderClassName}
            style={{
              width: `${width}px`,
              height: `${height}px`
            }}
          />
        </TooltipTrigger>
        <TooltipContent>{alt}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Image({
  src,
  className,
  alt,
  width,
  height,
  placeholderClassName
}: ImageProps) {
  const [isFailed, setIsFailed] = useState(false)

  const handleFailedImage = () => {
    setIsFailed(true)
  }

  if (!src)
    return (
      <PlaceholderImage
        alt={alt}
        height={height}
        placeholderClassName={placeholderClassName}
        width={width}
      />
    )

  return isFailed ? (
    <PlaceholderImage
      alt={alt}
      height={height}
      placeholderClassName={placeholderClassName}
      width={width}
    />
  ) : (
    <img
      alt={alt}
      className={className}
      height={height}
      src={src}
      width={width}
      onError={handleFailedImage}
    />
  )
}
