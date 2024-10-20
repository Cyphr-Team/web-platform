import { Image } from "lucide-react"

export function SelfieImageDivider({
  photoUrl,
  title,
  description
}: {
  photoUrl?: string
  title: string
  description: string
}) {
  return (
    <div className="p-8 bg-gray-50 rounded-lg flex flex-col align-center text-wrap">
      {photoUrl != null ? (
        <img
          alt="import"
          className="h-5/6 m-4 max-w-160 md:object-cover sm:object-scale-down self-center"
          src={photoUrl}
        />
      ) : (
        <div className="h-5/6 m-4 max-w-160 flex flex-col self-center items-center justify-center">
          <Image
            className="max-w-120 w-12 h-12 sm:w-22 sm:h-22 shrink"
            color="#a0aec0"
            strokeWidth={0.75}
          />
          <h1 className="mt-4 text-gray-500	">No image available</h1>
        </div>
      )}
      <div className="h-4" />
      <h2 className="text-center font-bold text-xl overflow: ellipsis">
        {title}
      </h2>
      <h2 className="text-center text-base  overflow: ellipsis">
        {description}
      </h2>
    </div>
  )
}
