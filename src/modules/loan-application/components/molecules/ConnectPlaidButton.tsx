import { Button } from "@/components/ui/button"
import { useConnectPlaid } from "../../hooks/useConnectPlaid"
import { Check } from "lucide-react"

export const ConnectPlaidButton = () => {
  const { open, ready, linkSuccess } = useConnectPlaid()

  return linkSuccess ? (
    <Button
      className="text-primary bg-primary w-fit text-white px-lg py-md flex gap-1"
      type="button"
    >
      <p>Connected</p>
      <Check size={20} className="text-white" />
    </Button>
  ) : (
    <Button
      className="text-primary bg-black w-fit text-white px-lg py-md"
      onClick={() => open()}
      disabled={!ready}
      type="button"
    >
      Connect
    </Button>
  )
}
