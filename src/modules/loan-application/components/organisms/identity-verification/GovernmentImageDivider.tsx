import { Image } from "lucide-react"

export function GovernmentImageDivider({
  photoUrl,
  title
}: {
  photoUrl?: string
  title: string
}) {
  return (
    <div className="align-center flex flex-col rounded-lg bg-gray-50 p-8">
      {photoUrl != null ? (
        <img
          alt="import"
          className="max-w-160 m-4 h-5/6 self-center sm:object-scale-down md:object-cover"
          src={photoUrl}
        />
      ) : (
        <div className="max-w-160 m-4 flex h-5/6 flex-col items-center justify-center self-center">
          <Image
            className="max-w-120 sm:w-22 sm:h-22 size-12 shrink"
            color="#a0aec0"
            strokeWidth={0.75}
          />
          <h1 className="mt-4 text-gray-500">No image available</h1>
        </div>
      )}
      <h2 className="text-center align-middle font-bold">{title}</h2>
    </div>
  )
}
