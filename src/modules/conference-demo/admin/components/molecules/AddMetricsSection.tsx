import { Icons } from "@/components/ui/icons"

export default function AddMetricsSection() {
  return (
    <div className="min-h-96 grid place-items-center">
      <div className="border border-dashed rounded-xl border-[#071013] p-6 flex flex-col gap-6 items-center hover:cursor-pointer">
        <Icons.plusCircle />
        <p className="font-medium">Add custom metrics</p>
      </div>
    </div>
  )
}
