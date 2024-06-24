import { Image } from "lucide-react"

export const GovernmentImageDivider = ({
  photoUrl,
  title
}: {
  photoUrl?: string
  title: string
}) => {
  return (
    <div className="p-8 bg-gray-50 rounded-lg flex flex-col align-center">
      {photoUrl != null ? (
        <img
          className="h-5/6 m-4 max-w-160 md:object-cover sm:object-scale-down self-center"
          src={photoUrl}
          alt="import"
        />
      ) : (
        <div className="h-5/6 m-4 max-w-160 flex flex-col self-center items-center justify-center">
          <Image
            className="max-w-120 w-12 h-12 sm:w-22 sm:h-22 shrink"
            strokeWidth={0.75}
            color="#a0aec0"
          />
          <h1 className="mt-4 text-gray-500">No image available</h1>
        </div>
      )}
      <h2 className="text-center align-middle font-bold">{title}</h2>
    </div>
  )
}
