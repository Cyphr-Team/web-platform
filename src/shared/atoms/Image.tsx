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

type PlaceholderImageProps = {
  width?: number
  height?: number
  placeholderClassName?: string
  alt: string
}

const PlaceholderImage = ({
  width,
  height,
  placeholderClassName,
  alt
}: PlaceholderImageProps) => {
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

export const Image = ({
  src,
  className,
  alt,
  width,
  height,
  placeholderClassName
}: ImageProps) => {
  const [isFailed, setIsFailed] = useState(false)

  const handleFailedImage = () => {
    setIsFailed(true)
  }

  if (!src)
    return (
      <PlaceholderImage
        width={width}
        height={height}
        placeholderClassName={placeholderClassName}
        alt={alt}
      />
    )

  return isFailed ? (
    <PlaceholderImage
      width={width}
      height={height}
      placeholderClassName={placeholderClassName}
      alt={alt}
    />
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      onError={handleFailedImage}
    />
  )
}
